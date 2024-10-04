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
const completedCards = ref([]);

const loadCompletedCards = () => {
  const completed = JSON.parse(localStorage.getItem('completedCards')) || [];
  completedCards.value = completed;
};

const saveCompletedCards = () => {
  localStorage.setItem('completedCards', JSON.stringify(completedCards.value));
};

const unlockNextCard = (id) => {
  if (id === 1 && !completedCards.value.includes(2)) {
    completedCards.value.push(2);
    saveCompletedCards();
  } else if (id === 2 && !completedCards.value.includes(3)) {
    completedCards.value.push(3);
    saveCompletedCards();
  } else if (id === 3 && !completedCards.value.includes(4)) {
    completedCards.value.push(4);
    saveCompletedCards();
  }
};

onMounted(() => {
  const id = Number(route.params.id);
  if (isNaN(id)) {
    console.error("Invalid card ID:", id);
    return;
  }
  cardId.value = id;
  loadCompletedCards();
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
  unlockNextCard(cardId.value);
  localStorage.setItem(`card${cardId.value}Completed`, "true");
  isCardCompleted.value = true;
  router.push("/lessons");
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

      <div v-else>
        <p>No questions available for this card.</p>
      </div>
    </div>

    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <h2>Congratulations!</h2>
        <p>You have completed all questions.</p>
        <button @click="exit">Exit</button>
      </div>
    </div>

    <div v-if="confirmExitModal" class="modal">
      <div class="modal-content">
        <h2>Are you sure you want to exit?</h2>
        <div class="buttons">
          <button @click="handleExitConfirmation(true)">Yes, Exit</button>
          <button @click="handleExitConfirmation(false)">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
}

.incorrect-mark {
  cursor: pointer;
}

.card.deactive {
  pointer-events: none;
  opacity: 0.5;
}
</style>
