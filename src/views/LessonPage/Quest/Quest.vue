<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import cardsData from "@/data/card.json";
import uzQuestions from "@/data/cardUz.json"; // Ensure this file has the correct structure
import IncorrectIcon from "@/components/icons/IncorrectIcon.vue";
import "./quest.scss";

// Define the route and router
const route = useRoute();
const router = useRouter();

// Reactive state variables
const cardId = ref(null); // To store the current card ID
const currentQuestionIndex = ref(0); // To track the index of the current question
const selectedAnswer = ref(null); // To store the selected answer
const answerChecked = ref(false); // To check if an answer has been validated
const answerFeedback = ref(""); // To store feedback for the answer
const incorrectAnswers = ref([]); // To store indices of incorrect answers
const showReviewSection = ref(false); // Toggle for review section
const reviewButtonClicked = ref(false); // To track if the review button is clicked
const showModal = ref(false); // To display the modal after completion
const showExitConfirm = ref(false); // To show the exit confirmation modal
const completedCards = ref([]); // Store the completed cards
const selectedLanguage = ref(localStorage.getItem("selectedLanguage") || "uz"); // Get the selected language

// Load completed cards from localStorage
const loadCompletedCards = () => {
  completedCards.value = JSON.parse(localStorage.getItem("completedCards")) || [];
};

// Save completed cards to localStorage
const saveCompletedCards = () => {
  localStorage.setItem("completedCards", JSON.stringify(completedCards.value));
};

// Unlock the next card if available
const unlockNextCard = (id) => {
  if (id < cardsData.length && !completedCards.value.includes(id + 1)) {
    completedCards.value.push(id + 1);
    saveCompletedCards();
  }
};

// On component mount, set cardId and load completed cards
onMounted(() => {
  const id = Number(route.params.id); // Get the card ID from route params
  if (!isNaN(id) && cardsData.length > 0) {
    cardId.value = id - 1; // Adjust the ID if necessary
    loadCompletedCards();
  }
});

// Check if the selected answer is correct
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

console.log(uzQuestions);


// Go to the next question or review incorrect answers
const nextQuestion = () => {
  if (showReviewSection.value) {
    if (currentQuestionIndex.value < incorrectAnswers.value.length - 1) {
      currentQuestionIndex.value++;
    } else {
      showModal.value = true; // Show modal after reviewing all questions
    }
  } else {
    if (currentQuestionIndex.value < selectedCardQuestions.value.length - 1) {
      currentQuestionIndex.value++;
    } else {
      if (allQuestionsAnsweredCorrectly()) {
        showModal.value = true; // Show modal if all questions are answered correctly
      } else {
        showReviewSection.value = true; // Go to review section if incorrect answers exist
      }
    }
  }
  resetState();
};

// Review incorrect answers
const reviewIncorrectAnswers = () => {
  currentQuestionIndex.value = 0;
  reviewButtonClicked.value = true;
  resetState();
};

// Exit the quiz, optionally unlock the next card
const exit = (unlock = false) => {
  if (unlock && allQuestionsAnsweredCorrectly()) unlockNextCard(cardId.value);
  router.push("/lessons"); // Navigate back to lessons page
};

// Reset the state for the next question
const resetState = () => {
  selectedAnswer.value = null;
  answerChecked.value = false;
  answerFeedback.value = "";
};

// Check if all questions have been answered correctly
const allQuestionsAnsweredCorrectly = () => {
  return incorrectAnswers.value.length === 0;
};

// Get the selected card based on the card ID and if it is active
const selectedCard = computed(() => {
  return cardsData.find((card) => card.id === cardId.value && card.isActive) || { questions: [] };
});

// Get the selected questions based on the chosen language
const selectedCardQuestions = computed(() => {
  if (!selectedCard.value) return []; // Safeguard against undefined
  return selectedLanguage.value === "uz" ? uzQuestions[cardId.value]?.questions || [] : selectedCard.value.questions; // Use uzQuestions for Uzbek
});


// Get the current question, either for review or for answering
const currentQuestion = computed(() => {
  if (showReviewSection.value) {
    const incorrectIndex = incorrectAnswers.value[currentQuestionIndex.value];
    return selectedCardQuestions.value[incorrectIndex] || {}; // Safeguard
  } else {
    return selectedCardQuestions.value[currentQuestionIndex.value] || {}; // Safeguard
  }
});
</script>

<template>
  <div class="container">
    <div class="questions-page">
      <div class="incorrect-mark" @click="showExitConfirm = true">
        <IncorrectIcon :size="25" />
      </div>
      <div v-if="selectedCardQuestions.length > 0 && !showReviewSection">
        <p class="question">{{ currentQuestion.question }}</p>
        <ul>
          <li class="li"
            v-for="(option, idx) in currentQuestion.options"
            :key="idx"
            @click="selectedAnswer = option"
            :class="{
              selected: selectedAnswer === option,
              correct: answerChecked && option === currentQuestion.correctAnswer,
              incorrect: answerChecked && selectedAnswer === option && selectedAnswer !== currentQuestion.correctAnswer,
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
            incorrect: answerFeedback.includes(selectedLanguage === 'uz' ? 'Noto\'g\'ri' : 'Неправильно'),
            correct: answerFeedback.includes(selectedLanguage === 'uz' ? 'To\'g\'ri' : 'Правильно'),
          }"
        >
          {{ answerFeedback }}
        </p>
      </div>
      <div v-else-if="showReviewSection">
        <div v-if="!reviewButtonClicked" class="showbtn">
          <button class="skip" @click="reviewIncorrectAnswers">
            {{
              selectedLanguage === "uz"
                ? "Xatolarni Ko'rib Chiqish"
                : "Проверить Ошибки"
            }}
          </button>
          <button class="skip" @click="showExitConfirm = true">
            {{ selectedLanguage === "uz" ? "Chiqish" : "Выход" }}
          </button>
        </div>
        <div v-else>
          <p>
            <strong>{{
              selectedLanguage === "uz" ? "Savol:" : "Вопрос:"
            }}</strong> {{ currentQuestion.question }}
          </p>
          <ul>
            <li
              v-for="(option, idx) in currentQuestion.options"
              :key="idx"
              @click="selectedAnswer = option"
              :class="{
                selected: selectedAnswer === option,
                correct: answerChecked && option === currentQuestion.correctAnswer,
                incorrect: answerChecked && selectedAnswer === option && selectedAnswer !== currentQuestion.correctAnswer,
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
              incorrect: answerFeedback.includes(selectedLanguage === 'uz' ? 'Noto\'g\'ri' : 'Неправильно'),
              correct: answerFeedback.includes(selectedLanguage === 'uz' ? 'To\'g\'ri' : 'Правильно'),
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
          {{ selectedLanguage === "uz" ? "Barcha savollarni tugatdingiz." : "Вы завершили все вопросы." }}
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
          <button class="skip" @click="exit(false)">
            {{ selectedLanguage === "uz" ? "Ha, chiqish" : "Да, выйти" }}
          </button>
          <button class="skip" @click="showExitConfirm = false">
            {{ selectedLanguage === "uz" ? "Bekor qilish" : "Отмена" }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
