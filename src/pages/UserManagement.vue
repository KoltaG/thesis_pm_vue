<script setup lang="ts">
import { ref } from "vue";
import UserList from "../components/user/UserList.vue";
import Modal from "../components/common/Modal.vue";
import NewUserForm from "../components/user/NewUserForm.vue";
import PageHeader from "../components/layout/PageHeader.vue";

const isAddUserOpen = ref(false);
</script>

<template>
  <div>
    <PageHeader
      title="User Management"
      @addClick="isAddUserOpen = true"
      addText="Add User"
    />

    <UserList />

    <Modal
      v-model:isOpen="isAddUserOpen"
      title="Add User"
      @close="isAddUserOpen = false"
    >
      <NewUserForm @success="isAddUserOpen = false" />
    </Modal>
  </div>
</template>
