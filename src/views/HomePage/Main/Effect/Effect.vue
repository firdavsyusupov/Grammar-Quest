<script setup>
import { useI18n } from "vue-i18n";
const { t } = useI18n();
import "./effect.scss";
</script>
<template>
  <section class="effect">
    <div class="container">
      <img
        src="@/assets/images/main/effect-girl.png"
        loading="lazy"
        alt="image"
        class="effect-img"
      />
      <div class="effect-block">
        <h2>
          {{ t('effect.title') }} <span>E-Course</span>
        </h2>
        <div class="effect-card">
          <div></div>
          <p>{{ t('effect.point1') }}</p>
        </div>
        <div class="effect-card">
          <div></div>
          <p>{{ t('effect.point2') }}</p>
        </div>
        <div class="effect-card">
          <div></div>
          <p>{{ t('effect.point3') }}</p>
        </div>
      </div>
    </div>
  </section>

  <section class="work">
    <div class="container">
      <h2 class="work-title">{{ t('work.title') }}</h2>
      <div class="work-cards">
        <div class="work-card">
          <p class="work-card-num">01</p>
          <h3 class="work-card-title">{{ t('work.step1.title') }}</h3>
          <p class="work-card-text">{{ t('work.step1.text') }}</p>
          <img
            src="@/assets/images/main/work-card-img.png"
            loading="lazy"
            alt="Image"
          />
        </div>
        <div class="work-card">
          <p class="work-card-num">02</p>
          <h3 class="work-card-title">{{ t('work.step2.title') }}</h3>
          <p class="work-card-text">{{ t('work.step2.text') }}</p>
          <img
            src="@/assets/images/main/work-card-img.png"
            loading="lazy"
            alt="Image"
          />
        </div>
        <div class="work-card">
          <p class="work-card-num work-card-num2">03</p>
          <h3 class="work-card-title">{{ t('work.step3.title') }}</h3>
          <p class="work-card-text">{{ t('work.step3.text') }}</p>
          <img
            src="@/assets/images/main/work-card-img.png"
            loading="lazy"
            alt="Image"
          />
        </div>
      </div>
    </div>
  </section>
</template>

