<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import cardsData from "@/data/cardRu.json";
import uzQuestions from "@/data/cardUz.json";
import IncorrectIcon from "@/components/icons/IncorrectIcon.vue";
import "./quest.scss";

const route = useRoute();
const router = useRouter();

const cardId = ref(null);
const currentQuestionIndex = ref(0);
const selectedAnswer = ref(null);
const answerChecked = ref(false);
const answerFeedback = ref("");
const incorrectAnswers = ref([]);
const showReviewSection = ref(false);
const reviewButtonClicked = ref(false);
const showModal = ref(false);
const showExitConfirm = ref(false);
const completedCards = ref([]);
const selectedLanguage = ref(localStorage.getItem("selectedLanguage") || "ru");

const loadCompletedCards = () => {
  completedCards.value = JSON.parse(localStorage.getItem("completedCards")) || [
    1,
  ];
};

const saveCompletedCards = () => {
  localStorage.setItem("completedCards", JSON.stringify(completedCards.value));
};

const unlockNextCard = (id) => {
  const idtrue = id + 1;
  if (incorrectAnswers.value.length === 0) {
    completedCards.value.push(idtrue + 1);
    saveCompletedCards();
  }
};

onMounted(() => {
  const id = Number(route.params.id);

  if (!isNaN(id) && cardsData.length > 0) {
    cardId.value = id - 1;
    loadCompletedCards();
  }
});

const checkAnswer = () => {
  const currentQData = currentQuestion.value;
  const isCorrect = selectedAnswer.value === currentQData.correctAnswer;

  answerFeedback.value = isCorrect
    ? selectedLanguage.value === "uz"
      ? "To'g'ri!"
      : "Правильно!"
    : selectedLanguage.value === "uz"
    ? `Noto'g'ri! To'g'ri javob: ${currentQData.correctAnswer}`
    : `Неправильно! Правильный ответ: ${currentQData.correctAnswer}`;

  if (!isCorrect) incorrectAnswers.value.push(currentQuestionIndex.value);
  answerChecked.value = true;
};

const nextQuestion = () => {
  if (showReviewSection.value) {
    if (currentQuestionIndex.value < incorrectAnswers.value.length - 1) {
      currentQuestionIndex.value++;
    } else {
      showModal.value = true;
      unlockNextCard(cardId.value);
    }
  } else {
    if (currentQuestionIndex.value < selectedCardQuestions.value.length - 1) {
      currentQuestionIndex.value++;
    } else {
      if (allQuestionsAnsweredCorrectly()) {
        showModal.value = true;
        unlockNextCard(cardId.value);
      } else {
        showReviewSection.value = true;
      }
    }
  }
  resetState();
};

const reviewIncorrectAnswers = () => {
  currentQuestionIndex.value = 0;
  reviewButtonClicked.value = true;
  resetState();
};

const exit = (unlock = false) => {
  if (allQuestionsAnsweredCorrectly()) {
    showModal.value = true;
    unlockNextCard(cardId.value);
  } else {
    showModal.value = true;
  }

  router.push("/lessons");
};

const resetState = () => {
  selectedAnswer.value = null;
  answerChecked.value = false;
  answerFeedback.value = "";
};

const allQuestionsAnsweredCorrectly = () => {
  return incorrectAnswers.value.length === 0;
};
const selectedCard = computed(() => {
  return (
    cardsData.find((card) => card.id === cardId.value && card.isActive) || {
      questions: [],
    }
  );
});

const selectedCardQuestions = computed(() => {
  if (!selectedCard.value) return [];
  return selectedLanguage.value === "uz"
    ? uzQuestions[cardId.value]?.questions || []
    : cardsData[cardId.value]?.questions || [];
});

const currentQuestion = computed(() => {
  if (showReviewSection.value) {
    const incorrectIndex = incorrectAnswers.value[currentQuestionIndex.value];
    return selectedCardQuestions.value[incorrectIndex] || {};
  } else {
    return selectedCardQuestions.value[currentQuestionIndex.value] || {};
  }
});

function quesexit() {
  router.push("/lessons");
}
</script>

<template>
  <div class="questions-page">
    <div class="container">
      <div class="incorrect-mark" @click="showExitConfirm = true">
        <IncorrectIcon :size="25" />
      </div>
      <div v-if="selectedCardQuestions.length > 0 && !showReviewSection">
        <p class="question">{{ currentQuestion.question }}</p>
        <ul>
          <li
            class="li"
            v-for="(option, idx) in currentQuestion.options"
            :key="idx"
            @click="selectedAnswer = option"
            :class="{
              selected: selectedAnswer === option,
              correct:
                answerChecked && option === currentQuestion.correctAnswer,
              incorrect:
                answerChecked &&
                selectedAnswer === option &&
                selectedAnswer !== currentQuestion.correctAnswer,
            }"
          >
            {{ option }}
          </li>
        </ul>
        <div class="buttons">
          <button class="skip" @click="nextQuestion" v-if="!answerChecked">
            {{ selectedLanguage === "uz" ? "Oʻtkazib yuborish" : "Пропустить" }}
          </button>
          <button
            class="check"
            @click="checkAnswer"
            :disabled="!selectedAnswer"
            v-if="!answerChecked"
          >
            {{ selectedLanguage === "uz" ? "Tekshirish" : "Проверить" }}
          </button>
          <button
            class="nextQuestion"
            @click="nextQuestion"
            v-if="answerChecked"
          >
            {{
              selectedLanguage === "uz" ? "Keyingi Savol" : "Следующий Вопрос"
            }}
          </button>
        </div>
        <p
          :class="{
            incorrect: answerFeedback.includes(
              selectedLanguage === 'uz' ? 'Noto\'g\'ri' : 'Неправильно'
            ),
            correct: answerFeedback.includes(
              selectedLanguage === 'uz' ? 'To\'g\'ri' : 'Правильно'
            ),
          }"
        >
          {{ answerFeedback }}
        </p>
      </div>
      <div v-else-if="showReviewSection">
        <div class="resultDiv">
          <h2 class="showResult">
            {{
              selectedLanguage === "uz"
                ? `${
                    selectedCardQuestions.length - incorrectAnswers.length
                  } / ${selectedCardQuestions.length}`
                : `${
                    selectedCardQuestions.length - incorrectAnswers.length
                  } / ${selectedCardQuestions.length}`
            }}
          </h2>
        </div>
        <div v-if="!reviewButtonClicked" class="showbtn">
          <button class="skip" @click="reviewIncorrectAnswers">
            {{
              selectedLanguage === "uz"
                ? "Xatolarni Ko'rib Chiqish"
                : "Проверить Ошибки"
            }}
          </button>
          <button class="check" @click="showExitConfirm = true">
            {{ selectedLanguage === "uz" ? "Chiqish" : "Выход" }}
          </button>
        </div>
        <div v-else>
          <p>
            <strong>{{
              selectedLanguage === "uz" ? "Savol:" : "Вопрос:"
            }}</strong>
            {{ currentQuestion.question }}
          </p>
          <ul>
            <li
              v-for="(option, idx) in currentQuestion.options"
              :key="idx"
              @click="selectedAnswer = option"
              :class="{
                selected: selectedAnswer === option,
                correct:
                  answerChecked && option === currentQuestion.correctAnswer,
                incorrect:
                  answerChecked &&
                  selectedAnswer === option &&
                  selectedAnswer !== currentQuestion.correctAnswer,
              }"
            >
              {{ option }}
            </li>
          </ul>
          <div class="buttons">
            <button
              class="check"
              @click="checkAnswer"
              :disabled="!selectedAnswer"
              v-if="!answerChecked"
            >
              {{ selectedLanguage === "uz" ? "Tekshirish" : "Проверить" }}
            </button>
            <button
              class="nextQuestion"
              @click="nextQuestion"
              v-if="answerChecked"
            >
              {{
                selectedLanguage === "uz"
                  ? "Keyingi Noto'g'ri Javob"
                  : "Следующий Неправильный Ответ"
              }}
            </button>
          </div>
          <p
            :class="{
              incorrect: answerFeedback.includes(
                selectedLanguage === 'uz' ? 'Noto\'g\'ri' : 'Неправильно'
              ),
              correct: answerFeedback.includes(
                selectedLanguage === 'uz' ? 'To\'g\'ri' : 'Правильно'
              ),
            }"
          >
            {{ answerFeedback }}
          </p>
        </div>
      </div>
      <div v-else>No questions available for this card.</div>
    </div>
    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <h2 class="cong">
          {{ selectedLanguage === "uz" ? "Tabriklaymiz!" : "Поздравляем!" }}
        </h2>
        <p>
          {{
            selectedLanguage === "uz"
              ? "Barcha savollarni tugatdingiz."
              : "Вы завершили все вопросы."
          }}
        </p>
        <button class="skip" @click="exit(true)">
          {{ selectedLanguage === "uz" ? "Chiqish" : "Выход" }}
        </button>
      </div>
    </div>
    <div v-if="showExitConfirm" class="modal">
      <div class="modal-content">
        <h2>
          {{
            selectedLanguage === "uz"
              ? "Chiqishni xohlaysizmi?"
              : "Вы уверены, что хотите выйти?"
          }}
        </h2>
        <div class="buttons">
          <button class="skip" @click="quesexit">
            {{ selectedLanguage === "uz" ? "Ha, chiqish" : "Да, выйти" }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
