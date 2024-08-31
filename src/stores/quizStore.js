import { defineStore } from "pinia";
import questionsData from "@/data/data";

// In your Pinia store
export const useQuizStore = defineStore("quizStore", {
  state: () => ({
    questions: questionsData,
    currentQuestionIndex: 0,
    userAnswers: Array(questionsData.length).fill(null),
    errorMessage: "",
    correctAnswersCount: 0,
    incorrectAnswers: [], // Add correct answers and user's answers
    correctAnswers: [],
    quizCompleted: false,
  }),
  getters: {
    completedQuestions: (state) => state.currentQuestionIndex + 1,
    wrongAnswersCount: (state) => state.incorrectAnswers.length,
  },
  actions: {
    selectOption(option) {
      const currentQuestion = this.questions[this.currentQuestionIndex];
      this.userAnswers[this.currentQuestionIndex] = option;
      this.errorMessage = "";

      // Modify to store the user's answer and the question
      if (option === currentQuestion.correctAnswer) {
        this.correctAnswers.push({
          question: currentQuestion.question,
          correctAnswer: currentQuestion.correctAnswer,
          userAnswer: option,
        });
      } else {
        this.incorrectAnswers.push({
          question: currentQuestion.question,
          correctAnswer: currentQuestion.correctAnswer,
          userAnswer: option,
        });
      }

      this.saveState();
      this.nextQuestion();
    },
    selectIDontKnow() {
      const currentQuestion = this.questions[this.currentQuestionIndex];
      this.userAnswers[this.currentQuestionIndex] = "I don't know";
      this.errorMessage = "";

      // Modify to store the "I don't know" response
      this.incorrectAnswers.push({
        question: currentQuestion.question,
        correctAnswer: currentQuestion.correctAnswer,
        userAnswer: "I don't know",
      });

      this.saveState();
      this.nextQuestion();
    },
    async nextQuestion() {
      if (this.userAnswers[this.currentQuestionIndex] === null) {
        this.errorMessage = 'Please select an answer or choose "I don\'t know" before proceeding.';
      } else {
        this.errorMessage = "";
        if (this.currentQuestionIndex < this.questions.length - 1) {
          this.currentQuestionIndex++;
          this.saveState();
        } else {
          this.checkAnswers();
          this.quizCompleted = true;
          this.saveState();
        }
      }
    },
    checkAnswers() {
      this.correctAnswersCount = this.correctAnswers.length;
      this.saveState();
    },
    resetQuiz() {
      this.currentQuestionIndex = 0;
      this.userAnswers = Array(this.questions.length).fill(null);
      this.errorMessage = "";
      this.correctAnswersCount = 0;
      this.correctAnswers = [];
      this.incorrectAnswers = [];
      this.saveState();
    },
    saveState() {
      localStorage.setItem(
        "quizState",
        JSON.stringify({
          currentQuestionIndex: this.currentQuestionIndex,
          userAnswers: this.userAnswers,
          correctAnswersCount: this.correctAnswersCount,
          correctAnswers: this.correctAnswers,
          incorrectAnswers: this.incorrectAnswers,
        })
      );
    },
    loadState() {
      const savedState = localStorage.getItem("quizState");
      if (savedState) {
        const { currentQuestionIndex, userAnswers, correctAnswersCount, correctAnswers, incorrectAnswers } =
          JSON.parse(savedState);
        this.currentQuestionIndex = currentQuestionIndex;
        this.userAnswers = userAnswers;
        this.correctAnswersCount = correctAnswersCount;
        this.correctAnswers = correctAnswers;
        this.incorrectAnswers = incorrectAnswers;
      }
    },
  },
});

