<script setup>
import { ref } from "vue";
import "./Chat.scss";
const userInput = ref("");
const response = ref("");

const sendMessage = async () => {
  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: userInput.value }],
    }),
  });
  const data = await res.json();
  response.value = data.choices[0].message.content;
};
</script>

<template>
  <div class="chat">
    <div class="container">
      <input v-model="userInput" placeholder="Type your message" />
      <button @click="sendMessage">Send</button>
      <p>{{ response }}</p>
    </div>
  </div>
</template>
