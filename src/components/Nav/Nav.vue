<script setup>
import { RouterLink, useRoute } from "vue-router";
import { onMounted, onUnmounted, ref, computed, watch } from "vue";
import { useI18n } from "vue-i18n";
import RightIcon from "@/components/icons/RightIcon.vue";
import BottomIcon from "@/components/icons/BottomIcon.vue";
import SignoutIcon from "../icons/SignoutIcon.vue";
import uz from "@/assets/images/uz.png";
import ru from "@/assets/images/ru.png";
import "./nav.scss";
import { useLoginStore } from "@/stores/login";

const isOpen = ref(false);
const dropdownOpen = ref(false);
const openModal = ref(false);
const store = useLoginStore();
const route = useRoute();
const { t, locale } = useI18n();

const isLessonsRoute = computed(() => route.path === "/lessons");
const selectedLanguage = ref(localStorage.getItem("selectedLanguage") || "ru");
const langDropdownOpen = ref(false);
import en from "@/assets/images/en.png";
onUnmounted(() => {
  document.removeEventListener("click", closeMenu);
  document.removeEventListener("scroll", closeMenuOnScroll);
  document.body.style.overflow = "";
});

watch(openModal, (newVal) => {
  document.body.style.overflow = newVal ? "hidden" : "";
});

watch(openModal, (newVal) => {
  if (newVal) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }
}); 
const getFlag = (lang) => {
  switch (lang) {
    case "uz":
      return uz;
    case "ru":
      return ru;
    case "en":
      return en;
    default:
      return ru;
  }
};

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
  locale.value = lang
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
              <RouterLink to="/" class="nav__link">{{
                t("navbar.home")
              }}</RouterLink>
            </li>
            <li class="nav__item">
              <RouterLink to="/textbook" class="nav__link">{{
                t("navbar.textbook")
              }}</RouterLink>
            </li>
            <li class="nav__item">
              <RouterLink to="/about" class="nav__link">{{
                t("navbar.ourTeam")
              }}</RouterLink>
            </li>
            <li class="nav__item">
              <RouterLink to="/platform" class="nav__link">{{
                t("navbar.platforms")
              }}</RouterLink>
            </li>
            <li class="nav__item">
              <RouterLink to="/chat" class="nav__link">{{
                t("navbar.chat")
              }}</RouterLink>
            </li>
            <li class="nav__item nav__item2" @click="toggleDropdown">
              <a href="#" class="nav__link">{{ t("navbar.games") }}</a>
              <BottomIcon :size="25" class="bottom-icon" />
              <div class="nav-dropdown" v-show="dropdownOpen">
                <RouterLink to="/textbook" class="nav-dropdown-block">
                  <h5 class="nav-dropdown-block-text">
                    {{ t("navbar.sprint") }}
                  </h5>
                  <RightIcon :size="20" class="nav-dropdown-block-icon" />
                </RouterLink>
                <RouterLink to="/lessons" class="nav-dropdown-block">
                  <h5 class="nav-dropdown-block-text">
                    {{ t("navbar.lessons") }}
                  </h5>
                  <RightIcon :size="20" class="nav-dropdown-block-icon" />
                </RouterLink>
              </div>
            </li>
            <li class="nav__item nav__item2" @click="toggleDropdown">
              <a href="#" class="nav__link">{{ t("navbar.more") }}</a>
              <BottomIcon :size="25" class="bottom-icon" />
              <div class="nav-dropdown" v-show="dropdownOpen">
                <RouterLink to="/faq" class="nav-dropdown-block">
                  <h5 class="nav-dropdown-block-text">
                    {{ t("navbar.faq") }}
                  </h5>
                  <RightIcon :size="20" class="nav-dropdown-block-icon" />
                </RouterLink>
                <RouterLink to="/contact" class="nav-dropdown-block">
                  <h5 class="nav-dropdown-block-text">
                    {{ t("footer.contactsTitle") }}
                  </h5>
                  <RightIcon :size="20" class="nav-dropdown-block-icon" />
                </RouterLink>
              </div>
            </li>
          </ul>
        </div>

        <div class="flex">
          <div class="language-switch" @click="toggleLangDropdown">
            <img class="flag" :src="getFlag(selectedLanguage)" alt="Lang" />
            <transition name="fade">
              <div class="language-dropdown" v-if="langDropdownOpen">
                <div
                  class="language-option"
                  :class="{ selected: selectedLanguage === 'uz' }"
                  @click.stop="selectLanguage('uz')"
                >
                  <img :src="uz" /> <span>O‘zbek</span>
                </div>
                <div
                  class="language-option"
                  :class="{ selected: selectedLanguage === 'ru' }"
                  @click.stop="selectLanguage('ru')"
                >
                  <img :src="ru" /> <span>Русский</span>
                </div>
                <div
                  class="language-option"
                  :class="{ selected: selectedLanguage === 'en' }"
                  @click.stop="selectLanguage('en')"
                >
                  <img :src="en" /> <span>English</span>
                </div>
              </div>
            </transition>
          </div>
          <RouterLink to="/auth" v-if="!store.logged">
            <button class="sign">{{ t("navbar.login") }}</button>
          </RouterLink>
          <div v-if="store.logged" class="logged-actions">
            <button @click="openModal = true" class="signout">
              <span>{{ t("navbar.logout") }}</span>
              <SignoutIcon class="signout-icon" :size="30" />
            </button>
          </div>
        </div>
      </div>
      <div
        v-if="route.path === '/lessons'"
        class="lan"
        @click="toggleLangDropdown"
      >
        <h3>{{ t("navbar.selectedLan") }}</h3>
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
    <span>{{ t("modal.confirmExit") }}</span>
    <div class="btns">
      <button @click="openModal = false" class="cancel">
        {{ t("modal.noCancel") }}
      </button>
      <button @click="logout" class="confirm">
        {{ t("modal.yesLogout") }}
      </button>
    </div>
  </div>
  <div @click="openModal = false" v-if="openModal" class="modal-overlay"></div>
</template>

<style lang="scss" scoped>
.logged-actions {
  display: flex;
  align-items: center;
  gap: 15px;
  position: relative;
}

.language-switch {
  position: relative;
  cursor: pointer;
  .flag {
    width: 32px;
    height: 22px;
    border-radius: 4px;
    transition: transform 0.3s;
  }
  &:hover .flag {
    transform: scale(1.05);
  }
}

.language-dropdown {
  position: absolute;
  top: 35px;
  left: 0;
  background: white;
  border: 1px solid #ccc;
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 99;
  padding: 8px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  min-width: 120px;
}

.language-option {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 10px;
  border-radius: 4px;
  transition: background 0.2s;
  cursor: pointer;
  img {
    width: 22px;
    height: 15px;
    border-radius: 3px;
  }
  span {
    font-size: 14px;
    color: #333;
  }
  &:hover {
    background-color: #f5f5f5;
  }
  &.selected {
    background-color: #eee;
    font-weight: bold;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
