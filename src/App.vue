<script setup>
import { RouterLink, RouterView } from "vue-router";
import Nav from "./components/Nav/Nav.vue";
import Footer from "./components/Footer/Footer.vue";
import { useRoute } from "vue-router";
const route = useRoute();
</script>

<template>
  <Nav v-if="route.path !== '/auth'" />
  <div v-if="route.path !== '/auth'" class="margin"></div>
  <RouterView />
  <Footer v-if="route.path !== '/auth'" />
</template>
