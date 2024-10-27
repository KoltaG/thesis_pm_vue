<script setup lang="ts">
import { ref, watchEffect } from "vue";
import { useProject } from "../../composables/useProject";
import { useUser } from "../../composables/useUser";
import LineChart from "./LineChart.vue";

interface DataPoint {
  name: string;
  users: number;
  projects: number;
  tasks: number;
}

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const chartData = ref({
  labels: months,
  datasets: [
    {
      label: "Users",
      data: [] as number[],
      borderColor: "#22c55e",
      fill: false,
    },
    {
      label: "Projects",
      data: [] as number[],
      borderColor: "#3b82f6",
      fill: false,
    },
    {
      label: "Tasks",
      data: [] as number[],
      borderColor: "#a855f7",
      fill: false,
    },
  ],
});

const chartOptions = ref({
  responsive: true,
  scales: {
    y: {
      beginAtZero: true,
    },
  },
});

const chartKey = ref(0);

const { state: projectState } = useProject();
const { state: userState } = useUser();

const processData = () => {
  const monthlyData: DataPoint[] = months.map((month) => ({
    name: month,
    users: 0,
    projects: 0,
    tasks: 0,
  }));

  userState.users.forEach((user) => {
    const monthIndex = new Date(user.createdAt).getMonth();
    monthlyData[monthIndex].users += 1;
  });

  projectState.projects.forEach((project) => {
    const monthIndex = new Date(project.createdAt).getMonth();
    monthlyData[monthIndex].projects += 1;

    project.tasks.forEach((task) => {
      const taskMonthIndex = new Date(task.createdAt).getMonth();
      monthlyData[taskMonthIndex].tasks += 1;
    });
  });

  chartData.value.datasets[0].data = monthlyData.map((data) => data.users);
  chartData.value.datasets[1].data = monthlyData.map((data) => data.projects);
  chartData.value.datasets[2].data = monthlyData.map((data) => data.tasks);

  chartKey.value++; //Force charts to rerender, needed because of library bug, (chartjs)
};

watchEffect(() => {
  // Wait until users and projects are loaded in the state
  if (userState.users.length > 0 && projectState.projects.length > 0) {
    processData();
  }
});
</script>

<template>
  <div class="bg-white p-4 rounded-lg shadow-md">
    <h3 class="text-lg font-semibold text-gray-800 mb-4">
      New Project & Task Trends
    </h3>
    <LineChart
      :key="chartKey"
      :chartData="chartData"
      :chartOptions="chartOptions"
    />
  </div>
</template>
