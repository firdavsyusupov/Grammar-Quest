import { defineStore } from "pinia";

const taskDataMap = {
  task1: () => import("@/data/data"),
  task2: () => import("@/data/task2"),
  task3: () => import("@/data/task3"),
  task4: () => import("@/data/task4"),
  task5: () => import("@/data/task5"),
  task6: () => import("@/data/task6"),
  task7: () => import("@/data/task7"),
  task8: () => import("@/data/task8"),
  task9: () => import("@/data/task9"),
  task10: () => import("@/data/task10"),
  task11: () => import("@/data/task11"),
  task12: () => import("@/data/task12"),
  task13: () => import("@/data/task13"),
  task14: () => import("@/data/task14"),
  task15: () => import("@/data/task15"),
  task16: () => import("@/data/task16"),
  task17: () => import("@/data/task17"),
  task18: () => import("@/data/task18"),
  task19: () => import("@/data/task19"),
  task20: () => import("@/data/task20"),
  task21: () => import("@/data/task21"),
  task22: () => import("@/data/task22"),
  task23: () => import("@/data/task23"),
  task24: () => import("@/data/task24"),
  task25: () => import("@/data/task25"),
  task26: () => import("@/data/task26"),
  task27: () => import("@/data/task27"),
  task28: () => import("@/data/task28"),
  task29: () => import("@/data/task29"),
  task30: () => import("@/data/task30"),
  task31: () => import("@/data/task31"),
  task32: () => import("@/data/task32"),
  task33: () => import("@/data/task33"),
  task34: () => import("@/data/task34"),
  task35: () => import("@/data/task35"),
  task36: () => import("@/data/task36"),
  task37: () => import("@/data/task37"),
  task38: () => import("@/data/task38"),
  task39: () => import("@/data/task39"),
  task40: () => import("@/data/task40"),
  task41: () => import("@/data/task41"),
  task42: () => import("@/data/task42"),
  task43: () => import("@/data/task43"),
  task44: () => import("@/data/task44"),
  task45: () => import("@/data/task45"),
  task46: () => import("@/data/task46"),
  task47: () => import("@/data/task47"),
};

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
    async loadQuestions(task) {
      try {
        const dataLoader = taskDataMap[task] || taskDataMap['task1'];
        const { default: taskData } = await dataLoader();
        this.questions = taskData;
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
