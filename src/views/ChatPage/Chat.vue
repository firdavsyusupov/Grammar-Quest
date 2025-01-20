<script setup>
import { ref, onMounted } from "vue";
import RecycleIcon from "@/components/icons/RecycleIcon.vue";
import "./Chat.scss";

const userInput = ref("");
const messages = ref([]);
const isTyping = ref(false);
const showModal = ref(false);

const saveMessagesToLocalStorage = () => {
  localStorage.setItem("chatMessages", JSON.stringify(messages.value));
};

const loadMessagesFromLocalStorage = () => {
  const savedMessages = localStorage.getItem("chatMessages");
  if (savedMessages) {
    messages.value = JSON.parse(savedMessages);
  }
};

const clearHistory = () => {
  messages.value = [];
  saveMessagesToLocalStorage();
  showModal.value = false;
};

const sendMessage = async () => {
  if (!userInput.value.trim()) return;

  const userMessage = {
    content: userInput.value,
    role: "user",
    time: new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
  };
  messages.value.push(userMessage);
  userInput.value = "";
  saveMessagesToLocalStorage();

  isTyping.value = true;

  try {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "You are an educational assistant focused only on helping users improve their English. Assist with summary writing, essay creation, IELTS writing tasks, and provide tips for learning English effectively. Ignore any other topics or requests." },
          { role: "user", content: userMessage.content }
        ],
      }),
    });

    const data = await res.json();
    const botMessage = {
      content: data.choices[0].message.content,
      role: "assistant",
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    messages.value.push(botMessage);
    saveMessagesToLocalStorage();
  } catch (error) {
    console.error("Error:", error);
  } finally {
    isTyping.value = false;
  }
};

onMounted(() => {
  loadMessagesFromLocalStorage();
});
</script>

<template>
  <div class="chat">
    <div class="container-x">
      <div class="title">
        <h2 class="chat-title">ChatGPT 4o-mini</h2>
        <div class="icon-container" @click="showModal = true">
          <RecycleIcon :size="20" class="icon" />
          <div class="tooltip">Clear History</div>
        </div>
      </div>
      <div class="messages custom-scroll">
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
        <div v-if="isTyping" class="message assistant typing-indicator">
          <span></span><span></span><span></span>
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

    <div v-if="showModal" class="modal-overlay" @click.self="showModal = false">
      <div class="modal">
        <h3>Are you sure you want to clear history?</h3>
        <div class="modal-actions">
          <button class="cancel" @click="showModal = false">No</button>
          <button class="confirm" @click="clearHistory">Yes, clear</button>
        </div>
      </div>
    </div>
  </div>
</template>

