<script setup>
import { ref, computed, onMounted } from "vue";
import RecycleIcon from "@/components/icons/RecycleIcon.vue";
import SendIcon from "@/components/icons/SendIcon.vue";
import MicIcon from "@/components/icons/MicIcon.vue";
import "./Chat.scss";

const userInput = ref("");
const messages = ref([]);
const isTyping = ref(false);
const showModal = ref(false);
const showClearModal = ref(false);
const isReading = ref(false);
const recognizing = ref(false);
const modalMessage = ref("Click the mic button to start speaking.");
const voiceMode = ref(false);
let recognition;

const nonVoiceMessages = computed(() =>
  messages.value.filter((msg) => !msg.isVoice || msg.isVoice === undefined)
);

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

const sendMessageText = async () => {
  const messageToSend = userInput.value.trim();
  if (!messageToSend) return;

  const userMessage = {
    content: messageToSend,
    role: "user",
    time: new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
    isVoice: false,
  };
  messages.value.push(userMessage);
  saveMessagesToLocalStorage();
  userInput.value = "";
  modalMessage.value = "";
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
          {
            role: "system",
            content:
              "You are an educational assistant focused only helping users improve their English.",
          },
          { role: "user", content: messageToSend },
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
      isVoice: false,
    };

    messages.value.push(botMessage);
    modalMessage.value = botMessage.content;
    saveMessagesToLocalStorage();
  } catch {
    modalMessage.value = "Failed to get a response. Please try again.";
  } finally {
    isTyping.value = false;
  }
};

const sendMessageVoice = async () => {
  const voiceMessage = userInput.value.trim();
  if (!voiceMessage) return;

  const userMessage = {
    content: voiceMessage,
    role: "user",
    time: new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
    isVoice: true,
  };
  messages.value.push(userMessage);
  saveMessagesToLocalStorage();
  userInput.value = "";
  modalMessage.value = "Processing voice message...";
  isTyping.value = true;
  isReading.value = true;

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
          {
            role: "system",
            content:
              "You are an educational assistant focused only helping users improve their English. Assist with summary writing, essay creation, IELTS writing tasks, and provide tips for learning English effectively. Ignore any other topics or requests.",
          },
          { role: "user", content: voiceMessage },
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
      isVoice: true,
    };

    messages.value[messages.value.length - 1] = botMessage;
    modalMessage.value = botMessage.content;
    saveMessagesToLocalStorage();
    readBotMessage(botMessage.content);
  } catch {
    modalMessage.value = "Failed to get a response. Please try again.";
    isReading.value = false;
  } finally {
    isTyping.value = false;
  }
};

const readBotMessage = (text) => {
  if (!window.speechSynthesis) return;

  const utterance = new SpeechSynthesisUtterance(text);
  const language = /[а-яё]/i.test(text) ? "ru-RU" : "en-US";
  utterance.lang = language;
  utterance.rate = 1;
  utterance.pitch = 1;
  isReading.value = true;

  utterance.onend = () => {
    isReading.value = false;
  };

  speechSynthesis.speak(utterance);
};

const stopReading = () => {
  speechSynthesis.cancel();
  isReading.value = false;
  modalMessage.value = "Reading stopped. You can send a new message.";
};

const startRecognition = () => {
  if (!recognition) return;

  voiceMode.value = true;
  showModal.value = true;
  modalMessage.value = "Listening...";
  recognizing.value = true;
  recognition.start();
};

const stopRecognition = () => {
  if (recognition) {
    recognition.onend = null;
    recognition.stop();
  }

  voiceMode.value = false;
  recognizing.value = false;
  showModal.value = false;
  modalMessage.value = "Voice recognition stopped.";
};

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
      modalMessage.value = transcript;
    };

    recognition.onend = () => {
      recognizing.value = false;
      if (voiceMode.value) {
        modalMessage.value = userInput.value || "You can speak again...";
        recognition.start();
        recognizing.value = true;
      }
    };
  }
});

const closeModal = () => {
  showModal.value = false;
  voiceMode.value = false;
  recognizing.value = false;
  recognition.stop();
  isReading.value = false;
  speechSynthesis.cancel();
};
</script>

<template>
  <div class="chat">
    <div class="container-x">
      <div class="title">
        <div class="gptchat">
          <img class="gpt-img" src="@/assets/images/chatgpt.webp" alt="ChatGPT logo" />
          <h2 class="chat-title">ChatGPT 4o-mini</h2>
        </div>
        <div class="icon-container" @click="clearHistory" aria-label="Clear History">
          <RecycleIcon :size="20" class="icon" />
        </div>
      </div>
      <div class="layout" v-if="messages.length === 0">
        <div class="gptchat2">
          <h2 class="chat-title">ChatGPT 4o-mini</h2>
          <p class="chat-text">Ask me anything!</p>
        </div>
      </div>
      <div class="messages custom-scroll">
        <div v-for="(msg, index) in nonVoiceMessages" :key="index" :class="['message', msg.role]">
          <div class="meta">
            <span class="time">{{ msg.time }}</span>
          </div>
          <p>{{ msg.content }}</p>
        </div>
        <div v-if="isTyping" class="message assistant typing-indicator" aria-live="polite">
          <span></span><span></span><span></span>
        </div>
      </div>
      <div class="input-section">
        <input v-model="userInput" placeholder="Type your message" @keydown.enter="sendMessageText" aria-label="Input message" />
        <button @click="startRecognition" class="voice-btn inputbtn" aria-label="Start voice recognition">
          <MicIcon :size="20" />
        </button>
        <button @click="sendMessageText" aria-label="Send message" class="inputbtn">
          <SendIcon :size="20" />
        </button>
      </div>
    </div>
    <div v-if="showModal" class="modal-overlay" @click.self="closeModal" aria-hidden="false">
      <div class="modal" role="dialog" aria-modal="true">
        <div class="modal-content">
          <button class="close" @click="closeModal" aria-label="Close modal">X</button>
          <h3>Assistant</h3>
          <p>{{ modalMessage }}</p>
          <button @click="isReading ? stopReading() : sendMessageVoice()" aria-label="Send or Stop reading" class="close-btn">
            {{ isReading ? "Stop" : "Send" }}
          </button>
        </div>
      </div>
    </div>
    <div v-if="showClearModal" class="modal-overlay" @click.self="cancelClearHistory" aria-hidden="false">
      <div class="modal">
        <div class="modal-content">
          <h3>Are you sure you want to clear the chat history?</h3>
          <div class="modal-actions">
            <button class="confirm modal-buttons" @click="confirmClearHistory" aria-label="Confirm clear history">Yes</button>
            <button class="cancel modal-buttons" @click="cancelClearHistory" aria-label="Cancel clear history">No</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
