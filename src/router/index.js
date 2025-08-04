import { createRouter, createWebHistory } from "vue-router";
import { useLoginStore } from "@/stores/login";
import HomePage from "../pages/HomePage.vue";

const sprintTasks = Array.from({ length: 48 }, (_, index) => {
  const i = index + 2;
  return {
    path: `/sprint-task${i}`,
    name: `sprint-task${i}`,
    component: () => import(`@/views/SprintPage/tasks/task${i}/task${i}.vue`),
    meta: { requiresAuth: true },
  };
});

const routes = [
  {
    path: "/",
    name: "home",
    component: HomePage,
  },
  {
    path: "/auth",
    name: "auth",
    component: () => import("@/pages/LoginPage.vue"),
  },
  {
    path: "/faq",
    name: "faq",
    component: () => import("@/pages/FAQPage.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/contact",
    name: "contact",
    component: () => import("@/pages/ContactPage.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/about",
    name: "about",
    component: () => import("@/pages/AboutPage.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/platform",
    name: "platform",
    component: () => import("@/pages/PlatformPage.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/sprint-task1",
    name: "sprint-task1",
    component: () => import("@/views/SprintPage/SprintTest/SprintTest.vue"),
    meta: { requiresAuth: true },
  },
  ...sprintTasks,
  {
    path: "/textbook",
    name: "textbook",
    component: () => import("@/pages/Textbook.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/lessons",
    name: "lessons",
    component: () => import("@/pages/LessonPage.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/chat",
    name: "chat",
    component: () => import("@/pages/ChatPage.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/questions/:id",
    name: "Questions",
    component: () => import("@/views/LessonPage/Quest/Quest.vue"),
    meta: { requiresAuth: true },
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

router.beforeEach((to, from, next) => {
  const store = useLoginStore();
  const isLoggedIn = store.logged;
  if (to.meta.requiresAuth && !isLoggedIn) {
    next({ name: "auth" });
  } else if (to.name === "auth" && isLoggedIn) {
    next({ name: "home" });
  } else {
    next();
  }
});

export default router;
