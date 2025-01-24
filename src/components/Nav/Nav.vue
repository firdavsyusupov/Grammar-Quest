<script setup>
import { RouterLink } from "vue-router";
import RightIcon from "../../components/icons/RightIcon.vue";
import Signup from "@/UI/Buttons/SignUp/SignUp.vue";
import BottomIcon from "@/components/icons/BottomIcon.vue";
import { onMounted, onUnmounted, ref } from "vue";
import "./nav.scss";

const isOpen = ref(false);
const dropdownOpen = ref(false);

const toggleMenu = () => {
  isOpen.value = !isOpen.value;
};

const toggleDropdown = (e) => {
  e.stopPropagation();
  dropdownOpen.value = !dropdownOpen.value;
};

const closeMenu = (e) => {
  if (!e.target.closest(".bar") && !e.target.closest(".nav__links")) {
    isOpen.value = false;
  }
  if (!e.target.closest(".nav__item2") && dropdownOpen.value) {
    dropdownOpen.value = false;
  }
};

const closeMenuOnScroll = () => {
  if (isOpen.value) {
    isOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener("click", closeMenu);
  document.addEventListener("scroll", closeMenuOnScroll);
});

onUnmounted(() => {
  document.removeEventListener("click", closeMenu);
  document.removeEventListener("scroll", closeMenuOnScroll);
});
</script>

<template>
  <nav class="nav">
    <div class="container">
      <div class="nav__links">
        <div class="add-padding">
          <RouterLink to="/" class="logo">
            <img src="@/assets/images/logo.svg" alt="" class="logo-img" />
          </RouterLink>
          <div class="bar" :class="{ open: isOpen }" @click="toggleMenu">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        <ul class="nav__items" :class="{ active: isOpen }" @click="toggleMenu">
          <li class="nav__item">
            <RouterLink to="/" class="nav__link">home</RouterLink>
          </li>
          <li class="nav__item">
            <RouterLink to="/textbook" class="nav__link">textbook</RouterLink>
          </li>
          <li class="nav__item">
            <RouterLink to="/about" class="nav__link">our team</RouterLink>
          </li>
          <li class="nav__item">
            <RouterLink to="/platform" class="nav__link">platforms</RouterLink>
          </li>
          <li class="nav__item">
            <RouterLink to="/chat" class="nav__link">Chat</RouterLink>
          </li>
          <li
            class="nav__item nav__item2"
            @click="toggleDropdown"
          >
            <a href="#" class="nav__link">games</a>
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
      <div class="nav__login"></div>
    </div>
  </nav>
</template>
