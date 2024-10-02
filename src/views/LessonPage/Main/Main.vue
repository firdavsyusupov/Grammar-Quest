<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import StarIcon from "@/components/icons/StarIcon.vue";
import cardsData from "@/data/card.json"; 

const router = useRouter();

const goToQuestionsPage = (id) => {
  router.push({ name: 'Questions', params: { id } });
};
</script>

<template>
  <section class="main">
    <div class="container">
      <div class="cards">
        <div 
          class="card"
          :class="{ deactive: !card.isActive }" 
          v-for="card in cardsData" 
          :key="card.id"
          @click="goToQuestionsPage(card.id)" 
        >
          <StarIcon :size="32" :color="'red'" />
          <p>Card {{ card.id }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

