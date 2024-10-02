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
const confirmExitModal = ref(false);
const isCardCompleted = ref(false);

const selectedCard = computed(() =>
  cardsData.find((card) => card.id === cardId.value)
);
const selectedCardQuestions = computed(() =>
  selectedCard.value ? selectedCard.value.questions : []
);
const currentQuestion = computed(() => {
  if (showReviewSection.value) {
    return incorrectAnswers.value[currentQuestionIndex.value] || {};
  }
  return selectedCardQuestions.value[currentQuestionIndex.value] || {};
});

onMounted(() => {
  const id = Number(route.params.id);
  if (isNaN(id)) {
    console.error("Invalid card ID:", id);
    return;
  }
  cardId.value = id;
});

const checkAnswer = () => {
  if (!currentQuestion.value.question) return;

  if (showReviewSection.value) {
    if (selectedAnswer.value === currentQuestion.correct) {
      answerFeedback.value = "Correct!";
      incorrectAnswers.value = incorrectAnswers.value.filter((answer) => {
        return answer.question !== currentQuestion.question;
      });
    } else {
      answerFeedback.value = `Incorrect! The correct answer is: ${currentQuestion.correct}`;
    }
  } else {
    if (selectedAnswer.value === currentQuestion.value.correctAnswer) {
      answerFeedback.value = "Correct!";
    } else {
      answerFeedback.value = `Incorrect! The correct answer is: ${currentQuestion.value.correctAnswer}`;
      addIncorrectAnswer(currentQuestion.value);
    }
  }

  answerChecked.value = true;
};

const skipQuestion = () => {
  answerFeedback.value = `Incorrect! The correct answer is: ${currentQuestion.value.correctAnswer}`;
  addIncorrectAnswer(currentQuestion.value);
  answerChecked.value = true;
};

const addIncorrectAnswer = (question) => {
  const incorrectAnswer = {
    question: question.question,
    options: question.options,
    selected: selectedAnswer.value,
    correct: question.correctAnswer,
  };
  incorrectAnswers.value.push(incorrectAnswer);
};

const allQuestionsAnsweredCorrectly = () => {
  return incorrectAnswers.value.length === 0;
};

const nextQuestion = () => {
  if (!showReviewSection.value) {
    if (currentQuestionIndex.value < selectedCardQuestions.value.length - 1) {
      currentQuestionIndex.value++;
      resetAnswerState();
    } else {
      if (allQuestionsAnsweredCorrectly()) {
        showModal.value = true;
      } else {
        showReviewSection.value = true;
      }
    }
  } else {
    if (currentQuestionIndex.value < incorrectAnswers.value.length - 1) {
      currentQuestionIndex.value++;
      resetAnswerState();
    } else {
      showModal.value = true;
    }
  }
};

const reviewIncorrectAnswers = () => {
  currentQuestionIndex.value = 0;
  resetAnswerState();
  reviewButtonClicked.value = true;
  showReviewSection.value = true;
};

const exit = () => {
  localStorage.setItem(`card${cardId.value}Completed`, "true");
  isCardCompleted.value = true;

  const currentCardIndex = cardsData.findIndex(card => card.id === cardId.value);
  const nextCardId = currentCardIndex + 2 <= cardsData.length ? currentCardIndex + 2 : null;

  if (nextCardId) {
    router.push({ name: 'Questions', params: { id: nextCardId } });
  } else {
    router.push("/lessons");
  }
};

const confirmExit = () => {
  confirmExitModal.value = true;
};

const handleExitConfirmation = (confirm) => {
  if (confirm) {
    exit();
  }
  confirmExitModal.value = false;
};

const resetAnswerState = () => {
  selectedAnswer.value = null;
  answerChecked.value = false;
  answerFeedback.value = "";
};
</script>

<template>
  <div class="container">
    <div class="questions-page">
      <div class="incorrect-mark" @click="confirmExit">
        <IncorrectIcon :size="25" />
      </div>
      <div v-if="selectedCardQuestions.length > 0 && !showReviewSection">
        <p v-if="currentQuestion.question">{{ currentQuestion.question }}</p>
        <ul>
          <li
            v-for="(option, optIndex) in currentQuestion.options"
            :key="optIndex"
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
          <button @click="skipQuestion" v-if="!answerChecked">Skip</button>
          <button
            @click="checkAnswer"
            :disabled="!selectedAnswer"
            v-if="!answerChecked"
          >
            Check
          </button>
          <button
            @click="nextQuestion"
            v-if="answerChecked && !showReviewSection"
          >
            Next Question
          </button>
        </div>
        <p
          v-if="answerFeedback"
          :class="{
            incorrect: answerFeedback.includes('Incorrect'),
            correct: answerFeedback.includes('Correct'),
          }"
        >
          {{ answerFeedback }}
        </p>
      </div>

      <div v-else-if="showReviewSection">
        <div v-if="reviewButtonClicked">
          <h3 class="h3">Review Incorrect Answers</h3>
        </div>
        <div v-if="incorrectAnswers.length > 0">
          <p><strong>Question:</strong> {{ currentQuestion.question }}</p>
          <ul>
            <li
              v-for="(option, optIndex) in currentQuestion.options"
              :key="optIndex"
              @click="selectedAnswer = option"
              :class="{
                selected: selectedAnswer === option,
                correct: answerChecked && option === currentQuestion.correct,
                incorrect:
                  answerChecked &&
                  selectedAnswer === option &&
                  selectedAnswer !== currentQuestion.correct,
              }"
            >
              {{ option }}
            </li>
          </ul>
          <div class="buttons">
            <button
              @click="checkAnswer"
              :disabled="!selectedAnswer"
              v-if="!answerChecked"
            >
              Check
            </button>
            <button
              @click="nextQuestion"
              v-if="reviewButtonClicked && answerChecked"
            >
              Next Incorrect Answer
            </button>
            <div
              v-if="showReviewSection && reviewButtonClicked === false"
              class="showbtn"
            >
              <button @click="reviewIncorrectAnswers">
                Review Incorrect Answers
              </button>
              <button @click="confirmExit">Exit</button>
            </div>
          </div>
          <p
            v-if="answerFeedback"
            :class="{
              incorrect: answerFeedback.includes('Incorrect'),
              correct: answerFeedback.includes('Correct'),
            }"
          >
            {{ answerFeedback }}
          </p>
        </div>
      </div>
    </div>
    <modal v-if="showModal" @close="showModal = false">
      <template #header>
        <h2>Card Completed!</h2>
      </template>
      <template #default>
        <p>All questions answered correctly!</p>
      </template>
      <template #footer>
        <button @click="handleExitConfirmation(false)">Cancel</button>
        <button @click="handleExitConfirmation(true)">Exit</button>
      </template>
    </modal>

    <modal v-if="confirmExitModal" @close="confirmExitModal = false">
      <template #header>
        <h2>Exit Confirmation</h2>
      </template>
      <template #default>
        <p>Are you sure you want to exit?</p>
      </template>
      <template #footer>
        <button @click="handleExitConfirmation(false)">Cancel</button>
        <button @click="handleExitConfirmation(true)">Confirm</button>
      </template>
      
    </modal>
  </div>
</template>

<style>
.selected {
  background-color: #d3d3d3;
}
.correct {
  color: green;
}
.incorrect {
  color: red;
}
.questions-page {
  padding: 20px;
}
</style>
