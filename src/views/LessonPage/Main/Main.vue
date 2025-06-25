<script setup>
import { ref, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import DisableImg from "@/assets/images/disable-card-img.svg";
import cardsData from "@/data/cardRu.json";
import "./main.scss";

const router = useRouter();
const completedCards = ref([]);
const selectedLevel = ref("A1");
const cardsWithActiveState = ref([]);
const selectedCard = ref(null);
const lastCompletedCard = ref(null);
const answeredQuestions = ref(0);
const currentQuestionIndex = ref(0);

const loadCompletedCards = () => {
  completedCards.value = JSON.parse(localStorage.getItem("completedCards")) || [
    1,
  ];
  lastCompletedCard.value =
    completedCards.value.length > 0 ? completedCards.value.at(-1) : null;
};

const loadCurrentQuestionIndex = (cardId) => {
  const storedIndex = localStorage.getItem(`currentQuestionIndex_${cardId}`);
  return storedIndex ? JSON.parse(storedIndex) : 1;
};

const generateLabel = (level, index) => {
  const levels = ["A1", "A2", "B1", "B2", "C1", "C2"];
  let totalCardsBeforeLevel = levels
    .slice(0, levels.indexOf(level))
    .reduce(
      (acc, cur) => acc + cardsData.filter((card) => card.level === cur).length,
      0
    );
  return totalCardsBeforeLevel + index + 1;
};

const updateProgress = (card) => {
  const currentIndex = loadCurrentQuestionIndex(card.id);
  const totalQuestions = card.questions?.length || 1;
  return currentIndex > 1 && totalQuestions > 0
    ? Math.round((currentIndex / totalQuestions) * 100)
    : 0;
};

const updateCardStyles = () => {
  cardsWithActiveState.value = cardsData
    .filter((card) => card.level === selectedLevel.value)
    .map((card, index) => {
      const progress = updateProgress(card);
      const isActive = completedCards.value.includes(card.id) || card.id === 1;
      const isStart = card.id === lastCompletedCard.value;
      return {
        ...card,
        isActive,
        alignRight: index % 2 === 0,
        label: generateLabel(card.level, index),
        isStart,
        progress,
        progressPercentage: progress,
      };
    });
};

const goToQuestionsPage = (id) => {
  const card = cardsWithActiveState.value.find((card) => card.id === id);
  if (card?.isActive) {
    selectedCard.value = card;
    localStorage.setItem(
      `currentQuestionIndex_${id}`,
      JSON.stringify(loadCurrentQuestionIndex(id))
    );

    router.push({ name: "Questions", params: { id } });
  }
};

const selectLevel = (level) => {
  selectedLevel.value = level;
  updateCardStyles();
};

const getDifficulty = (level) => {
  if (["A1", "A2"].includes(level)) return "Easy";
  if (["B1", "B2"].includes(level)) return "Medium";
  return "Hard";
};

const getDifficultyClass = (level) => {
  if (["A1", "A2"].includes(level)) return "easy";
  if (["B1", "B2"].includes(level)) return "medium";
  return "hard";
};

const getCardClasses = (card) => ({
  deactive: !card.isActive,
  "align-right": card.alignRight,
  completed: card.progress > 0,
  "progress-filled": card.progress > 0,
});

watch(currentQuestionIndex, (newIndex) => {
  if (selectedCard.value) {
    localStorage.setItem(
      `currentQuestionIndex_${selectedCard.value.id}`,
      JSON.stringify(newIndex)
    );
  }
});

onMounted(() => {
  loadCompletedCards();
  loadCurrentQuestionIndex();
  updateCardStyles();
});

const getRectanglePerimeter = (width, height, id) => {
  const storedIndex = JSON.parse(
    localStorage.getItem(`currentQuestionIndex_${id}`) || "0"
  );

  return storedIndex * (width + height);
};
</script>

<template>
  <section class="main">
    <div class="container">
      <h3 class="levels-label">English Levels:</h3>
      <div class="levels">
        <div
          class="level"
          v-for="level in ['A1', 'A2', 'B1', 'B2', 'C1', 'C2']"
          :key="level"
          @click="selectLevel(level)"
          :class="{ active: selectedLevel === level }"
        >
          {{ level }}
          <span class="level-name" :class="getDifficultyClass(level)">
            {{ getDifficulty(level) }}
          </span>
        </div>
      </div>
      <div class="con">
        <img
          src="@/assets/images/lessons-img1.svg"
          alt="Image"
          class="lessons-img"
        />
        <img
          src="@/assets/images/lessons-img2.svg"
          alt="Image"
          class="lessons-img lessons-img2"
        />
        <div class="cards">
          <div
            class="card"
            :class="getCardClasses(card)"
            v-for="card in cardsWithActiveState"
            :key="card.id"
            @click="goToQuestionsPage(card.id)"
          >
            <div class="anim">
              <div v-if="card.isStart" class="start-label">Start</div>
              <span v-if="card.isStart" class="st"></span>
            </div>
            <img
              v-if="!card.isActive"
              :src="DisableImg"
              alt="Disabled"
              class="disable-overlay"
            />
            {{ card.label }}
            <div
              v-if="card.progress > 0 && card.isActive"
              class="progress-rectangle"
            >
              <svg class="progress-svg" viewBox="0 0 160 100">
                <rect
                  x="0"
                  y="0"
                  width="160"
                  height="100"
                  rx="20"
                  ry="20"
                  class="circle-background"
                />
                <rect
                  x="0"
                  y="0"
                  width="160"
                  height="100"
                  rx="30"
                  ry="30"
                  class="circle-progress-bar"
                  stroke-width="10"
                  stroke="blue"
                  fill="transparent"
                  stroke-linecap="round"
                  :style="{
                    strokeDasharray: getRectanglePerimeter(160, 100, card.id),
                    strokeDashoffset:
                      getRectanglePerimeter(160, 100, card.id) *
                      (1 - card.progressPercentage / 100),
                  }"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
