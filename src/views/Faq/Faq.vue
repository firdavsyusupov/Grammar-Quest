<script setup>
import HeaderButton from "@/UI/Buttons/HeaderButton/HeaderButton.vue";
import { ref } from "vue";

const faqs = [
  {
    question: "Qanday ro‘yxatdan o‘tiladi?",
    answer: "Ro‘yxatdan o‘tish uchun yuqoridagi tugmani bosing.",
  },
  {
    question: "Telefon raqamni qanday kiritaman?",
    answer: "Faqat +998 bilan boshlanuvchi raqamni kiriting.",
  },
  {
    question: "Parolni unutdim. Nima qilay?",
    answer: "Parolni tiklash uchun 'Parolni unutdingizmi?' tugmasini bosing.",
  },
  {
    question: "Kurslar qancha davom etadi?",
    answer: "Kurslar o‘rtacha 3 oy davom etadi.",
  },
  {
    question: "Sertifikat beriladimi?",
    answer: "Ha, kurs tugagach sertifikat beriladi.",
  },
];

const activeIndex = ref(null);

const toggle = (index) => {
  activeIndex.value = activeIndex.value === index ? null : index;
};
</script>

<template>
  <section class="faq">
    <div class="container">
      <div class="faq-block">
        <div class="faq-title">Отвечаем на частые вопросы</div>
        <HeaderButton :text="'Задать вопрос'" />
        <img
          src="@/assets/images/main/faq-img.png"
          alt="Iamge"
          loading="lazy"
        />
      </div>
      <div class="faq-item" v-for="(item, index) in faqs" :key="index">
        <div class="faq-question" @click="toggle(index)">
          {{ item.question }}
          <span>+</span>
        </div>

        <transition name="faq">
          <div class="faq-answer" v-if="activeIndex === index">
            {{ item.answer }}
          </div>
        </transition>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.faq {
  padding: 40px 0;
}

.faq-item {
  margin-bottom: 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
}

.faq-question {
  font-weight: bold;
  padding: 5px;
  background: #f2f2f2;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.faq-question span {
    cursor: pointer;
  font-size: 30px;
}

.faq-answer {
  padding: 15px;
  background: #fff;
}

/* Transition styles */
.faq-enter-active,
.faq-leave-active {
  transition: all 0.3s ease;
}
.faq-enter-from,
.faq-leave-to {
  max-height: 0;
  opacity: 0;
  padding: 0 15px;
}
.faq-enter-to,
.faq-leave-from {
  max-height: 200px;
  opacity: 1;
  padding: 15px;
}
</style>
