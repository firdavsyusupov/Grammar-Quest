<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import StarIcon from "@/components/icons/StarIcon.vue";
import cardsData from "@/data/card.json"; 
import "./main.scss";

const router = useRouter();
const completedCards = ref([]);

const loadCompletedCards = () => {
  const completed = JSON.parse(localStorage.getItem('completedCards')) || [];
  completedCards.value = completed;
};

const saveCompletedCards = () => {
  localStorage.setItem('completedCards', JSON.stringify(completedCards.value));
};

const goToQuestionsPage = (id) => {
  if (!completedCards.value.includes(id)) {
    completedCards.value.push(id);
    saveCompletedCards();
  }
  unlockNextCard(id);
  router.push({ name: 'Questions', params: { id } });
};

const unlockNextCard = (id) => {
  if (id === 2 && !completedCards.value.includes(3)) {
    completedCards.value.push(3);
    saveCompletedCards();
  } else if (id === 3 && !completedCards.value.includes(4)) {
    completedCards.value.push(4);
    saveCompletedCards();
  }
};

const cardsWithActiveState = computed(() => {
  return cardsData.map((card) => {
    return {
      ...card,
      isActive: completedCards.value.includes(card.id) || card.id === 1
    };
  });
});

onMounted(() => {
  loadCompletedCards();
});
</script>

<template>
  <section class="main">
    <div class="container">
      <div class="cards">
        <div 
          class="card"
          :class="{ deactive: !card.isActive }" 
          v-for="card in cardsWithActiveState" 
          :key="card.id"
          @click="card.isActive ? goToQuestionsPage(card.id) : null" 
        >
          <StarIcon :size="32" :color="'red'" />
          <p>Card {{ card.id }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style>
.card.deactive {
  pointer-events: none;
  opacity: 0.5;
}
</style>
