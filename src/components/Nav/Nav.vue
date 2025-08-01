<script setup>
import { RouterLink, useRoute } from "vue-router";
import { onMounted, onUnmounted, ref, computed } from "vue";
import RightIcon from "@/components/icons/RightIcon.vue";
import BottomIcon from "@/components/icons/BottomIcon.vue";
import uz from "@/assets/images/uz.png";
import ru from "@/assets/images/ru.png";
import "./nav.scss";
import { useLoginStore } from "@/stores/login";
import SignoutIcon from "../icons/SignoutIcon.vue";

const isOpen = ref(false);
const dropdownOpen = ref(false);
const openModal = ref(false)
const store = useLoginStore();
const route = useRoute();
const isLessonsRoute = computed(() => route.path === "/lessons");
const selectedLanguage = ref(localStorage.getItem("selectedLanguage") || "ru");
const texts = ref({
  selectedLan:
    selectedLanguage.value === "uz" ? "Tanlangan til:" : "Выбранный язык:",
});
const langDropdownOpen = ref(false);

const toggleMenu = () => (isOpen.value = !isOpen.value);
const toggleDropdown = (e) => {
  e.stopPropagation();
  dropdownOpen.value = !dropdownOpen.value;
};
const toggleLangDropdown = (e) => {
  e.stopPropagation();
  langDropdownOpen.value = !langDropdownOpen.value;
};
const selectLanguage = (lang) => {
  selectedLanguage.value = lang;
  localStorage.setItem("selectedLanguage", lang);
  texts.value.selectedLan =
    lang === "uz" ? "Tanlangan til:" : "Выбранный язык:";
  langDropdownOpen.value = false;
};

const closeMenu = (e) => {
  if (!e.target.closest(".bar") && !e.target.closest(".nav__links"))
    isOpen.value = false;
  if (!e.target.closest(".nav__item2") && dropdownOpen.value)
    dropdownOpen.value = false;
  if (!e.target.closest(".lan") && langDropdownOpen.value)
    langDropdownOpen.value = false;
};
const closeMenuOnScroll = () => {
  if (isOpen.value) isOpen.value = false;
};

onMounted(() => {
  document.addEventListener("click", closeMenu);
  document.addEventListener("scroll", closeMenuOnScroll);
});
onUnmounted(() => {
  document.removeEventListener("click", closeMenu);
  document.removeEventListener("scroll", closeMenuOnScroll);
});

const logout = () => {
  store.logout();
  openModal.value = false;
  location.reload();
};

</script>

<template>
  <nav class="nav" :class="{ 'nav--green': isLessonsRoute }">
    <div class="navContainer" :class="{ 'nav-con': isLessonsRoute }">
      <div class="nav__links">
        <div class="bar" :class="{ open: isOpen }" @click="toggleMenu">
          <span></span><span></span><span></span>
        </div>
        <div class="parent-div">
          <RouterLink to="/" class="logo">
            <img
              src="@/assets/images/logo-e-course.svg"
              style="width: 70px"
              alt="Logo"
              class="logo-img"
            />
          </RouterLink>
          <ul
            class="nav__items"
            :class="{ active: isOpen }"
            @click="toggleMenu"
          >
            <li class="nav__item">
              <RouterLink to="/" class="nav__link">Home</RouterLink>
            </li>
            <li class="nav__item">
              <RouterLink to="/textbook" class="nav__link">Textbook</RouterLink>
            </li>
            <li class="nav__item">
              <RouterLink to="/about" class="nav__link">Our Team</RouterLink>
            </li>
            <li class="nav__item">
              <RouterLink to="/platform" class="nav__link"
                >Platforms</RouterLink
              >
            </li>
            <li class="nav__item">
              <RouterLink to="/chat" class="nav__link">Chat</RouterLink>
            </li>
            <li class="nav__item nav__item2" @click="toggleDropdown">
              <a href="#" class="nav__link">Games</a>
              <BottomIcon :size="25" class="bottom-icon" />
              <div class="nav-dropdown" v-show="dropdownOpen">
                <RouterLink to="/textbook" class="nav-dropdown-block">
                  <h5 class="nav-dropdown-block-text">Sprint</h5>
                  <RightIcon :size="20" class="nav-dropdown-block-icon" />
                </RouterLink>
                <RouterLink to="/lessons" class="nav-dropdown-block">
                  <h5 class="nav-dropdown-block-text">Lessons</h5>
                  <RightIcon :size="20" class="nav-dropdown-block-icon" />
                </RouterLink>
              </div>
            </li>
          </ul>
        </div>
        <RouterLink to="/auth" v-if="!store.logged">
          <button class="sign">Войти</button>
        </RouterLink>
        <button @click="openModal = true" v-if="store.logged" class="signout">
          <span>Выйти</span>
          <SignoutIcon class="signout-icon" :size="30" />
        </button>
      </div>
      <div
        v-if="route.path === '/lessons'"
        class="lan"
        @click="toggleLangDropdown"
      >
        <h3>{{ texts.selectedLan }}</h3>
        <div class="lan-img">
          <img :src="selectedLanguage === 'ru' ? ru : uz" alt="Language" />
        </div>
        <transition name="fade">
          <div class="lan-dropdown" v-if="langDropdownOpen">
            <div
              class="uz"
              :class="{ selected: selectedLanguage === 'uz' }"
              @click="selectLanguage('uz')"
            >
              <img :src="uz" alt="Uzbek" />
            </div>
            <hr />
            <div
              class="ru"
              :class="{ selected: selectedLanguage === 'ru' }"
              @click="selectLanguage('ru')"
            >
              <img :src="ru" alt="Russian" />
            </div>
          </div>
        </transition>
      </div>
    </div>
  </nav>
    <div v-if="openModal" class="modal">
      <span>Вы действительно хотите <br> выйти из аккаунта?</span>
      <div class="btns">
        <button @click="openModal = !openModal" class="cancel">Нет, отмена</button>
        <button @click="logout" class="confirm">Да, выйти</button>
      </div>
    </div>
    <div @click="openModal = !openModal" v-if="openModal" class="modal-overlay"></div>
</template>