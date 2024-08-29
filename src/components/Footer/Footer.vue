<script setup>
import "./footer.scss";
import {RouterLink} from 'vue-router'
</script>
<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-top-block">
        <ul class="footer-top-block-blog">
          <li class="footer-top-block-blog-item">
            <RouterLink to="/" class="footer-top-block-blog-item-link">home</RouterLink>
          </li>
          <li class="footer-top-block-blog-item">
            <a href="#" class="footer-top-block-blog-item-link">textbook</a>
          </li>
          <li class="footer-top-block-blog-item">
            <a href="#" class="footer-top-block-blog-item-link">statisticks</a>
          </li>
          <li class="footer-top-block-blog-item">
            <RouterLink to="/sprint" class="footer-top-block-blog-item-link">sprint</RouterLink>
          </li>
          <li class="footer-top-block-blog-item">
            <RouterLink to="/audio" href="#" class="footer-top-block-blog-item-link">audio-call</RouterLink>
          </li>
        </ul>
        <div class="footer-top-block-blog">
          <p>Alex</p>
          <p>Gabriel</p>
          <p>Marcus</p>
        </div>
      </div>
      <hr>
      <div class="footer-bot-block">
        <div class="footer-bot-block-icons">
            <img src="@/assets/images/github-icon.svg" alt="">
            <img src="@/assets/images/gt-icon.svg" alt="">
            <img src="@/assets/images/youtube-icon.svg" alt="">
        </div>
        <div class="footer-bot-block-text">
            <p>©2024 Grammar Quest. Project for </p>
            <p class="footer-bot-block-text-p">Grammar Quest</p>
        </div>
      </div>
    </div>
  </footer>
</template>
