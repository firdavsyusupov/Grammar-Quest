<script setup>
import HeaderButton from "@/UI/Buttons/HeaderButton/HeaderButton.vue";
import { useI18n } from "vue-i18n";
import "./Header.scss";

const { t } = useI18n();
</script>

<template>
  <header class="header">
    <div class="container">
      <div class="header__text-blog">
        <div class="header__text-blog-text">{{ t("header.platform") }}</div>
        <div class="header__text-blog-title">{{ t("header.title") }}</div>
        <div class="header__text-blog-text2">{{ t("header.subtitle") }}</div>
        <div class="header-btns">
          <RouterLink class="header-btn" to="/platform">
            <HeaderButton :text="t('header.tryFree')" />
          </RouterLink>
          <RouterLink class="play-btn" to="/">
            <div class="icon">
              <svg
                width="22"
                height="22"
                viewBox="0 0 12 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17.2864 9.304C18.5397 10.0873 18.5397 11.9127 17.2864 12.696L3.06 21.5875C1.7279 22.4201 -1.00372e-06 21.4624 -9.35052e-07 19.8915L-1.57732e-07 2.10849C-8.90674e-08 0.537623 1.7279 -0.420062 3.06 0.412498L17.2864 9.304Z"
                  fill="#F6B5B6"
                />
              </svg>
            </div>
            <p>{{ t("header.watchPromo") }}</p>
          </RouterLink>
        </div>
      </div>
      <div class="header__img-blog">
        <img
          src="@/assets/images/header/header-bg.svg"
          alt=""
          class="header__img-blog-boy"
        />
      </div>
    </div>
  </header>
</template>
