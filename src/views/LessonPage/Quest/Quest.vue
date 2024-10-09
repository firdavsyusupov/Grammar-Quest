<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import cardsData from "@/data/card.json";
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

const loadCompletedCards = () => {
  completedCards.value = JSON.parse(localStorage.getItem("completedCards")) || [];
};

const saveCompletedCards = () => {
  localStorage.setItem("completedCards", JSON.stringify(completedCards.value));
};

const unlockNextCard = (id) => {
  if (id < 4 && !completedCards.value.includes(id + 1)) {
    completedCards.value.push(id + 1);
    saveCompletedCards();
  }
};

onMounted(() => {
  const id = Number(route.params.id);
  if (!isNaN(id)) {
    cardId.value = id;
    loadCompletedCards();
  }
});

const checkAnswer = () => {
  const isCorrect = selectedAnswer.value === currentQuestion.value.correctAnswer;
  answerFeedback.value = isCorrect ? "Correct!" : `Incorrect! The correct answer is: ${currentQuestion.value.correctAnswer}`;
  if (!isCorrect) incorrectAnswers.value.push(currentQuestion.value);
  answerChecked.value = true;
};

const nextQuestion = () => {
  if (!showReviewSection.value) {
    if (currentQuestionIndex.value < selectedCardQuestions.value.length - 1) {
      currentQuestionIndex.value++;
    } else {
      showReviewSection.value = !allQuestionsAnsweredCorrectly();
      if (allQuestionsAnsweredCorrectly()) showModal.value = true;
    }
  } else {
    if (currentQuestionIndex.value < incorrectAnswers.value.length - 1) {
      currentQuestionIndex.value++;
    } else {
      showModal.value = true;
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
  if (unlock && allQuestionsAnsweredCorrectly()) {
    unlockNextCard(cardId.value);
  }
  router.push("/lessons");
};

const resetState = () => {
  selectedAnswer.value = null;
  answerChecked.value = false;
  answerFeedback.value = "";
};

const allQuestionsAnsweredCorrectly = () => incorrectAnswers.value.length === 0;

const selectedCard = computed(() => cardsData.find((card) => card.id === cardId.value));
const selectedCardQuestions = computed(() => selectedCard.value?.questions || []);
const currentQuestion = computed(() => 
  showReviewSection.value ? incorrectAnswers.value[currentQuestionIndex.value] : selectedCardQuestions.value[currentQuestionIndex.value]
);
</script>

<template>
  <div class="container">
    <div class="questions-page">
      <div class="incorrect-mark" @click="showExitConfirm = true">
        <IncorrectIcon :size="25" />
      </div>
      <div v-if="selectedCardQuestions.length && !showReviewSection">
        <p class="question">{{ currentQuestion.question }}</p>
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
          <button class="skip" @click="nextQuestion" v-if="!answerChecked">Skip</button>
          <button class="check" @click="checkAnswer" :disabled="!selectedAnswer" v-if="!answerChecked">Check</button>
          <button class="nextQuestion" @click="nextQuestion" v-if="answerChecked">Next Question</button>
        </div>
        <p :class="{ incorrect: answerFeedback.includes('Incorrect'), correct: answerFeedback.includes('Correct') }">
          {{ answerFeedback }}
        </p>
      </div>

      <div v-else-if="showReviewSection">
        <div v-if="!reviewButtonClicked" class="showbtn">
          <button class="skip" @click="reviewIncorrectAnswers">Review Incorrect Answers</button>
          <button class="skip" @click="showExitConfirm = true">Exit</button>
        </div>

        <div v-else>
          <p><strong>Question:</strong> {{ currentQuestion.question }}</p>
          <ul>
            <li
              v-for="(option, idx) in currentQuestion.options"
              :key="idx"
              @click="selectedAnswer = option"
              :class="{
                selected: selectedAnswer === option,
                correct: answerChecked && option === currentQuestion.correct,
                incorrect: answerChecked && selectedAnswer === option && selectedAnswer !== currentQuestion.correct,
              }"
            >
              {{ option }}
            </li>
          </ul>
          <div class="buttons">
            <button class="check" @click="checkAnswer" :disabled="!selectedAnswer" v-if="!answerChecked">Check</button>
            <button class="nextQuestion" @click="nextQuestion" v-if="answerChecked">Next Incorrect Answer</button>
          </div>
          <p :class="{ incorrect: answerFeedback.includes('Incorrect'), correct: answerFeedback.includes('Correct') }">
            {{ answerFeedback }}
          </p>
        </div>
      </div>

      <div v-else>No questions available for this card.</div>
    </div>

    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <h2 class="cong">Congratulations!</h2>
        <p>You have completed all questions.</p>
        <button class="skip" @click="exit(true)">Exit</button>
      </div>
    </div>

    <div v-if="showExitConfirm" class="modal">
      <div class="modal-content">
        <h2>Are you sure you want to exit?</h2>
        <div class="buttons">
          <button class="skip" @click="exit(allQuestionsAnsweredCorrectly)">Yes, Exit</button>
          <button class="skip" @click="showExitConfirm = false">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>
