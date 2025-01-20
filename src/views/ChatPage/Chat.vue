<script setup>
import { ref, onMounted } from "vue";
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
let recognition;

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
  showClearModal.value = true;
};

const confirmClearHistory = () => {
  messages.value = [];
  saveMessagesToLocalStorage();
  showClearModal.value = false;
};

const cancelClearHistory = () => {
  showClearModal.value = false;
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
    };
    messages.value.push(botMessage);
    saveMessagesToLocalStorage();
    speak(botMessage.content);
    modalMessage.value = botMessage.content;
  } catch (error) {
    console.error("Error:", error);
  } finally {
    isTyping.value = false;
  }
};

const startRecognition = () => {
  if (!recognition) return;

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
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-US";
  speechSynthesis.speak(utterance);
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
      sendMessage();
    };

    recognition.onend = () => {
      recognizing.value = false;
      showModal.value = false;
    };
  } else {
    console.warn("SpeechRecognition API is not supported in this browser.");
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

    <div v-if="showClearModal" class="modal-overlay" @click.self="cancelClearHistory">
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

<style>
.typing-indicator span {
  display: inline-block;
  width: 8px;
  height: 8px;
  background-color: #ccc;
  border-radius: 50%;
  margin-right: 4px;
  animation: typing 1.5s infinite ease-in-out;
}

.typing-indicator span:nth-child(1) {
  animation-delay: 0s;
}

.typing-indicator span:nth-child(2) {
  animation-delay: 0.3s;
}

.typing-indicator span:nth-child(3) {
  animation-delay: 0.6s;
}

@keyframes typing {
  0%, 100% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal {
  background: white;
  width: 90%;
  max-width: 400px;
  border-radius: 8px;
  padding: 20px;
  position: relative;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.modal-content h3 {
  margin-bottom: 10px;
  font-size: 20px;
}

.modal-content p {
  font-size: 16px;
  color: #555;
}

.close-btn {
  position: absolute;
  top: -20px;
  right: -20px;
  background: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  font-size: 24px;
  line-height: 36px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #000;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

.close-btn:hover {
  background: #f5f5f5;
}
</style>
