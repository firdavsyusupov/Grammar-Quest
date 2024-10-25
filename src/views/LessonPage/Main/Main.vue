<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import cardsData from "@/data/card.json";
import uz from "@/assets/images/uz.png";
import ru from "@/assets/images/ru.png";
import "./main.scss";
import StarIcon from "@/components/icons/StarIcon.vue";

const router = useRouter();
const completedCards = ref([]);
const selectedLanguage = ref("uz");
const dropdownVisible = ref(false);

const texts = ref({
  selectedLan: "Tanlangan til:", 
});

// Tanlangan til matnini yangilash
const updateSelectedLanText = () => {
  texts.value.selectedLan = selectedLanguage.value === "uz" ? "Tanlangan til:" : "Выбранный язык:";
};

// Tugallangan kartalarni yuklash
const loadCompletedCards = () => {
  completedCards.value = JSON.parse(localStorage.getItem("completedCards")) || [];
};
const finishQuestions = () => {
  // Barcha savollarga javob berilgandan so'ng
  unlockNextCard(currentCardId); // O'zgaruvchini moslashtiring
  router.push({ name: "Main" }); // Asosiy sahifaga qaytish
};

// Tugallangan kartalarni saqlash
const saveCompletedCards = () => {
  localStorage.setItem("completedCards", JSON.stringify(completedCards.value));
};

// Tanlangan tildan keyin kartalarga o'tish
const loadSelectedLanguage = () => {
  selectedLanguage.value = localStorage.getItem("selectedLanguage") || "uz";
  updateSelectedLanText();
};

// Tanlangan tilni saqlash
const saveSelectedLanguage = () => {
  localStorage.setItem("selectedLanguage", selectedLanguage.value);
};

// Savollar sahifasiga o'tish
const goToQuestionsPage = (id) => {
  // Karta tugallanganda keyingi kartani qulfdan chiqarish
  if (!completedCards.value.includes(id)) {
    completedCards.value.push(id);
    saveCompletedCards(); // Tugallangan kartani saqlash
    unlockNextCard(id); // Keyingi kartani qulfdan chiqarish
  }
  // Savollar sahifasiga o'tish
  router.push({ name: "Questions", params: { id } });
};

// Keyingi kartani qulfdan chiqarish
const unlockNextCard = (id) => {
  if (id < cardsData.length && !completedCards.value.includes(id + 1)) {
    completedCards.value.push(id + 1);
    saveCompletedCards();
  }
};

const cardsWithActiveState = ref([]);

// Kartalar uslublarini yangilash
const updateCardStyles = () => {
  cardsWithActiveState.value = cardsData.map((card, index) => ({
    ...card,
    isActive: completedCards.value.includes(card.id) || card.id === 1,
    alignRight: index % 2 === 0,
  }));
};

// Til tanlashni ko'rsatish/yoqish
const toggleDropdown = () => {
  dropdownVisible.value = !dropdownVisible.value;
};

// Tilni tanlash
const selectLanguage = (lang) => {
  selectedLanguage.value = lang;
  saveSelectedLanguage();
  updateSelectedLanText();
  dropdownVisible.value = false;
};

// Sahifa yuklanganda
onMounted(() => {
  loadCompletedCards();
  loadSelectedLanguage();
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
            :class="{
              deactive: !card.isActive,
              'align-right': card.alignRight,
            }"
            v-for="card in cardsWithActiveState"
            :key="card.id"
            @click="card.isActive ? goToQuestionsPage(card.id) : null"
          >
            <StarIcon :size="30" :color="'green'" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
