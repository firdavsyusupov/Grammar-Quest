<script setup>
import Button from "@/UI/Buttons/HeaderButton/HeaderButton.vue";

import "./watchsection.scss";
</script>
<template>
  <section class="watch">
    <div class="container">
      <div class="watch-img-block">
        <img src="@/assets/images/watch-section-img.svg" alt="" />
      </div>
      <div class="watch-text-block">
        <h3 class="watch-text-block-title">Watch your progress every day</h3>
        <p class="watch-text-block-text">
          Save statistics on your achievements, words learned, and mistakes
        </p>
        <Button :text="'Statistics'" :icon="true" />
      </div>
    </div>
  </section>
</template>
