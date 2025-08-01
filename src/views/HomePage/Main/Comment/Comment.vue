<script setup>
import { useI18n } from "vue-i18n";
const { t } = useI18n();
import "./comment.scss";
</script>
<template>
  <section class="comment">
    <div class="container">
      <div class="comment-top">
        <h2 class="comment-top-title">{{ t("comment.title") }}</h2>
        <button class="comment-top-button">{{ t("comment.button") }}</button>
      </div>
      <div class="comment-blocks">
        <img
          src="@/assets/images/main/comment-person.png"
          class="comment-person"
          loading="lazy"
          alt="Image"
        />
        <img
          src="@/assets/images/main/comment-bg.png"
          class="comment-bg"
          loading="lazy"
          alt="Image"
        />
        <div class="comment-block">
          <div class="comment-block-top">
            <span class="comment-block-top-title">
              {{ t("comment.name") }}
              <p>{{ t("comment.role") }}</p>
            </span>
            <div class="stars">
              <svg
                width="30"
                height="28"
                viewBox="0 0 30 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15 0L18.3677 10.3647H29.2658L20.4491 16.7705L23.8168 27.1353L15 20.7295L6.18322 27.1353L9.55093 16.7705L0.734152 10.3647H11.6323L15 0Z"
                  fill="#8F49A0"
                />
              </svg>
              <svg
                width="30"
                height="28"
                viewBox="0 0 30 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15 0L18.3677 10.3647H29.2658L20.4491 16.7705L23.8168 27.1353L15 20.7295L6.18322 27.1353L9.55093 16.7705L0.734152 10.3647H11.6323L15 0Z"
                  fill="#8F49A0"
                />
              </svg>
              <svg
                width="30"
                height="28"
                viewBox="0 0 30 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15 0L18.3677 10.3647H29.2658L20.4491 16.7705L23.8168 27.1353L15 20.7295L6.18322 27.1353L9.55093 16.7705L0.734152 10.3647H11.6323L15 0Z"
                  fill="#8F49A0"
                />
              </svg>
              <svg
                width="30"
                height="28"
                viewBox="0 0 30 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15 0L18.3677 10.3647H29.2658L20.4491 16.7705L23.8168 27.1353L15 20.7295L6.18322 27.1353L9.55093 16.7705L0.734152 10.3647H11.6323L15 0Z"
                  fill="#8F49A0"
                />
              </svg>
              <svg
                width="30"
                height="28"
                viewBox="0 0 30 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15 0L18.3677 10.3647H29.2658L20.4491 16.7705L23.8168 27.1353L15 20.7295L6.18322 27.1353L9.55093 16.7705L0.734152 10.3647H11.6323L15 0Z"
                  fill="#8F49A0"
                />
              </svg>
            </div>
          </div>
          <p class="comment-block-text">
            {{ t("comment.text") }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
