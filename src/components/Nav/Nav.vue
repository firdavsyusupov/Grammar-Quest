<script setup>
import "./nav.scss";
import RightIcon from "../../components/icons/RightIcon.vue";
import Signup from "@/UI/Buttons/SignUp/SignUp.vue"
</script>
<template>
  <nav class="nav">
    <div class="container">
      <div class="nav__links">
        <div class="logo">
          <img src="@/assets/images/logo.svg" alt="" class="logo-img" />
        </div>
        <ul class="nav__items">
          <li class="nav__item">
            <a href="#" class="nav__link">home</a>
          </li>
          <li class="nav__item">
            <a href="#" class="nav__link">textbook</a>
          </li>
          <li class="nav__item">
            <a href="#" class="nav__link">statistics</a>
          </li>
          <li class="nav__item">
            <a href="#" class="nav__link">games</a>
          </li>
        </ul>
      </div>
      <div class="nav__login">
        <!-- <div class="nav__login-name">
          <p class="nav__login-name-img">F</p>
          <p class="nav__login-name-text">Firdavs</p>
        </div> -->

        <!-- <div class="nav__signout">
          <p class="nav__signout-text">sign out</p>
          <SignOut :size="25" />
        </div> -->

        <div class="nav__signout">
          <p class="nav__signout-text">log in</p>
          <RightIcon :size="25" />
        </div>
        <Signup/>
      </div>
    </div>
  </nav>
</template>
