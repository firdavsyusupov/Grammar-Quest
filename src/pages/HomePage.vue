<script setup>
import Header from "@/views/HomePage/Header/Header.vue";
import LearnSection from "@/views/HomePage/Main/LearnSection/LearnSection.vue";
import IncreaseSection from "@/views/HomePage/Main/IncreaseSection/IncreaseSection.vue";
import WatchSection from "@/views/HomePage/Main/WatchSection/WatchSection.vue";
import Footer from "@/components/Footer/Footer.vue";
import FastLearn from "@/views/HomePage/Main/FastLearn/FastLearn.vue";
import Effect from "@/views/HomePage/Main/Effect/Effect.vue";
import Comment from "@/views/HomePage/Main/Comment/Comment.vue";
import Register from "@/views/HomePage/Main/Register/Register.vue";
import Faq from "@/views/Faq/Faq.vue";
</script>
<template>
  <header>
    <Header />
  </header>
  <main>
    <LearnSection />
    <FastLearn />
    <Effect />
    <Comment />
    <Register />
    <Faq />
    <!-- <IncreaseSection /> -->
    <!-- <WatchSection /> -->
  </main>
</template>
