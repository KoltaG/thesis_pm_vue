<script setup lang="ts">
import { computed, PropType, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useAuth } from "../../composables/useAuth";
import Button from "../common/Button.vue";
import ArrowUpIcon from "../icons/ArrowUpIcon.vue";
import ConfirmModal from "../common/ConfirmModal.vue";

defineProps({
  title: String,
  onAddClick: {
    type: Function as PropType<() => void> | undefined,
  },
  addText: String,
  onDeleteClick: {
    type: Function as PropType<() => void>,
  },
  deleteText: {
    type: String,
    default: "Delete",
  },
  extraActions: {
    type: null,
  },
});

const { authState } = useAuth();
const currentUser = computed(() => authState.value.user);
const router = useRouter();
const route = useRoute();

const isConfirmDeleteOpen = ref(false);

const navigateBack = () => {
  router.back();
};
</script>

<template>
  <header class="mb-4">
    <Button
      v-if="route.path !== '/'"
      @click="navigateBack"
      variant="text"
      class="!px-0"
    >
      <ArrowUpIcon class="w-6 h-6 -rotate-90" />
      Back
    </Button>

    <div class="flex items-center justify-between flex-wrap gap-2s">
      <h1 class="text-2xl font-bold">{{ title }}</h1>

      <div class="flex items-center gap-4 mb-4">
        <Button
          v-if="onDeleteClick && currentUser?.role !== 'Dev'"
          @click="isConfirmDeleteOpen = true"
          variant="danger"
        >
          {{ deleteText }}
        </Button>
        <Button
          v-if="onAddClick && addText"
          @click="onAddClick"
          variant="success"
        >
          {{ addText }}
        </Button>
        <slot name="extraActions" />
      </div>
    </div>

    <ConfirmModal
      v-if="onDeleteClick && currentUser?.role !== 'Dev'"
      v-model="isConfirmDeleteOpen"
      title="Delete Project"
      @confirm="onDeleteClick"
      message="Are you sure you want to delete this project?"
      @close="isConfirmDeleteOpen = false"
    />
  </header>
</template>
