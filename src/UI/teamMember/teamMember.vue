<template>
  <div class="team-member">
    <img :src="image" :alt="name" class="team-member__photo" />
    <h3 class="team-member__name">{{ name }}</h3>
    <p class="team-member__role">{{ role }}</p>
  </div>
</template>

<script setup>
import "./teammember.scss"
defineProps({
  name: String,
  role: String,
  image: String,
});
</script>


