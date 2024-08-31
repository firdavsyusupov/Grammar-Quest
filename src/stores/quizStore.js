import { defineStore } from "pinia";
import questionsData from "@/data/data";

export const useQuizStore = defineStore("quizStore", {
  state: () => ({
    questions: questionsData,
    currentQuestionIndex: 0,
    userAnswers: Array(questionsData.length).fill(null),
    errorMessage: "",
    correctAnswersCount: 0,
  }),
  getters: {
    remainingQuestions: (state) =>
      state.questions.length - state.currentQuestionIndex - 1,
    wrongAnswersCount: (state) => {
      let wrongCount = 1;
      state.questions.forEach((question, index) => {
        const userAnswer = state.userAnswers[index];
        if (userAnswer && userAnswer !== question.correctAnswer) {
          wrongCount++;
        }
      });
      return wrongCount;
    },
  },
  actions: {
    selectOption(option) {
      this.userAnswers[this.currentQuestionIndex] = option;
      this.errorMessage = "";
      this.saveState();
    },
    selectIDontKnow() {
      this.userAnswers[this.currentQuestionIndex] = "I don't know";
      this.errorMessage = "";
      this.saveState();
    },
    async nextQuestion() {
      this.checkAnswers();
      if (this.userAnswers[this.currentQuestionIndex] === null) {
        this.errorMessage =
          'Please select an answer or choose "I don\'t know" before proceeding.';
      } else {
        this.errorMessage = "";
        if (this.currentQuestionIndex < this.questions.length - 1) {
          this.currentQuestionIndex++;
          this.saveState();
        } else {
          this.checkAnswers();
        }
      }
    },

    checkAnswers() {
      let count = 0;
      if (this.questions.length !== this.userAnswers.length) {
        return;
      }
      this.questions.forEach((question, index) => {
        const userAnswer = this.userAnswers[index];
        const correctAnswer = question.correctAnswer;
        if (userAnswer === correctAnswer) {
          count++;
        }
      });
      this.correctAnswersCount = count;
      this.saveState();
    },

    resetQuiz() {
      this.currentQuestionIndex = 0;
      this.userAnswers = Array(this.questions.length).fill(null);
      this.errorMessage = "";
      this.correctAnswersCount = 0;
      this.saveState();
    },
    saveState() {
      localStorage.setItem(
        "quizState",
        JSON.stringify({
          currentQuestionIndex: this.currentQuestionIndex,
          userAnswers: this.userAnswers,
          correctAnswersCount: this.correctAnswersCount,
        })
      );
    },
    loadState() {
      const savedState = localStorage.getItem("quizState");
      if (savedState) {
        const { currentQuestionIndex, userAnswers, correctAnswersCount } =
          JSON.parse(savedState);
        this.currentQuestionIndex = currentQuestionIndex;
        this.userAnswers = userAnswers;
        this.correctAnswersCount = correctAnswersCount;
      }
    },
  },
  persist: true,
});
