<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import cardsData from "@/data/cardRu.json";
import uz from "@/assets/images/uz.png";
import ru from "@/assets/images/ru.png";
import "./main.scss";

const router = useRouter();
const completedCards = ref([]);
const selectedLanguage = ref("ru");
const selectedLevel = ref("A1");
const dropdownVisible = ref(false);
const texts = ref({ selectedLan: "Tanlangan til:" });
const cardsWithActiveState = ref([]);
const selectedCard = ref(null);

const updateSelectedLanText = () => {
  texts.value.selectedLan =
    selectedLanguage.value === "uz" ? "Tanlangan til:" : "Выбранный язык:";
};

const loadCompletedCards = () => {
  completedCards.value =
    JSON.parse(localStorage.getItem("completedCards")) || [];
};

const saveCompletedCards = () => {
  localStorage.setItem("completedCards", JSON.stringify(completedCards.value));
};

const generateLabel = (level, index) => {
  const levels = ["A1", "A2", "B1", "B2", "C1", "C2"];

  const levelIndex = levels.indexOf(level);

  let totalCardsBeforeLevel = 0;
  for (let i = 0; i < levelIndex; i++) {
    totalCardsBeforeLevel += cardsData.filter(
      (card) => card.level === levels[i]
    ).length;
  }

  return totalCardsBeforeLevel + index + 1;
};

const updateCardStyles = () => {
  cardsWithActiveState.value = cardsData
    .filter((card) => card.level === selectedLevel.value)
    .map((card, index) => ({
      ...card,
      isActive: completedCards.value.includes(card.id) || card.id === 1,
      alignRight: index % 2 === 0,
      label: generateLabel(card.level, index),
    }));
};

const toggleDropdown = () => {
  dropdownVisible.value = !dropdownVisible.value;
};

const selectLanguage = (lang) => {
  selectedLanguage.value = lang;
  localStorage.setItem("selectedLanguage", lang);
  updateSelectedLanText();
  dropdownVisible.value = false;
};

const goToQuestionsPage = (id) => {
  if (cardsWithActiveState.value.find((card) => card.id === id)?.isActive) {
    selectedCard.value = cardsWithActiveState.value.find(
      (card) => card.id === id
    );
    router.push({ name: "Questions", params: { id } });
  }
};

onMounted(() => {
  loadCompletedCards();
  selectedLanguage.value = localStorage.getItem("selectedLanguage") || "ru";
  updateSelectedLanText();
  updateCardStyles();
});
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
          @click="
            selectedLevel = level;
            updateCardStyles();
          "
          :class="{ active: selectedLevel === level }"
        >
          {{ level }}
        </div>
      </div>
      <div class="lan">
        <h3>{{ texts.selectedLan }}</h3>
        <div class="lan-img" @click="toggleDropdown">
          <img :src="selectedLanguage === 'ru' ? ru : uz" alt="Language" />
        </div>
        <transition name="fade">
          <div class="lan-dropdown" v-if="dropdownVisible">
            <div class="uz" @click="selectLanguage('uz')">
              <span>uz</span>
              <img :src="uz" alt="Uzbek" />
            </div>
            <hr />
            <div class="ru" @click="selectLanguage('ru')">
              <span>ru</span>
              <img :src="ru" alt="Russian" />
            </div>
          </div>
        </transition>
      </div>
      <div class="con">
        <div class="cards">
          <div
            class="card"
            :class="{
              deactive: !card.isActive,
              'align-right': card.alignRight,
            }"
            v-for="card in cardsWithActiveState"
            :key="card.id"
            @click="goToQuestionsPage(card.id)"
          >
            {{ card.label }}
          </div>
        </div>

        <div v-if="selectedCard" class="questions-section">
          <div v-for="(question, index) in selectedCard.questions" :key="index">
            <p>{{ question.question }}</p>
            <div>
              <button
                v-for="(option, idx) in question.options"
                :key="idx"
                @click="checkAnswer(option, question.correctAnswer)"
              >
                {{ option }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
