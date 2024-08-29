<script setup>
const props = defineProps({
    text: String
})
</script>
<template>
    <button class="signup-btn">{{text}}</button>
</template>