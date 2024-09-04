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
        <div class="word-content word-content2">
          <h2>Task 4</h2>
          <p class="definition">Plurals</p>
          <p class="example">
            ⦁ Some tasks will involve words where multiple modifications could
            apply, requiring careful selection.
          </p>
          <div class="action-buttons">
            <RouterLink
              to="/sprint-task12"
              @click="
                quiz.loadQuestions('task12');
                quiz.quizCompleted = false;
              "
            >
              <button class="btn add-to-learned">Get Started</button>
            </RouterLink>
          </div>
        </div>
        <div class="word-content word-content2">
          <h2>Task 5</h2>
          <p class="definition">Basic Prefixes</p>
          <p class="example">
            ⦁ Correctly form and categorize at least 80% of the words to advance
            in the quest.
          </p>
          <div class="action-buttons">
            <RouterLink
              to="/sprint-task13"
              @click="
                quiz.loadQuestions('task13');
                quiz.quizCompleted = false;
              "
            >
              <button class="btn add-to-learned">Get Started</button>
            </RouterLink>
          </div>
        </div>
        <div class="word-content word-content2">
          <h2>Task 6</h2>
          <p class="definition">Basic Suffixes</p>
          <p class="example">
            ⦁ A character presents you with a base word or scenario, and your
            task is to modify the word by adding the correct plural form,
            prefix, or suffix.
          </p>
          <div class="action-buttons">
            <RouterLink
              to="/sprint-task14"
              @click="
                quiz.loadQuestions('task14');
                quiz.quizCompleted = false;
              "
            >
              <button class="btn add-to-learned">Get Started</button>
            </RouterLink>
          </div>
        </div>
        <div class="word-content word-content2">
          <h2>Task 6</h2>
          <p class="definition">Frequency Adverbs</p>
          <p class="example">
            ⦁ After completing the sentence, read it again to ensure that the
            adverb you selected is appropriate for the context
          </p>
          <div class="action-buttons">
            <RouterLink
              to="/sprint-task15"
              @click="
                quiz.loadQuestions('task15');
                quiz.quizCompleted = false;
              "
            >
              <button class="btn add-to-learned">Get Started</button>
            </RouterLink>
          </div>
        </div>
        <div class="word-content word-content2">
          <h2>Task 7</h2>
          <p class="definition">Manner Adverbs</p>
          <p class="example">
            ⦁ For each sentence below, fill in the blank with the correct adverb
            from the options provided. The adverb should be chosen to accurately
            describe the frequency or manner of the action in the sentence.
          </p>
          <div class="action-buttons">
            <RouterLink
              to="/sprint-task16"
              @click="
                quiz.loadQuestions('task16');
                quiz.quizCompleted = false;
              "
            >
              <button class="btn add-to-learned">Get Started</button>
            </RouterLink>
          </div>
        </div>
        <div class="word-content word-content2">
          <h2>Task 8</h2>
          <p class="definition">Definite and Indefinite Articles</p>
          <p class="example">
            ⦁ Bonus points for first-time accuracy in article selection.
          </p>
          <div class="action-buttons">
            <RouterLink
              to="/sprint-task17"
              @click="
                quiz.loadQuestions('task17');
                quiz.quizCompleted = false;
              "
            >
              <button class="btn add-to-learned">Get Started</button>
            </RouterLink>
          </div>
        </div>
        <div class="word-content word-content2">
          <h2>Task 9</h2>
          <p class="definition">Definite and Indefinite Articles</p>
          <p class="example">
            ⦁ Some sentences might require you to choose between articles based
            on context or whether the noun is singular or plural.
          </p>
          <div class="action-buttons">
            <RouterLink
              to="/sprint-task18"
              @click="
                quiz.loadQuestions('task18');
                quiz.quizCompleted = false;
              "
            >
              <button class="btn add-to-learned">Get Started</button>
            </RouterLink>
          </div>
        </div>
        <div class="word-content word-content2">
          <h2>Task 10</h2>
          <p class="definition">Prepositions of Place</p>
          <p class="example">
            ⦁ Some sentences may require more than one preposition or may have
            tricky combinations that test the player’s knowledge.
          </p>
          <div class="action-buttons">
            <RouterLink
              to="/sprint-task19"
              @click="
                quiz.loadQuestions('task19');
                quiz.quizCompleted = false;
              "
            >
              <button class="btn add-to-learned">Get Started</button>
            </RouterLink>
          </div>
        </div>
        <div class="word-content word-content2">
          <h2>Task 11</h2>
          <p class="definition">Prepositions of Time</p>
          <p class="example">
            ⦁ Extra rewards for accurate use of prepositions on the first try.
          </p>
          <div class="action-buttons">
            <RouterLink
              to="/sprint-task20"
              @click="
                quiz.loadQuestions('task20');
                quiz.quizCompleted = false;
              "
            >
              <button class="btn add-to-learned">Get Started</button>
            </RouterLink>
          </div>
        </div>
        <div class="word-content word-content2">
          <h2>Task 12</h2>
          <p class="definition">Singular vs. Plural Subjects and Verbs</p>
          <p class="example">
            ⦁ Once you’ve chosen the correct verb, categorize the sentence as
            having either a Singular Subject or a Plural Subject.
          </p>
          <div class="action-buttons">
            <RouterLink
              to="/sprint-task27"
              @click="
                quiz.loadQuestions('task27');
                quiz.quizCompleted = false;
              "
            >
              <button class="btn add-to-learned">Get Started</button>
            </RouterLink>
          </div>
        </div>
        <div class="word-content word-content2">
          <h2>Task 13</h2>
          <p class="definition">
            Singular and Plural Subjects in Complex Sentences
          </p>
          <p class="example">
            ⦁ The land consists of various regions, including tranquil villages,
            vibrant cities, and serene landscapes, where you must restore
            balance by ensuring correct subject-verb agreement.
          </p>
          <div class="action-buttons">
            <RouterLink
              to="/sprint-task28"
              @click="
                quiz.loadQuestions('task28');
                quiz.quizCompleted = false;
              "
            >
              <button class="btn add-to-learned">Get Started</button>
            </RouterLink>
          </div>
        </div>
        <div class="word-content word-content2">
          <h2>Task 14</h2>
          <p class="definition">
            English Language Level Pre-Test
          </p>
          <p class="example">
            This pre-test is designed to help determine the appropriate level for students' English language instruction. The test is divided into three sections—Elementary, Intermediate, and Advanced. Students should attempt to answer all the questions. Their performance will help to identify their current level.

          </p>
          <div class="action-buttons">
            <RouterLink
              to="/sprint-task45"
              @click="
                quiz.loadQuestions('task45');
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
          <p class="example">Choose an appropriate option for each sentence:</p>
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
        <div class="word-content2">
          <h2>Task 2</h2>
          <p class="definition">Numbers, Days of the Week, Months</p>
          <p class="example">Choose an appropriate option for each sentence:</p>
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
        <div class="word-content2">
          <h2>Task 3</h2>
          <p class="definition">Common Verbs and Adjectives</p>
          <p class="example">Choose an appropriate option for each sentence:</p>
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
        <div class="word-content2">
          <h2>Task 4</h2>
          <p class="definition">Basic Colors, Shapes, and Sizes</p>
          <p class="example">Choose an appropriate option for each sentence:</p>
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
        <div class="word-content2">
          <h2>Task 5</h2>
          <p class="definition">Greetings and Introductions</p>
          <p class="example">Choose an appropriate option for each sentence:</p>
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
        <div class="word-content2">
          <h2>Task 6</h2>
          <p class="definition">Asking and Giving Directions</p>
          <p class="example">Choose an appropriate option for each sentence:</p>
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
        <div class="word-content2">
          <h2>Task 7</h2>
          <p class="definition">Shopping Vocabulary</p>
          <p class="example">Choose an appropriate option for each sentence:</p>
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
        <div class="word-content2">
          <h2>Task 8</h2>
          <p class="definition">Basic Emotions and Feelings</p>
          <p class="example">Choose an appropriate option for each sentence:</p>
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
        <div class="word-content word-content2">
          <h2>Task 9</h2>
          <p class="definition">Prepositions of Direction</p>
          <p class="example">
            ⦁ Use prepositions to describe where something is, when something
            happens, or where someone is going.
          </p>
          <div class="action-buttons">
            <RouterLink
              to="/sprint-task21"
              @click="
                quiz.loadQuestions('task21');
                quiz.quizCompleted = false;
              "
            >
              <button class="btn add-to-learned">Get Started</button>
            </RouterLink>
          </div>
        </div>
        <div class="word-content word-content2">
          <h2>Task 10</h2>
          <p class="definition">Coordinating Conjunctions</p>
          <p class="example">
            ⦁ Successfully use conjunctions in at least 80% of the sentences to
            complete stories or tasks.
          </p>
          <div class="action-buttons">
            <RouterLink
              to="/sprint-task22"
              @click="
                quiz.loadQuestions('task22');
                quiz.quizCompleted = false;
              "
            >
              <button class="btn add-to-learned">Get Started</button>
            </RouterLink>
          </div>
        </div>
        <div class="word-content word-content2">
          <h2>Task 11</h2>
          <p class="definition">Subordinating Conjunctions</p>
          <p class="example">
            ⦁ Use coordinating conjunctions to connect words or clauses of equal
            importance, and subordinating conjunctions to connect dependent
            clauses to main clauses.
          </p>
          <div class="action-buttons">
            <RouterLink
              to="/sprint-task23"
              @click="
                quiz.loadQuestions('task23');
                quiz.quizCompleted = false;
              "
            >
              <button class="btn add-to-learned">Get Started</button>
            </RouterLink>
          </div>
        </div>
        <div class="word-content word-content2">
          <h2>Task 12</h2>
          <p class="definition">
            Basic Sentence Patterns (Subject-Verb-Object)
          </p>
          <p class="example">
            ⦁ A character will present you with a sentence or a sentence
            fragment, and you must choose the correct structure or complete the
            sentence using a list of options.
          </p>
          <div class="action-buttons">
            <RouterLink
              to="/sprint-task24"
              @click="
                quiz.loadQuestions('task24');
                quiz.quizCompleted = false;
              "
            >
              <button class="btn add-to-learned">Get Started</button>
            </RouterLink>
          </div>
        </div>
        <div class="word-content word-content2">
          <h2>Task 13</h2>
          <p class="definition">Questions (Yes/No, WH-Questions)</p>
          <p class="example">
            ⦁ The mystical land includes various regions such as enchanted
            forests, ancient castles, and bustling marketplaces, each inhabited
            by characters who need help with sentence construction.
          </p>
          <div class="action-buttons">
            <RouterLink
              to="/sprint-task25"
              @click="
                quiz.loadQuestions('task25');
                quiz.quizCompleted = false;
              "
            >
              <button class="btn add-to-learned">Get Started</button>
            </RouterLink>
          </div>
        </div>
        <div class="word-content word-content2">
          <h2>Task 13</h2>
          <p class="definition">Negatives</p>
          <p class="example">
            ⦁ Players will learn to identify and correctly use different
            sentence structures, including basic sentence patterns, simple
            sentences, questions, and negatives.
          </p>
          <div class="action-buttons">
            <RouterLink
              to="/sprint-task26"
              @click="
                quiz.loadQuestions('task26');
                quiz.quizCompleted = false;
              "
            >
              <button class="btn add-to-learned">Get Started</button>
            </RouterLink>
          </div>
        </div>
      </div>
      <div v-if="selectedLevel === 'B1'" class="word-card">
        <div class="word-content">
          <h2>Task 1</h2>
          <p class="definition">Compound Sentences</p>
          <p class="example">
            You are an architect of language, tasked with constructing bridges
            and pathways between ideas. To help the inhabitants of this land
            communicate effectively, you must build sentences that connect their
            thoughts in logical and meaningful ways.
          </p>
          <div class="action-buttons">
            <RouterLink
              to="/sprint-task29"
              @click="
                quiz.loadQuestions('task29');
                quiz.quizCompleted = false;
              "
            >
              <button class="btn add-to-learned">Get Started</button>
            </RouterLink>
          </div>
        </div>
        <div class="word-content word-content2">
          <h2>Task 2</h2>
          <p class="definition">Conditional Sentences</p>
          <p class="example">
            ⦁ Zero Conditional, First Conditional and Second Conditional:
          </p>
          <div class="action-buttons">
            <RouterLink
              to="/sprint-task31"
              @click="
                quiz.loadQuestions('task31');
                quiz.quizCompleted = false;
              "
            >
              <button class="btn add-to-learned">Get Started</button>
            </RouterLink>
          </div>
        </div>
        <div class="word-content word-content2">
          <h2>Task 3</h2>
          <p class="definition">Demonstrative Pronouns</p>
          <p class="example">
            ⦁ The city is divided into different districts, each representing a
            different type of pronoun. Your task is to navigate these districts
            by using the correct pronouns to uncover hidden truths.
          </p>
          <div class="action-buttons">
            <RouterLink
              to="/sprint-task33"
              @click="
                quiz.loadQuestions('task33');
                quiz.quizCompleted = false;
              "
            >
              <button class="btn add-to-learned">Get Started</button>
            </RouterLink>
          </div>
        </div>
        <div class="word-content word-content2">
          <h2>Task 4</h2>
          <p class="definition">Adverbs of Degree</p>
          <p class="example">
            ⦁ Correctly arrange and categorize at least 80% of the modifiers to
            bring the world to life.
          </p>
          <div class="action-buttons">
            <RouterLink
              to="/sprint-task35"
              @click="
                quiz.loadQuestions('task35');
                quiz.quizCompleted = false;
              "
            >
              <button class="btn add-to-learned">Get Started</button>
            </RouterLink>
          </div>
        </div>
         <div class="word-content word-content2">
          <h2>Task 5</h2>
          <p class="definition">English Language Level Pre-Test</p>
          <p class="example">
            This pre-test is designed to help determine the appropriate level for students' English language instruction. The test is divided into three sections—Elementary, Intermediate, and Advanced. Students should attempt to answer all the questions. Their performance will help to identify their current level.

          </p>
          <div class="action-buttons">
            <RouterLink
              to="/sprint-task46"
              @click="
                quiz.loadQuestions('task46');
                quiz.quizCompleted = false;
              "
            >
              <button class="btn add-to-learned">Get Started</button>
            </RouterLink>
          </div>
        </div>
      </div>
      <div v-if="selectedLevel === 'B2'" class="word-card">
        <div class="word-content">
          <h2>Task 1</h2>
          <p class="definition">Complex Sentences</p>
          <p class="example">
            ⦁ The land consists of various regions, each representing different
            types of sentence structures. Your goal is to help characters build
            sentences that are strong and clear, enabling them to express
            complex ideas.
          </p>
          <div class="action-buttons">
            <RouterLink
              to="/sprint-task30"
              @click="
                quiz.loadQuestions('task30');
                quiz.quizCompleted = false;
              "
            >
              <button class="btn add-to-learned">Get Started</button>
            </RouterLink>
          </div>
        </div>
        <div class="word-content word-content2">
          <h2>Task 2</h2>
          <p class="definition">Relative Pronouns</p>
          <p class="example">
            ⦁ For each sentence below, fill in the blank with the correct
            pronoun from the options provided. The pronoun should be chosen
            based on the context of the sentence.
          </p>
          <div class="action-buttons">
            <RouterLink
              to="/sprint-task32"
              @click="
                quiz.loadQuestions('task32');
                quiz.quizCompleted = false;
              "
            >
              <button class="btn add-to-learned">Get Started</button>
            </RouterLink>
          </div>
        </div>
        <div class="word-content word-content2">
          <h2>Task 3</h2>
          <p class="definition">Interrogative Pronouns</p>
          <p class="example">
            ⦁ After completing the sentence, read it again to ensure that the
            pronoun you selected is appropriate for the context.
          </p>
          <div class="action-buttons">
            <RouterLink
              to="/sprint-task34"
              @click="
                quiz.loadQuestions('task34');
                quiz.quizCompleted = false;
              "
            >
              <button class="btn add-to-learned">Get Started</button>
            </RouterLink>
          </div>
        </div>
        <div class="word-content word-content2">
          <h2>Task 4</h2>
          <p class="definition">Omission of Articles</p>
          <p class="example">
            ⦁ Some tasks will involve complex sentences that require a deep
            understanding of when articles are necessary and how they affect
            meaning.
          </p>
          <div class="action-buttons">
            <RouterLink
              to="/sprint-task36"
              @click="
                quiz.loadQuestions('task36');
                quiz.quizCompleted = false;
              "
            >
              <button class="btn add-to-learned">Get Started</button>
            </RouterLink>
          </div>
        </div>
        <div class="word-content word-content2">
          <h2>Task 5</h2>
          <p class="definition">Specific vs. General Meaning</p>
          <p class="example">
            ⦁ Correctly insert, omit, and categorize at least 80% of the
            articles to complete the adventure.
          </p>
          <div class="action-buttons">
            <RouterLink
              to="/sprint-task37"
              @click="
                quiz.loadQuestions('task37');
                quiz.quizCompleted = false;
              "
            >
              <button class="btn add-to-learned">Get Started</button>
            </RouterLink>
          </div>
        </div>
      </div>
      <div v-if="selectedLevel === 'C1'" class="word-card">
        <div class="word-content">
          <h2>Task 1</h2>
          <p class="definition">Linking Words</p>
          <p class="example">
            ⦁ For each sentence below, fill in the blank with the correct
            linking word or phrase from the options provided. The linking word
            or phrase should be chosen based on the relationship between the
            ideas in the sentence (contrast, cause and effect, or continuation).
          </p>
          <div class="action-buttons">
            <RouterLink
              to="/sprint-task38"
              @click="
                quiz.loadQuestions('task38');
                quiz.quizCompleted = false;
              "
            >
              <button class="btn add-to-learned">Get Started</button>
            </RouterLink>
          </div>
        </div>
        <div class="word-content word-content2">
          <h2>Task 2</h2>
          <p class="definition">Linking Phrases</p>
          <p class="example">
            ⦁ Some tasks will involve complex arguments that require careful
            consideration of how to best link ideas.
          </p>
          <div class="action-buttons">
            <RouterLink
              to="/sprint-task39"
              @click="
                quiz.loadQuestions('task39');
                quiz.quizCompleted = false;
              "
            >
              <button class="btn add-to-learned">Get Started</button>
            </RouterLink>
          </div>
        </div>
        <div class="word-content word-content2">
          <h2>Task 3</h2>
          <p class="definition">Basic Colors, Shapes, and Sizes</p>
          <p class="example">
            Players will learn to use basic vocabulary in context, including
            greetings and introductions, asking and giving directions, shopping
            vocabulary, and basic emotions and feelings.
          </p>
          <div class="action-buttons">
            <RouterLink
              to="/sprint-task44"
              @click="
                quiz.loadQuestions('task44');
                quiz.quizCompleted = false;
              "
            >
              <button class="btn add-to-learned">Get Started</button>
            </RouterLink>
          </div>
        </div>
        <div class="word-content word-content2">
          <h2>Task 4</h2>
          <p class="definition">English Language Level Pre-Test</p>
          <p class="example">
            This pre-test is designed to help determine the appropriate level for students' English language instruction. The test is divided into three sections—Elementary, Intermediate, and Advanced. Students should attempt to answer all the questions. Their performance will help to identify their current level.
          </p>
          <div class="action-buttons">
            <RouterLink
              to="/sprint-task47"
              @click="
                quiz.loadQuestions('task47');
                quiz.quizCompleted = false;
              "
            >
              <button class="btn add-to-learned">Get Started</button>
            </RouterLink>
          </div>
        </div>
      </div>
      <div v-if="selectedLevel === 'C2'" class="word-card">
        <div class="word-content">
          <h2>Task 1</h2>
          <p class="definition">Identify the Phrasal Verb</p>
          <p class="example">
            ⦁ Once you’ve chosen the phrasal verb, determine its meaning based
            on the context provided.
          </p>
          <div class="action-buttons">
            <RouterLink
              to="/sprint-task40"
              @click="
                quiz.loadQuestions('task40');
                quiz.quizCompleted = false;
              "
            >
              <button class="btn add-to-learned">Get Started</button>
            </RouterLink>
          </div>
        </div>
        <div class="word-content word-content2">
          <h2>Task 2</h2>
          <p class="definition">Basic Everyday Vocabulary</p>
          <p class="example">
            ⦁ A character presents you with an image or description, and your
            task is to choose the correct word from a list of options.
          </p>
          <div class="action-buttons">
            <RouterLink
              to="/sprint-task41"
              @click="
                quiz.loadQuestions('task41');
                quiz.quizCompleted = false;
              "
            >
              <button class="btn add-to-learned">Get Started</button>
            </RouterLink>
          </div>
        </div>
        <div class="word-content word-content2">
          <h2>Task 3</h2>
          <p class="definition">Numbers, Days of the Week, Months</p>
          <p class="example">
            ⦁ A character presents you with an image or description, and your
            task is to choose the correct word from a list of options.
          </p>
          <div class="action-buttons">
            <RouterLink
              to="/sprint-task42"
              @click="
                quiz.loadQuestions('task42');
                quiz.quizCompleted = false;
              "
            >
              <button class="btn add-to-learned">Get Started</button>
            </RouterLink>
          </div>
        </div>
        <div class="word-content word-content2">
          <h2>Task 4</h2>
          <p class="definition">Common Verbs and Adjectives</p>
          <p class="example">
            ⦁ Some tasks will involve sentences or descriptions that require
            careful attention to context and themes.
          </p>
          <div class="action-buttons">
            <RouterLink
              to="/sprint-task43"
              @click="
                quiz.loadQuestions('task43');
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
