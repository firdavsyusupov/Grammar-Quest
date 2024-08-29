<script setup>
import RightIcon from "@/components/icons/RightIcon.vue"
import "./learnsection.scss"
</script>
<template>
    <section class="learn">
        <div class="container">
            <div class="learn-img-block">
                <img src="@/assets/images/learn-section-img.svg" alt="">
            </div>
            <div class="learn-text-block">
                <h3 class="learn-text-block-title">Learn a language in a playful way</h3>
                <p class="learn-text-block-text">Make learning words more fun with mini-games</p>
                <div class="learn-text-block-buttons">
                    <a href="#" class="learn-text-block-button">
                        <img class="learn-text-block-button-img" src="@/assets/images/learn-section-shoe.svg" alt="">
                        <div class="learn-text-block-button-text">
                            <p>Sprint</p>
                            <RightIcon :size="15"/>
                        </div>
                    </a>
                    <a href="#" class="learn-text-block-button learn-text-block-button2">
                        <img class="learn-text-block-button-img2" src="@/assets/images/learn-section-button-img.svg" alt="">
                        <div class="learn-text-block-button-text learn-text-block-button-text2">
                            <p>Audio-call</p>
                            <RightIcon :size="15"/>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    </section>
</template>