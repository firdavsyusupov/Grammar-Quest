<script setup>
import { onMounted } from "vue";
import { useQuizStore } from "@/stores/quizStore";
import RepeatIcon from "@/components/icons/RepeatIcon.vue";
import Button from "@/UI/Buttons/HeaderButton/HeaderButton.vue";
import "./sprinttest.scss";

const quiz = useQuizStore();
onMounted(() => {
  quiz.loadState();
});
</script>

<template>
  <section v-if="quiz.remainingQuestions === 0" class="sprint__answer">
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
              <!-- <div class="sprint__answer-block-text-blogs-blog">
                <p>retrieved</p>
                <h4>{{ quiz.remainingQuestions }}</h4>
                <span>points</span>
              </div> -->
              <div
                class="sprint__answer-block-text-blogs-blog sprint__answer-block-text-blogs-blog2"
              >
                <p>{{quiz.questions.length}}/</p>
                <h4>{{ quiz.correctAnswersCount }}</h4>
                <span>correct answers</span>
              </div>
              <div
                class="sprint__answer-block-text-blogs-blog sprint__answer-block-text-blogs-blog3"
              >
                <p>{{quiz.questions.length}}/</p>
                <h4>{{ quiz.wrongAnswersCount  }}</h4>
                <span>wrong answers</span>
              </div>
            </div>
          </div>
        </div>
        <div class="sprint__answer-block-out">
          <RouterLink to="/sprint" @click="quiz.resetQuiz">
            <button class="sprint__answer-block-out-btn2">
              <RepeatIcon :size="25" />
              <p>Play it again</p>
            </button>
          </RouterLink>
          <Button
            :text="'Go to textbook'"
            :icon="false"
            class="sprint__answer-block-out-btn"
          />
        </div>
      </div>

      <div class="sprint__answer-block sprint__answer-block2"></div>
    </div>
  </section>

  <section v-else class="sprint__test">
    <div class="container">
      <div class="sprint__test-block">
        <div class="sprint__test-block-inner">
          <div class="remaining-questions">
            <h4 class="remaining-questions-count">
              {{ quiz.remainingQuestions }}
            </h4>
            <p
              v-if="quiz.remainingQuestions !== 1"
              class="remaining-questions-text"
            >
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
                v-for="option in quiz.questions[quiz.currentQuestionIndex]
                  .options"
                :key="option"
                class="option-button"
              >
                <button
                  class="option-button-inner"
                  :class="{
                    selected:
                      quiz.userAnswers[quiz.currentQuestionIndex] === option,
                  }"
                  @click="quiz.selectOption(option)"
                >
                  {{ option }}
                </button>
              </div>
              <div>
                <button
                  class="option-button-inner"
                  :class="{
                    selected:
                      quiz.userAnswers[quiz.currentQuestionIndex] ===
                      'I don\'t know',
                  }"
                  @click="quiz.selectIDontKnow"
                >
                  I don't know
                </button>
              </div>
            </div>
          </div>

          <p v-if="quiz.errorMessage" class="error-message">
            {{ quiz.errorMessage }}
          </p>
          <button @click="quiz.nextQuestion" class="nextQuestion">
            {{
              quiz.currentQuestionIndex < quiz.questions.length - 1
                ? "Next Question"
                : "Submit"
            }}
          </button>
        </div>
      </div>
    </div>
  </section>
</template>
