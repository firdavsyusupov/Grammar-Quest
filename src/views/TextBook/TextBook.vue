<script setup>
import { onMounted } from "vue";

import StudentIcon from "@/components/icons/StudentIcon.vue";
import BookIcon from "@/components/icons/BookIcon.vue";
import { useQuizStore } from "@/stores/quizStore";
import "./textbook.scss";
import { ref } from "vue";
const quiz = useQuizStore();
const selectedLevel = ref("A1");
const selectLevel = (level) => {
  selectedLevel.value = level;
};

const levelLabelClass = (level) => {
  if (["A1", "A2"].includes(level)) return "easy";
  if (["B1", "B2"].includes(level)) return "medium";
  if (["C1", "C2"].includes(level)) return "hard";
  return "";
};

onMounted(() => {
  quiz.resetQuiz();
});
</script>

<template>
  <section class="textbook">
    <div class="container">
      <div class="navbar">
        <div class="navbar-left">
          <div>
            <StudentIcon :size="30" />
            <h2 class="nav-item">Textbook</h2>
          </div>
          <hr />
          <div>
            <BookIcon :size="30" />
            <h2 class="nav-item">Dictionary</h2>
          </div>
        </div>
        <div class="navbar-right">
          <button class="btn">Sprint</button>
          <button class="btn">Audio-Call</button>
        </div>
      </div>
      <div class="level-selector">
        <span
          v-for="level in ['A1', 'A2', 'B1', 'B2', 'C1', 'C2']"
          :key="level"
          class="level-item"
          :class="{ selected: selectedLevel === level }"
          @click="selectLevel(level)"
        >
          {{ level }}
          <span class="level-label" :class="levelLabelClass(level)">{{
            levelLabelClass(level)
          }}</span>
        </span>
      </div>
      <div v-if="selectedLevel === 'A1'" class="word-card">
        <div class="word-content">
          <h2>Task 1</h2>
          <!-- <p class="pronunciation">[rɪˈmɑːrk]</p> -->
          <!-- <span class="compound-badge">compound</span> -->
          <p class="definition">Personal Pronouns</p>
          <p class="example">
            ⦁ After completing the sentence, read it again to ensure that the
            pronoun you selected is appropriate for the sentence structure.
          </p>
          <div class="action-buttons">
            <RouterLink
              to="/sprint-task1"
              @click="
                quiz.resetQuiz;
                handleButton;
                quiz.quizCompleted = false;
              "
            >
              <button class="btn add-to-learned">Get Started</button>
            </RouterLink>
            <!-- <button class="btn remove-from-dictionary">
              Remove from dictionary
            </button> -->
          </div>
        </div>
        <div class="word-content word-content2">
          <h2>Task 2</h2>
          <p class="definition">Possessive Pronouns</p>
          <p class="example">
            ⦁ You must choose the correct pronoun to complete the sentence from
            a list of options.
          </p>
          <div class="action-buttons">
            <RouterLink
              to="/sprint-task2"
              @click="
                quiz.loadQuestions('task2');
                quiz.quizCompleted = false;
              "
            >
              <button class="btn add-to-learned">Get Started</button>
            </RouterLink>
          </div>
        </div>
        <div class="word-content word-content2">
          <h2>Task 3</h2>
          <p class="definition">Reflexive Pronouns</p>
          <p class="example">
            ⦁ An inhabitant will present you with a sentence where a pronoun is
            missing.
          </p>
          <div class="action-buttons">
            <RouterLink
              to="/sprint-task3"
              @click="
                quiz.loadQuestions('task3');
                quiz.quizCompleted = false;
              "
            >
              <button class="btn add-to-learned">Get Started</button>
            </RouterLink>
          </div>
        </div>
      </div>
      <div v-if="selectedLevel === 'A2'" class="word-card">
        <div class="word-content">
          <h2>Task 1</h2>
          <p class="definition">Basic Everyday Vocabulary</p>
          <p class="example">
            Choose an appropriate option for each sentence: 
          </p>
          <div class="action-buttons">
            <RouterLink
              to="/sprint-task4"
              @click="
                quiz.resetQuiz;
                handleButton;
                quiz.quizCompleted = false;
              "
            >
              <button class="btn add-to-learned">Get Started</button>
            </RouterLink>
          </div>
        </div>
        <div class="word-content">
          <h2>Task 2</h2>
          <p class="definition">Numbers, Days of the Week, Months</p>
          <p class="example">
            Choose an appropriate option for each sentence: 
          </p>
          <div class="action-buttons">
            <RouterLink
              to="/sprint-task5"
              @click="
                quiz.resetQuiz;
                handleButton;
                quiz.quizCompleted = false;
              "
            >
              <button class="btn add-to-learned">Get Started</button>
            </RouterLink>
          </div>
        </div>
        <div class="word-content">
          <h2>Task 3</h2>
          <p class="definition">Common Verbs and Adjectives</p>
          <p class="example">
            Choose an appropriate option for each sentence: 
          </p>
          <div class="action-buttons">
            <RouterLink
              to="/sprint-task6"
              @click="
                quiz.resetQuiz;
                handleButton;
                quiz.quizCompleted = false;
              "
            >
              <button class="btn add-to-learned">Get Started</button>
            </RouterLink>
          </div>
        </div>
        <div class="word-content">
          <h2>Task 4</h2>
          <p class="definition">Basic Colors, Shapes, and Sizes</p>
          <p class="example">
            Choose an appropriate option for each sentence: 
          </p>
          <div class="action-buttons">
            <RouterLink
              to="/sprint-task7"
              @click="
                quiz.resetQuiz;
                handleButton;
                quiz.quizCompleted = false;
              "
            >
              <button class="btn add-to-learned">Get Started</button>
            </RouterLink>
          </div>
        </div>
        <div class="word-content">
          <h2>Task 5</h2>
          <p class="definition">Greetings and Introductions</p>
          <p class="example">
            Choose an appropriate option for each sentence: 
          </p>
          <div class="action-buttons">
            <RouterLink
              to="/sprint-task8"
              @click="
                quiz.resetQuiz;
                handleButton;
                quiz.quizCompleted = false;
              "
            >
              <button class="btn add-to-learned">Get Started</button>
            </RouterLink>
          </div>
        </div>
        <div class="word-content">
          <h2>Task 6</h2>
          <p class="definition">Asking and Giving Directions</p>
          <p class="example">
            Choose an appropriate option for each sentence: 
          </p>
          <div class="action-buttons">
            <RouterLink
              to="/sprint-task9"
              @click="
                quiz.resetQuiz;
                handleButton;
                quiz.quizCompleted = false;
              "
            >
              <button class="btn add-to-learned">Get Started</button>
            </RouterLink>
          </div>
        </div>
        <div class="word-content">
          <h2>Task 7</h2>
          <p class="definition">Shopping Vocabulary</p>
          <p class="example">
            Choose an appropriate option for each sentence: 
          </p>
          <div class="action-buttons">
            <RouterLink
              to="/sprint-task10"
              @click="
                quiz.resetQuiz;
                handleButton;
                quiz.quizCompleted = false;
              "
            >
              <button class="btn add-to-learned">Get Started</button>
            </RouterLink>
          </div>
        </div>
        <div class="word-content">
          <h2>Task 8</h2>
          <p class="definition">Basic Emotions and Feelings</p>
          <p class="example">
            Choose an appropriate option for each sentence: 
          </p>
          <div class="action-buttons">
            <RouterLink
              to="/sprint-task11"
              @click="
                quiz.resetQuiz;
                handleButton;
                quiz.quizCompleted = false;
              "
            >
              <button class="btn add-to-learned">Get Started</button>
            </RouterLink>
          </div>
        </div>
        
      </div>
    </div>
  </section>
</template>
