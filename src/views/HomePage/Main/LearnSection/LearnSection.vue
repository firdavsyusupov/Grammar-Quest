<script setup>
import { useI18n } from 'vue-i18n'
import HeaderButton from "@/UI/Buttons/HeaderButton/HeaderButton.vue";
import "./learnsection.scss";

const { t } = useI18n()

const cards = [
  { icon: 'IconSchool' },
  { icon: 'IconStudent' },
  { icon: 'IconEmigrant' },
  { icon: 'IconSocial' },
  { icon: 'IconBusiness' },
  { icon: 'IconTraveler' }
]
</script>

<template>
  <section class="language">
    <img class="background-image" src="@/assets/images/main/chat-bg.png" loading="lazy" alt="Image">
    <div class="container">
      <div class="language-blocks">
        <div class="language-block language-block1">
          <h2 class="language-block-title">{{ t('learnsection.title1') }}</h2>
          <h3 class="language-block-title2">E-Course</h3>
          <p class="lanugage-block-text">
            <span>E-Course</span> {{ t('learnsection.description') }}
          </p>
          <HeaderButton :text="t('learnsection.tryFree')" />
        </div>
        <div class="language-block language-block2">
          <div class="language-card" v-for="(card, index) in cards" :key="index">
            <div :class="'icon' + (index + 1)">
              <component :is="card.icon" />
            </div>
            <h3>{{ t(`learnsection.cards.${index}.title`) }}</h3>
            <p>{{ t(`learnsection.cards.${index}.text`) }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

