<script setup>
import HeaderButton from "@/UI/Buttons/HeaderButton/HeaderButton.vue";
import { computed, ref } from "vue";
import PlusIcon from "@/components/icons/PlusIcon.vue";
import { useI18n } from "vue-i18n";
import "./faq.scss";

const { t } = useI18n();

const activeIndex = ref(null);

const toggle = (index) => {
  activeIndex.value = activeIndex.value === index ? null : index;
};

const faqs = computed(() => [
  { question: t("faq.q1"), answer: t("faq.a1") },
  { question: t("faq.q2"), answer: t("faq.a2") },
  { question: t("faq.q3"), answer: t("faq.a3") },
  { question: t("faq.q4"), answer: t("faq.a4") },
  { question: t("faq.q5"), answer: t("faq.a5") },
]);
</script>

<template>
  <section class="faq">
    <div class="container">
      <div class="faq-block">
        <div>
          <div class="faq-title">Отвечаем на частые вопросы</div>

          <HeaderButton :text="'Задать вопрос'" />
        </div>
        <img
          src="@/assets/images/main/faq-img.png"
          alt="Iamge"
          loading="lazy"
        />
      </div>
      <div class="faq-items">
        <div
          class="faq-item"
          v-for="(item, index) in faqs"
          :key="index"
          :class="{ active: activeIndex === index }"
        >
          <div class="faq-question">
            {{ item.question }}
            <PlusIcon
              :size="30"
              class="faq-btn"
              @click="toggle(index)"
              :class="{ active: activeIndex === index }"
            />
          </div>

          <transition name="faq">
            <div class="faq-answer" v-if="activeIndex === index">
              {{ item.answer }}
            </div>
          </transition>
        </div>
      </div>
    </div>
  </section>
</template>

