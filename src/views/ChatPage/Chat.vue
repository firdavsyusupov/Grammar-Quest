<script setup>
import { ref, onMounted } from "vue";
import "./Chat.scss";

const userInput = ref("");
const messages = ref([]);

const saveMessagesToLocalStorage = () => {
  localStorage.setItem("chatMessages", JSON.stringify(messages.value));
};

const loadMessagesFromLocalStorage = () => {
  const savedMessages = localStorage.getItem("chatMessages");
  if (savedMessages) {
    messages.value = JSON.parse(savedMessages);
  }
};

const sendMessage = async () => {
  if (!userInput.value.trim()) return;

  const userMessage = {
    content: userInput.value,
    role: "user",
    time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
  };
  messages.value.push(userMessage);
  userInput.value = "";
  saveMessagesToLocalStorage();

  try {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: userMessage.content }],
      }),
    });

    const data = await res.json();
    const botMessage = {
      content: data.choices[0].message.content,
      role: "assistant",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    messages.value.push(botMessage);
    saveMessagesToLocalStorage();
  } catch (error) {
    console.error("Error:", error);
  }
};

onMounted(() => {
  loadMessagesFromLocalStorage();
});
</script>

<template>
  <div class="chat">
    <div class="container-x">
    <h2 class="chat-title">ChatGPT 4o-mini</h2>
      <div class="messages">
        <div
          v-for="(msg, index) in messages"
          :key="index"
          :class="['message', msg.role]"
        >
          <div class="meta">
            <span class="time">{{ msg.time }}</span>
          </div>
          <p>{{ msg.content }}</p>
        </div>
      </div>
      <div class="input-section">
        <input
          v-model="userInput"
          placeholder="Type your message"
          @keydown.enter="sendMessage"
        />
        <button @click="sendMessage">Send</button>
      </div>
    </div>
  </div>
</template>
