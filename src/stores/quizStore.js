import { defineStore } from "pinia";
import task1Data from "@/data/data"; 
import task2Data from "@/data/task2";
import task3Data from "@/data/task3";
import task4Data from "@/data/task4";
import task5Data from "@/data/task5";
import task6Data from "@/data/task6";
import task7Data from "@/data/task7";
import task8Data from "@/data/task8";
import task9Data from "@/data/task9";
import task10Data from "@/data/task10";
import task11Data from "@/data/task11";

export const useQuizStore = defineStore("quizStore", {
  state: () => ({
    questions: [],
    currentQuestionIndex: 0,
    userAnswers: [],
    errorMessage: "",
    correctAnswersCount: 0,
    incorrectAnswers: [],
    correctAnswers: [],
    quizCompleted: false,
  }),
  getters: {
    completedQuestions: (state) => state.currentQuestionIndex + 1,
    wrongAnswersCount: (state) => state.incorrectAnswers.length,
  },
  actions: {
    loadQuestions(task) {
      try {
        if (task === "task2") {
          this.questions = task2Data;
        } else if (task === "task4") {
          this.questions = task4Data;
        } else if (task === "task3") {
          this.questions = task3Data;
        } else if(task === "task5"){
          this.questions = task5Data
        } else if(task === "task6"){
          this.questions = task6Data
        } else if(task === "task7"){
          this.questions = task7Data
        } else if(task === "task8"){
          this.questions = task8Data
        }
        else if(task === "task9"){
          this.questions = task9Data
        }
        else if(task === "task10"){
          this.questions = task10Data
        }
        else if(task === "task11"){
          this.questions = task11Data
        }
         else {
          this.questions = task1Data;
        }
        this.resetQuiz(); 
      } catch (error) {
        console.error("Failed to load task data:", error);
        this.errorMessage = "Could not load quiz data. Please try again.";
      }
    },
    selectOption(option) {
      const currentQuestion = this.questions[this.currentQuestionIndex];
      this.userAnswers[this.currentQuestionIndex] = option;
      this.errorMessage = "";

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
        this.errorMessage =
          'Please select an answer or choose "I don\'t know" before proceeding.';
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
      this.quizCompleted = false;
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
        const {
          currentQuestionIndex,
          userAnswers,
          correctAnswersCount,
          correctAnswers,
          incorrectAnswers,
        } = JSON.parse(savedState);
        this.currentQuestionIndex = currentQuestionIndex;
        this.userAnswers = userAnswers;
        this.correctAnswersCount = correctAnswersCount;
        this.correctAnswers = correctAnswers;
        this.incorrectAnswers = incorrectAnswers;
      }
    },
  },
});
