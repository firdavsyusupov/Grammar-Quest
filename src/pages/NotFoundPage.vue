<script setup>
import { ref } from 'vue';
import "@/assets/styles/common.scss"

const message = ref('Oops! Page Not Found.');
</script>

<template>
  <div class="not-found-container">
    <div class="error-code">404</div>
    <div class="message">{{ message }}</div>
    <div class="back-home">
      <router-link to="/">Go Back Home</router-link>
    </div>
  </div>
</template>

