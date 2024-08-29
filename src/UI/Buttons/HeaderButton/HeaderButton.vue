<script setup>
import RightIcon from "@/components/icons/RightIcon.vue";

const props = defineProps({
  text: String,
  icon: Boolean,
});
</script>
<template>
  <button class="header__button">
    {{ text }} <RightIcon v-if="icon" :size="15" />
  </button>
</template>
