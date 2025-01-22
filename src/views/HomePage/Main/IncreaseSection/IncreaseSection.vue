<script setup>
import Button from "@/UI/Buttons/HeaderButton/HeaderButton.vue";

import "./increasesection.scss"
</script>
<template>
    <section class="increase">
        <div class="container">
            <div class="increase-text-block">
                <h3 class="increase-text-block-title">Increase your vocabulary</h3>
                <p class="increase-text-block-text">Traditional and new effective approaches to word study</p>
                <RouterLink to="/textbook">
                    <Button :text="'Textbook'" :icon='true'/>
                </RouterLink>
            </div>
            <div class="increase-img-block">
                <img src="@/assets/images/increase-section-img.svg" alt="">
            </div>
        </div>
    </section>
</template>