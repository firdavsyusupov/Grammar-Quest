<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import cardsData from "@/data/card.json";
import uz from "@/assets/images/uz.png";
import ru from "@/assets/images/ru.png";
import "./main.scss"

const router = useRouter();
const completedCards = ref([]);
const selectedLanguage = ref("uz");
const dropdownVisible = ref(false);
const texts = ref({ selectedLan: "Tanlangan til:" });
const cardsWithActiveState = ref([]);

const updateSelectedLanText = () => {
  texts.value.selectedLan = selectedLanguage.value === "uz" ? "Tanlangan til:" : "Выбранный язык:";
};

const loadCompletedCards = () => {
  completedCards.value = JSON.parse(localStorage.getItem("completedCards")) || [];
};

const saveCompletedCards = () => {
  localStorage.setItem("completedCards", JSON.stringify(completedCards.value));
};

const unlockNextCard = (id) => {
  if (id < cardsData.length && !completedCards.value.includes(id + 1)) {
    completedCards.value.push(id + 1);
    saveCompletedCards();
  }
};

const generateLabel = (index) => {
  const levels = ["A", "B", "C"];
  return `${levels[Math.floor(index / 2)]}${(index % 2) + 1}`;
};

const updateCardStyles = () => {
  cardsWithActiveState.value = cardsData.map((card, index) => ({
    ...card,
    isActive: completedCards.value.includes(card.id) || card.id === 1,
    alignRight: index % 2 === 0,
    label: generateLabel(index),
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
  if (!completedCards.value.includes(id)) {
    completedCards.value.push(id);
    saveCompletedCards();
    unlockNextCard(id);
  }
  router.push({ name: "Questions", params: { id } });
};

onMounted(() => {
  loadCompletedCards();
  selectedLanguage.value = localStorage.getItem("selectedLanguage") || "uz";
  updateSelectedLanText();
  updateCardStyles();
});
</script>

<template>
  <section class="main">
    <div class="lan">
      <h3>{{ texts.selectedLan }}</h3>
      <div class="lan-img" @click="toggleDropdown">
        <img :src="selectedLanguage === 'uz' ? uz : ru" alt="Language" />
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
    <div class="container">
      <div class="con">
        <div class="cards">
          <div
            class="card"
            :class="{ deactive: !card.isActive, 'align-right': card.alignRight }"
            v-for="card in cardsWithActiveState"
            :key="card.id"
            @click="card.isActive ? goToQuestionsPage(card.id) : null"
          >
            {{ card.label }}
          </div>
        </div>
      </div>
    </div>
  </section>
</template>


