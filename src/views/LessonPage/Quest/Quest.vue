<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import cardsData from "@/data/card.json";

const route = useRoute();

const cardId = ref(null);
const currentQuestionIndex = ref(0);
const selectedAnswer = ref(null);
const answerChecked = ref(false);
const answerFeedback = ref("");
const incorrectAnswers = ref([]);
const showReviewSection = ref(false);

const selectedCard = computed(() =>
  cardsData.find((card) => card.id === cardId.value)
);
const selectedCardQuestions = computed(() =>
  selectedCard.value ? selectedCard.value.questions : []
);
const currentQuestion = computed(
  () => selectedCardQuestions.value[currentQuestionIndex.value] || {}
);

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

  if (selectedAnswer.value === currentQuestion.value.correctAnswer) {
    answerFeedback.value = "Correct!";
  } else {
    answerFeedback.value = `Incorrect! The correct answer is: ${currentQuestion.value.correctAnswer}`;
    addIncorrectAnswer(currentQuestion.value);
  }
  answerChecked.value = true; 
};

const addIncorrectAnswer = (question) => {
  if (!incorrectAnswers.value.includes(question)) {
    incorrectAnswers.value.push(question);
  }
};

const nextQuestion = () => {
  if (currentQuestionIndex.value < selectedCardQuestions.value.length - 1) {
    currentQuestionIndex.value++;
    resetAnswerState();
  } else {
    showReviewSection.value = true; 
  }
};

const reviewIncorrectAnswers = () => {
  currentQuestionIndex.value = 0; 
  resetAnswerState();
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
      <h2>Questions for Card {{ cardId }}</h2>
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
        <p v-if="answerFeedback">{{ answerFeedback }}</p>
      </div>

      <div v-else-if="showReviewSection">
        <h3>Review Incorrect Answers</h3>
        <div v-if="incorrectAnswers.length > 0">
          <p>
            <strong>Incorrect Question:</strong> {{ currentQuestion.question }}
          </p>
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
          <button
            @click="checkAnswer"
            :disabled="!selectedAnswer"
            v-if="!answerChecked"
          >
            Check
          </button>
          <button @click="nextQuestion" v-if="answerChecked">
            Next Question
          </button>
          <p v-if="answerFeedback">{{ answerFeedback }}</p>
        </div>
      </div>

      <div v-else>
        <p>No questions available for this card.</p>
      </div>
    </div>
    <button v-if="showReviewSection" @click="reviewIncorrectAnswers">
      Review Incorrect Answers
    </button>
  </div>
</template>

<style scoped>
.questions-page {
  padding: 20px;
}

h2 {
  margin-bottom: 20px;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  cursor: pointer;
  margin-bottom: 10px;
  transition: background-color 0.3s;
}

li:hover {
  text-decoration: underline;
}

.selected {
  font-weight: bold;
}

.correct {
  color: green;
}

.incorrect {
  color: red;
}

button {
  margin-top: 20px;
}

p {
  margin-top: 10px;
}
</style>

  