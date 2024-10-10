<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import cardsData from "@/data/card.json";
import uz from "@/assets/images/uz.png";
import ru from "@/assets/images/ru.png";
import "./main.scss";

const router = useRouter();
const completedCards = ref([]);
const selectedLanguage = ref("uz");
const dropdownVisible = ref(false);

const texts = ref({
  selectedLan: "Tanlangan til:", // Default text for Uzbek
});

// Function to set the selected language text
const updateSelectedLanText = () => {
  texts.value.selectedLan = selectedLanguage.value === "uz" ? "Tanlangan til:" : "Выбранный язык:";
};

const loadCompletedCards = () => {
  const completed = JSON.parse(localStorage.getItem("completedCards")) || [];
  completedCards.value = completed;
};

const saveCompletedCards = () => {
  localStorage.setItem("completedCards", JSON.stringify(completedCards.value));
};

const loadSelectedLanguage = () => {
  const language = localStorage.getItem("selectedLanguage") || "uz";
  selectedLanguage.value = language;
  updateSelectedLanText(); // Update text when loading language
};

const saveSelectedLanguage = () => {
  localStorage.setItem("selectedLanguage", selectedLanguage.value);
};

const goToQuestionsPage = (id) => {
  if (!completedCards.value.includes(id)) {
    completedCards.value.push(id);
    saveCompletedCards();
  }
  unlockNextCard(id);
  router.push({ name: "Questions", params: { id } });
};

const unlockNextCard = (id) => {
  if (id === 2 && !completedCards.value.includes(3)) {
    completedCards.value.push(2);
    saveCompletedCards();
  } else if (id === 3 && !completedCards.value.includes(4)) {
    completedCards.value.push(3);
    saveCompletedCards();
  }
};

const cardsWithActiveState = computed(() => {
  return cardsData.map((card, index) => {
    return {
      ...card,
      isActive: completedCards.value.includes(card.id) || card.id === 1,
      alignRight: index % 2 === 0,
    };
  });
});

const toggleDropdown = () => {
  dropdownVisible.value = !dropdownVisible.value;
};

const selectLanguage = (lang) => {
  selectedLanguage.value = lang;
  saveSelectedLanguage();
  updateSelectedLanText(); // Update text based on selected language
  dropdownVisible.value = false;
};

onMounted(() => {
  loadCompletedCards();
  loadSelectedLanguage();
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
            :class="{
              deactive: !card.isActive,
              'align-right': card.alignRight,
            }"
            v-for="card in cardsWithActiveState"
            :key="card.id"
            @click="card.isActive ? goToQuestionsPage(card.id) : null"
          >
            <p>Card {{ card.id }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
