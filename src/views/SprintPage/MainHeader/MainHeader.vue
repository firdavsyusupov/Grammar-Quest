<script setup>
import { ref } from "vue";
import SignUpButton from "@/UI/Buttons/SignUp/SignUp.vue";
import { useQuizStore } from "@/stores/quizStore";
import "./mainheader.scss";
const quiz = useQuizStore();
const activeLevel = ref(null);

const setActiveLevel = (level) => {
  activeLevel.value = level;
};

const handleButton = () => {
  if (activeLevel.value) {
    localStorage.setItem("levelSprint", activeLevel.value);
  } else {
    alert("Choose a level!");
  }
};
</script>

<template>
  <header class="sprint__header">
    <div class="container">
      <div class="sprint__header-block">
        <div class="sprint__header-block-img">
          <img src="@/assets/images/sprint-header-img.svg" alt="" />
        </div>
        <div class="sprint__header-block-text">
          <div class="sprint__header-block-text-title">
            <h3>Sprint</h3>
            <span>speed task</span>
          </div>
          <p class="sprint__header-block-text-text">
            Trains the skill of fast translation. You have to choose if the
            translation corresponds to the suggested word.
          </p>
          <p class="sprint__header-block-text-text">Choose a level:</p>
          <div class="sprint__header-block-text-levels">
            <div
              class="sprint__header-block-text-levels-level"
              :class="{ active: activeLevel === 'A1' }"
              @click="setActiveLevel('A1')"
            >
              A1
            </div>
            <div
              class="sprint__header-block-text-levels-level level2"
              :class="{ active: activeLevel === 'A2' }"
              @click="setActiveLevel('A2')"
            >
              A2
            </div>
            <div
              class="sprint__header-block-text-levels-level level3"
              :class="{ active: activeLevel === 'B1' }"
              @click="setActiveLevel('B1')"
            >
              B1
            </div>
            <div
              class="sprint__header-block-text-levels-level level4"
              :class="{ active: activeLevel === 'B2' }"
              @click="setActiveLevel('B2')"
            >
              B2
            </div>
            <div
              class="sprint__header-block-text-levels-level level5"
              :class="{ active: activeLevel === 'C1' }"
              @click="setActiveLevel('C1')"
            >
              C1
            </div>
            <div
              class="sprint__header-block-text-levels-level level6"
              :class="{ active: activeLevel === 'C2' }"
              @click="setActiveLevel('C2')"
            >
              C2
            </div>
          </div>
          <RouterLink v-if="activeLevel" to="/sprint-task1" @click="quiz.resetQuiz">
            <SignUpButton :text="'get started'" @click="handleButton; quiz.quizCompleted = false" />
          </RouterLink>
        </div>
      </div>
    </div>
  </header>
</template>
