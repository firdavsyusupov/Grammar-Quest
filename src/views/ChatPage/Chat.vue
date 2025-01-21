<script setup>
import { ref, onMounted, computed } from "vue";
import RecycleIcon from "@/components/icons/RecycleIcon.vue";
import SendIcon from "@/components/icons/SendIcon.vue";
import MicIcon from "@/components/icons/MicIcon.vue";
import "./Chat.scss";

const userInput = ref("");
const messages = ref([]);
const isTyping = ref(false);
const showModal = ref(false);
const showClearModal = ref(false);
const recognizing = ref(false);
const modalMessage = ref("Click the mic button to start speaking.");
const voiceMode = ref(false);
let recognition;

const saveMessagesToLocalStorage = () => {
  localStorage.setItem("chatMessages", JSON.stringify(messages.value));
};

const loadMessagesFromLocalStorage = () => {
  const savedMessages = localStorage.getItem("chatMessages");
  if (savedMessages) {
    messages.value = JSON.parse(savedMessages).map((msg) => ({
      ...msg,
      isVoice: msg.isVoice ?? false,
    }));
  }
};

const clearHistory = () => (showClearModal.value = true);

const confirmClearHistory = () => {
  messages.value = [];
  saveMessagesToLocalStorage();
  showClearModal.value = false;
};

const cancelClearHistory = () => (showClearModal.value = false);

const sendMessage = async () => {
  if (!userInput.value.trim()) return;

  const userMessage = {
    content: userInput.value,
    role: "user",
    time: new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
    isVoice: voiceMode.value,
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
          { role: "system", content: "You are an educational assistant..." },
          { role: "user", content: userMessage.content },
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
      isVoice: voiceMode.value,
    };

    messages.value.push(botMessage);
    saveMessagesToLocalStorage();

    if (voiceMode.value) {
      modalMessage.value = botMessage.content;
      speak(botMessage.content);
    }
  } catch (error) {
    console.error("Error:", error);
  } finally {
    isTyping.value = false;
  }
};

const startRecognition = () => {
  if (!recognition) return;
  voiceMode.value = true;
  showModal.value = true;
  modalMessage.value = "Listening...";
  recognition.start();
  recognizing.value = true;
};

const stopRecognition = () => {
  if (!recognition) return;
  recognition.stop();
  recognizing.value = false;
};

const speak = (text) => {
  if (voiceMode.value) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    speechSynthesis.speak(utterance);
  }
};

const filteredMessages = computed(() => {
  return messages.value.filter((msg) => msg.isVoice !== true);
});

onMounted(() => {
  loadMessagesFromLocalStorage();
  if ("SpeechRecognition" in window || "webkitSpeechRecognition" in window) {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.continuous = false;

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      userInput.value = transcript;
      sendMessage();
    };

    recognition.onend = () => {
      recognizing.value = false;
    };
  }
});
</script>

<template>
  <div class="chat">
    <div class="container-x">
      <div class="title">
        <div class="gptchat">
          <img class="gpt-img" src="@/assets/images/chatgpt.webp" alt="" />
          <h2 class="chat-title">ChatGPT 4o-mini</h2>
        </div>
        <div class="icon-container" @click="clearHistory">
          <RecycleIcon :size="20" class="icon" />
          <div class="tooltip">Clear History</div>
        </div>
      </div>
      <div class="layout" v-if="messages.length === 0">
        <div class="gptchat2">
          <h2 class="chat-title">ChatGPT 4o-mini</h2>
          <p class="chat-text">Ask me anything!</p>
        </div>
      </div>
      <div class="messages custom-scroll">
        <div
          v-for="(msg, index) in filteredMessages"
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
        <button @click="startRecognition" class="voice-btn">
          <MicIcon :size="20" />
        </button>
        <button @click="sendMessage">
          <SendIcon :size="20" />
        </button>
      </div>
    </div>
    <div v-if="showModal" class="modal-overlay" @click.self="showModal = false">
      <div class="modal">
        <button class="close-btn" @click="showModal = false">✖</button>
        <div class="modal-content">
          <h3>Listening...</h3>
          <p>{{ modalMessage }}</p>
        </div>
      </div>
    </div>
    <div
      v-if="showClearModal"
      class="modal-overlay"
      @click.self="cancelClearHistory"
    >
      <div class="modal">
        <div class="modal-content">
          <h3>Are you sure you want to clear the chat history?</h3>
          <div class="modal-actions">
            <button class="confirm" @click="confirmClearHistory">Yes</button>
            <button class="cancel" @click="cancelClearHistory">No</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
