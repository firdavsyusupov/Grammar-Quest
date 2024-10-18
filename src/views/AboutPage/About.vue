<script setup>
import TeamMember from '@/UI/teamMember/teamMember.vue';
import first from '@/assets/images/1.jpg';
import second from '@/assets/images/2.jpg';
import third from '@/assets/images/3.jpg';
import fourth from '@/assets/images/4.jpg';
import "./about.scss"

const teamMembers = [
  { name: 'Elena Aripova', role: 'I am Elena Aripova. With a PhD and over 25 years of teaching experience, I am passionate about empowering students through education. Throughout my career, I have developed innovative teaching methods that bridge theory and practical application, helping learners thrive in dynamic academic environments. I am dedicated to continuous learning and creating impactful educational experiences for students of all levels.', image: first },
  { name: 'Shodiyakhon Inomkhujaeva', role: 'Shodiyakhon Inomkhujaeva is an English language teacher with 9 years of experience. She works at WIUT and currently is about to defend her PhD dissertation.', image: second },
  { name: 'Yana Arustamyan', role: "I'm Yana Arustamyan, and with my Doctor of Science degree and over 22 years of teaching experience, I've developed a deep expertise in translation and language education. Throughout my career, I’ve had the privilege of helping countless students master the art of translation by bridging academic rigor with practical skills. My approach is all about making language learning engaging, relevant, and inspiring, whether you’re a beginner or an advanced learner. Passionate about continuous growth, I thrive on seeing my students succeed and confidently apply their knowledge in real-world situations.", image: third },
  { name: 'Umida Abdurakhimova', role: "Umida Abdurakhimova is a PhD candidate and an experienced lecturer at Westminster International University in Tashkent, where she plays a pivotal role in the Global Education Department. With over 20 years of teaching experience, she is deeply committed to fostering an inclusive and dynamic learning environment. Umida specializes in integrating global perspectives into her curriculum, ensuring students are equipped with the knowledge and skills needed to succeed in an increasingly interconnected world. Her academic expertise, combined with her passion for innovative teaching methodologies, allows her to mentor and inspire the next generation of leaders. As a thought leader in education, she is also involved in research aimed at advancing the field of global education and empowering diverse learners", image: fourth },
];
</script>
<template>
  <section class="our-team">
    <div class="container">
      <h2 class="our-team__title">Meet Our Team</h2>
      <div class="our-team__grid">
        <TeamMember
          v-for="(member, index) in teamMembers"
          :key="index"
          :name="member.name"
          :role="member.role"
          :image="member.image"
        />
      </div>
    </div>
  </section>
</template>


