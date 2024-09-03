import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../pages/HomePage.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomePage,
    },
    {
      path: "/audio",
      name: "audio",
      component: () => import("@/pages/AudioPage.vue"),
    },
    {
      path: "/sprint-task1",
      name: "sprint-task1",
      component: () => import("@/pages/SprintTest.vue"),
    },
    {
      path: "/sprint-task2",
      name: "sprint-task2",
      component: () => import("@/views/SprintPage/tasks/task2/task2.vue"),
    },
    {
      path: "/sprint-task3",
      name: "sprint-task3",
      component: () => import("@/views/SprintPage/tasks/task3/task3.vue"),
    },
    {
      path: "/sprint-task4",
      name: "sprint-task4",
      component: () => import("@/views/SprintPage/tasks/task4/task4.vue"),
    },
    {
      path: "/sprint-task5",
      name: "sprint-task5",
      component: () => import("@/views/SprintPage/tasks/task5/task5.vue"),
    },
    {
      path: "/sprint-task6",
      name: "sprint-task6",
      component: () => import("@/views/SprintPage/tasks/task6/task6.vue"),
    },
    {
      path: "/sprint-task7",
      name: "sprint-task7",
      component: () => import("@/views/SprintPage/tasks/task7/task7.vue"),
    },
    {
      path: "/sprint-task8",
      name: "sprint-task8",
      component: () => import("@/views/SprintPage/tasks/task8/task8.vue"),
    },
    {
      path: "/sprint-task9",
      name: "sprint-task9",
      component: () => import("@/views/SprintPage/tasks/task9/task9.vue"),
    },
    {
      path: "/sprint-task10",
      name: "sprint-task10",
      component: () => import("@/views/SprintPage/tasks/task10/task10.vue"),
    },
    {
      path: "/sprint-task11",
      name: "sprint-task11",
      component: () => import("@/views/SprintPage/tasks/task11/task11.vue"),
    },
    {
      path: "/textbook",
      name: "textbook",
      component: () => import("@/pages/Textbook.vue"),
    },
  ],
});

export default router;
