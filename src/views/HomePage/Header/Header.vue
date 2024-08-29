<script setup>
import HeaderButton from "@/UI/Buttons/HeaderButton/HeaderButton.vue";
import LIghtningIcon from "@/components/icons/LightningIcon.vue";
import GameIcon from "@/components/icons/GameIcon.vue";
import "./Header.scss";
</script>
<template>
  <header class="header">
    <div class="container">
      <div class="header__text-blog">
        <div class="header__text-blog-text">E-COURSE PLATFORM</div>
        <div class="header__text-blog-title">
          Learning and teaching online, made easy.
        </div>
        <div class="header__text-blog-text2">
          Practice your English and learn new things with the platform.
        </div>
        <HeaderButton :text="'About platform'" :icon='false' />
        <div class="header__text-blog-info">
          <div class="header__text-blog-info-card header__text-blog-info-card1">
            <div class="header__text-blog-info-card-top">
              <LIghtningIcon :size="30" />
              <h4 class="header__text-blog-info-card-top-text">600</h4>
              <div class="header__text-blog-info-card-top-plusicon">+</div>
            </div>
            <div class="header__text-blog-info-card-bot">
              <p>Popular words</p>
            </div>
          </div>
          <div class="header__text-blog-info-card header__text-blog-info-card2">
            <div class="header__text-blog-info-card-top">
              <GameIcon :size="30" />
              <h4 class="header__text-blog-info-card-top-text">2</h4>
              <div class="header__text-blog-info-card-top-plusicon">+</div>
            </div>
            <div class="header__text-blog-info-card-bot">
              <p>Mini-games</p>
            </div>
          </div>
        </div>
      </div>
      <div class="header__img-blog">
        <img
          src="@/assets/images/header-boy.svg"
          alt=""
          class="header__img-blog-boy"
        />
      </div>
    </div>
  </header>
</template>
