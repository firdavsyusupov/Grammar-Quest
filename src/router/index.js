import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../pages/HomePage.vue";

const sprintTasks = Array.from({ length: 48 }, (_, index) => {
  const i = index + 2;
  return {
    path: `/sprint-task${i}`,
    name: `sprint-task${i}`,
    component: () => import(`@/views/SprintPage/tasks/task${i}/task${i}.vue`),
  };
});

const routes = [
  {
    path: "/",
    name: "home",
    component: HomePage,
  },
  {
    path: "/about",
    name: "about",
    component: () => import("@/pages/AboutPage.vue"),
  },
  {
    path: "/platform",
    name: "platform",
    component: () => import("@/pages/PlatformPage.vue"),
  },
  {
    path: "/sprint-task1",
    name: "sprint-task1",
    component: () => import("@/views/SprintPage/SprintTest/SprintTest.vue"),
  },
  ...sprintTasks,
  {
    path: "/textbook",
    name: "textbook",
    component: () => import("@/pages/Textbook.vue"),
  },
  {
    path: "/lessons",
    name: "lessons",
    component: () => import("@/pages/LessonPage.vue"),
  },
  {
    path: "/chat",
    name: "chat",
    component: () => import("@/pages/ChatPage.vue"),
  },
  {
    path: "/questions/:id",
    name: "Questions",
    component: () => import("@/views/LessonPage/Quest/Quest.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    name: "not-found",
    component: () => import("@/pages/NotFoundPage.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
