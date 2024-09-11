<script setup>
import { ref } from "vue";
import channel1 from "@/assets/images/channel logo/1.jpg";
import channel2 from "@/assets/images/channel logo/2.jpg";
import channel3 from "@/assets/images/channel logo/3.jpg";
import channel4 from "@/assets/images/channel logo/4.jpg";
import channel5 from "@/assets/images/channel logo/5.jpg";
import channel6 from "@/assets/images/channel logo/6.jpg";
import channel7 from "@/assets/images/channel logo/7.svg";
import channel8 from "@/assets/images/channel logo/8.svg";
import channel9 from "@/assets/images/channel logo/9.png";
import channel10 from "@/assets/images/channel logo/10.svg";
import channel11 from "@/assets/images/channel logo/11.jpg";
import channel12 from "@/assets/images/channel logo/12.jpg";

import "./platform.scss";

const youtubePlatforms = [
  {
    name: "Speak English Smartly",
    description:
      "Podcasts and audio lessons that help learners improve listening skills, pronunciation, and spoken English understanding.",
    link: "https://www.youtube.com/@Speakenglishsmartly",
    logo: channel1,
  },
  {
    name: "Podcast Speak English",
    description:
      "Engaging podcasts focused on real-life English conversations and practices.",
    link: "https://www.youtube.com/@PodcastSpeakEnglish",
    logo: channel2,
  },
  {
    name: "Lovely English Stories",
    description:
      "Interesting English stories that enhance comprehension and language skills.",
    link: "https://www.youtube.com/@LovelyEnglishStories",
    logo: channel3,
  },
  {
    name: "Best English Stories",
    description: "A channel focused on the best English stories for learners.",
    link: "https://www.youtube.com/@bestenglishstories777",
    logo: channel4,
  },
  {
    name: "RealLife English",
    description: "Lessons that bring English to life through practical usage.",
    link: "https://www.youtube.com/@RealLifeEnglish1",
    logo: channel5,
  },
  {
    name: "Oxford Online English",
    description: "Learn English with lessons from Oxford Online English.",
    link: "https://www.youtube.com/@Oxfordonlineenglish1",
    logo: channel6,
  },
];

const otherPlatforms = [
  {
    name: "British Council: Learn English Kids",
    description:
      "Interactive games, songs, stories, and activities for children to learn English.",
    link: "https://learnenglishkids.britishcouncil.org/",
    logo: channel7,
  },
  {
    name: "Duolingo",
    description:
      "A popular platform that gamifies learning with vocabulary, grammar, and pronunciation exercises.",
    link: "https://www.duolingo.com/",
    logo: channel8,

  },
  {
    name: "ESL Games Plus",
    description:
      "Interactive grammar, vocabulary, and pronunciation games for all levels.",
    link: "https://www.eslgamesplus.com/",
    logo: channel9,

  },
  {
    name: "Memrise",
    description:
      "Combines memorization techniques with interactive games to learn English.",
    link: "https://www.memrise.com/",
    logo: channel10,

  },
  {
    name: "FluentU",
    description:
      "Uses real-world videos like movie trailers to create engaging English learning games.",
    link: "https://www.fluentu.com/",
    logo: channel11,

  },
  {
    name: "Fun English Games",
    description: "A range of fun word games, spelling games, and grammar activities.",
    link: "https://www.funenglishgames.com/",
    logo: channel12,

  },
];

const selectedTitle = ref("Youtube Platform");
const onTitleClick = (title) => {
  selectedTitle.value = title;
};
</script>

<template>
  <section class="platform">
    <div class="container">
      <div class="platform-title">
        <span
          @click="onTitleClick('Youtube Platform')"
          :class="{
            active: selectedTitle === 'Youtube Platform',
            inactive: selectedTitle !== 'Youtube Platform',
          }"
          class="title"
          >Youtube Platform</span
        >
        <span
          @click="onTitleClick('Other Platforms')"
          :class="{
            active: selectedTitle === 'Other Platforms',
            inactive: selectedTitle !== 'Other Platforms',
          }"
          class="title"
          >Other Platforms</span
        >
      </div>

      <div v-if="selectedTitle === 'Youtube Platform'" class="platform-cards">
        <div
          class="platform-card"
          v-for="(platform, index) in youtubePlatforms"
          :key="index"
        >
          <img :src="platform.logo" alt="Platform Logo" class="platform-logo" />
          <h3>{{ platform.name }}</h3>
          <p>{{ platform.description }}</p>
          <a :href="platform.link" target="_blank">Visit Channel</a>
        </div>
      </div>

      <div v-if="selectedTitle === 'Other Platforms'" class="platform-cards">
        <div
          class="platform-card"
          v-for="(platform, index) in otherPlatforms"
          :key="index"
        >
          <img :src="platform.logo" alt="Platform Logo" class="platform-logo" />
          <h3>{{ platform.name }}</h3>
          <p>{{ platform.description }}</p>
          <a :href="platform.link" target="_blank">Visit Website</a>
        </div>
      </div>
    </div>
  </section>
</template>

