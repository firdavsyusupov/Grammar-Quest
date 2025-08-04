<script setup>
import HeaderButton from "@/UI/Buttons/HeaderButton/HeaderButton.vue";
import { computed, ref } from "vue";
import PlusIcon from "@/components/icons/PlusIcon.vue";
import { useI18n } from "vue-i18n";

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
    <div class="container faqCon">
      <div class="faq-page-title">
        <h2>{{ t("navbar.faq") }}</h2>
        <span class="faq-text">{{ t("faq.text") }}</span>
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
      <div class="faq-type">
        <div class="faq-type-block">
          <h3>{{ t("faq.title") }}</h3>
          <p>{{ t("faq.text2") }}</p>
          <div>
            <HeaderButton :text="t('faq.btn')" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.faq-type {
  background: url(@/assets/images/faq-page.png) no-repeat center / cover;
  min-height: 540px;
  border-radius: 20px;
  margin-top: 80px;
  display: flex;
  justify-content: end;
  align-items: center;
  &-block {
    display: flex;
    flex-direction: column;
    width: 50%;
    & h3 {
      font-weight: 900;
      font-size: 46px;
      line-height: 1.17391;
      letter-spacing: 0.01em;
      color: #232323;
    }
    & p {
      font-weight: 500;
      font-size: 20px;
      width: 70%;
      line-height: 1.4;
      letter-spacing: 0.01em;
      color: #585858;
    }
    gap: 20px;
  }
}
.faqCon {
  display: flex;
  flex-direction: column;
}
.faq-page-title {
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  & h2 {
    font-weight: 900;
    font-size: 46px;
    line-height: 1.17391;
    letter-spacing: 0.01em;
    color: #232323;
  }
}

.faq-text {
  font-weight: 500;
  font-size: 20px;
  line-height: 1.4;
  letter-spacing: 0.01em;
  color: #585858;
  margin-top: 10px;
}
</style>
