<script setup>
import { onMounted } from "vue";
import { useQuizStore } from "@/stores/quizStore";
import RepeatIcon from "@/components/icons/RepeatIcon.vue";
import Button from "@/UI/Buttons/HeaderButton/HeaderButton.vue";
import Correct from "@/components/icons/CorrectIcon.vue";
import Incorrect from "@/components/icons/IncorrectIcon.vue";
import "../../SprintTest/sprinttest.scss";

const quiz = useQuizStore();
onMounted(() => {
  quiz.loadQuestions('task36');
  quiz.loadState();
});
</script>

<template>
  <section v-if="quiz.quizCompleted" class="sprint__answer">
    <div class="container">
      <div class="sprint__answer-block">
        <div class="sprint__answer-block-inner">
          <div class="sprint__answer-block-img">
            <img src="@/assets/images/sprint-text-img.svg" alt="" />
          </div>
          <div class="sprint__answer-block-text">
            <h3 class="sprint__answer-block-text-title">Your Sprint</h3>
            <p class="sprint__answer-block-text-text">You did pretty good!</p>
            <div class="sprint__answer-block-text-blogs">
              <div class="sprint__answer-block-text-blogs-blog sprint__answer-block-text-blogs-blog2">
                <p>{{ quiz.questions.length }}/</p>
                <h4>{{ quiz.correctAnswersCount }}</h4>
                <span>correct answers</span>
              </div>
              <div class="sprint__answer-block-text-blogs-blog sprint__answer-block-text-blogs-blog3">
                <p>{{ quiz.questions.length }}/</p>
                <h4>{{ quiz.wrongAnswersCount }}</h4>
                <span>wrong answers</span>
              </div>
            </div>
          </div>
        </div>
        <div class="sprint__answer-block-out">
          <RouterLink to="/sprint-task" @click="quiz.resetQuiz">
            <button class="sprint__answer-block-out-btn2">
              <RepeatIcon :size="25" />
              <p>Play it again</p>
            </button>
          </RouterLink>
          <RouterLink to="/textbook">
            <Button
              :text="'Go to textbook'"
              :icon="false"
              class="sprint__answer-block-out-btn"
            />
          </RouterLink>
        </div>
      </div>

      <div class="sprint__answer-block2">
        <div class="sprint__answer-block-inner2">
          <h3 class="sprint__answer-block-text-title">I know</h3>
          <ul>
            <li v-for="(answer, index) in quiz.correctAnswers" :key="index">
              <div>
                <span class="list-number">{{ index + 1 }}.</span>
                <p class="correct-answer">{{ answer.question }} <br /></p>
              </div>
              <div>
                <p class="correct-answer3">{{ answer.userAnswer }}</p>
                <Correct :size="20" class="correct-icon" />
              </div>
            </li>
          </ul>
        </div>
        <div class="sprint__answer-block-inner2">
          <h3 class="sprint__answer-block-text-title">I don't know</h3>
          <ul>
            <li v-for="(answer, index) in quiz.incorrectAnswers" :key="index">
              <div>
                <span class="list-number">{{ index + 1 }}.</span>
                <p class="incorrect-answer">{{ answer.question }} <br /></p>
              </div>
              <p class="incorrect-answer2">
                Correct: {{ answer.correctAnswer }}
                <Correct :size="20" class="correct-icon" />
              </p>
              <p class="incorrect-answer3">Yours: {{ answer.userAnswer }}
                <Incorrect :size="25" class="correct-icon" />
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>

  <section v-else class="sprint__test">
    <div class="container">
      <div class="sprint__test-block">
        <div class="sprint__test-block-inner">
          <div class="remaining-questions">
            <h4 class="remaining-questions-count">
              {{ quiz.completedQuestions }} / {{ quiz.questions.length }}
            </h4>
            <p v-if="quiz.remainingQuestions !== 1" class="remaining-questions-text">
              questions
            </p>
            <p v-else class="remaining-questions-text">question</p>
          </div>

          <div class="sprint__test-block-test">
            <p class="sprint__test-block-test-text">
              {{ quiz.questions[quiz.currentQuestionIndex].question }}
            </p>
            <div class="options">
              <div
                v-for="option in quiz.questions[quiz.currentQuestionIndex].options"
                :key="option"
                class="option-button"
              >
                <button
                  class="option-button-inner"
                  :class="{
                    selected: quiz.userAnswers[quiz.currentQuestionIndex] === option,
                  }"
                  @click="quiz.selectOption(option)"
                >
                  {{ option }}
                </button>
              </div>
              <div>
                <!-- <button
                  class="option-button-inner"
                  :class="{
                    selected: quiz.userAnswers[quiz.currentQuestionIndex] === 'I don\'t know',
                  }"
                  @click="quiz.selectIDontKnow"
                >
                  I don't know
                </button> -->
              </div>
            </div>
          </div>

          <p v-if="quiz.errorMessage" class="error-message">
            {{ quiz.errorMessage }}
          </p>
          <button @click="quiz.selectIDontKnow" class="nextQuestion">
            {{
              quiz.currentQuestionIndex < quiz.questions.length - 1
                ? "I don't know"
                : "I don't know"
            }}
          </button>
        </div>
      </div>
    </div>
  </section>
</template>


