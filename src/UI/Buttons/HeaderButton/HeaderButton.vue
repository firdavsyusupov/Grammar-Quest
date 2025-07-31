<script setup>

const props = defineProps({
  text: String,
});
</script>
<template>
  <button class="header__button">
    {{ text }}
  </button>
</template>
