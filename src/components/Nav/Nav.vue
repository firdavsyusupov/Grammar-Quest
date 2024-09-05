<script setup>
import { RouterLink } from 'vue-router'

import RightIcon from "../../components/icons/RightIcon.vue";
import Signup from "@/UI/Buttons/SignUp/SignUp.vue"
import BottomIcon from "@/components/icons/BottomIcon.vue"
import "./nav.scss";
</script>
<template>
  <nav class="nav">
    <div class="container">
      <div class="nav__links">
        <RouterLink to="/" class="logo">
          <img src="@/assets/images/logo.svg" alt="" class="logo-img" />
        </RouterLink>
        <ul class="nav__items">
          <li class="nav__item">
            <RouterLink to="/" class="nav__link">home</RouterLink>
          </li>
          <li class="nav__item">
            <RouterLink to="/textbook" class="nav__link">textbook</RouterLink>
          </li>
          <li class="nav__item">
            <RouterLink to="/about" class="nav__link">our team</RouterLink>
          </li>
          <!-- <li class="nav__item">
            <a href="#" class="nav__link">statistics</a>
          </li> -->
          <li class="nav__item nav__item2">
            <a href="#" class="nav__link">games</a>
            <BottomIcon :size="25" class="bottom-icon"/>
            <div class="nav-dropdown">
              <RouterLink to="/textbook" class="nav-dropdown-block">
                <h5 class="nav-dropdown-block-text">Sprint</h5>
                <RightIcon :size="20" class="nav-dropdown-block-icon"/>
              </RouterLink>
              <RouterLink to="/audio" class="nav-dropdown-block">
                <h5 class="nav-dropdown-block-text">Audio-call</h5>
                <RightIcon :size="20" class="nav-dropdown-block-icon"/>
              </RouterLink>
            </div>
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

        <!-- <div class="nav__signout">
          <p class="nav__signout-text">log in</p>
          <RightIcon :size="25" />
        </div>
        <Signup :text="'sign up'"/> -->
      </div>
    </div>
  </nav>
</template>
