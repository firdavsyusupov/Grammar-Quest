<script setup>
import Header from "@/views/HomePage/Header/Header.vue";
import LearnSection from "@/views/HomePage/Main/LearnSection/LearnSection.vue";
import IncreaseSection from "@/views/HomePage/Main/IncreaseSection/IncreaseSection.vue";
import WatchSection from "@/views/HomePage/Main/WatchSection/WatchSection.vue";
import Footer from "@/components/Footer/Footer.vue";
</script>
<template>
  <header>
    <Header />
  </header>
  <main>
    <LearnSection />
    <IncreaseSection />
    <WatchSection />
  </main>
</template>
