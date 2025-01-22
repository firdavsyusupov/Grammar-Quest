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
    isVoice: false,
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
          {
            role: "system",
            content:
              "You are an educational assistant focused only helping users improve their English. Assist with summary writing, essay creation, IELTS writing tasks, and provide tips for learning English effectively. Ignore any other topics or requests.",
          },
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
      isVoice: false,
    };

    messages.value.push(botMessage);
    saveMessagesToLocalStorage();
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
  if (recognition) {
    recognition.onend = null;
    recognition.stop();
    recognizing.value = false;
    voiceMode.value = false;
    modalMessage.value = "Voice recognition stopped.";
    showModal.value = false;
    speechSynthesis.cancel();
  }
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

    recognition.onresult = async (event) => {
      const transcript = event.results[0][0].transcript;
      modalMessage.value = "Processing your question...";

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
                  "You are an educational assistant focused only on helping users improve their English. Assist with summary writing, essay creation, IELTS writing tasks, and provide tips for learning English effectively. Ignore any other topics or requests.",
              },
              { role: "user", content: transcript },
            ],
          }),
        });

        const data = await res.json();
        const botResponse = data.choices[0].message.content;

        if (!voiceMode.value) {
          messages.value.push({
            content: transcript,
            role: "user",
            time: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
            isVoice: true,
          });
        }

        if (!voiceMode.value) {
          messages.value.push({
            content: botResponse,
            role: "assistant",
            time: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
            isVoice: false,
          });
        }

        saveMessagesToLocalStorage();

        if (voiceMode.value) {
          speak(botResponse);
        }

        modalMessage.value = botResponse;
      } catch (error) {
        console.error("Error processing voice input:", error);
        modalMessage.value =
          "Sorry, there was an error processing your request.";
      } finally {
        recognizing.value = false;
      }
    };

    recognition.onend = () => {
      recognizing.value = false;
      if (voiceMode.value) {
        modalMessage.value = "Listening for your next question...";
        recognition.start();
        recognizing.value = true;
      }
    };
  }
});
</script>

<template>
  <div class="chat">
    <div class="container-x">
      <div class="title">
        <div class="gptchat">
          <img
            class="gpt-img"
            src="@/assets/images/chatgpt.webp"
            alt="ChatGPT logo"
          />
          <h2 class="chat-title">ChatGPT 4o-mini</h2>
        </div>
        <div
          class="icon-container"
          @click="clearHistory"
          aria-label="Clear History"
        >
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

        <div
          v-if="isTyping"
          class="message assistant typing-indicator"
          aria-live="polite"
        >
          <span></span><span></span><span></span>
        </div>
      </div>
      <div class="input-section">
        <input
          v-model="userInput"
          placeholder="Type your message"
          @keydown.enter="sendMessage"
          aria-label="Input message"
        />
        <button
          @click="startRecognition"
          class="voice-btn"
          aria-label="Start voice recognition"
        >
          <MicIcon :size="20" />
        </button>
        <button @click="sendMessage" aria-label="Send message">
          <SendIcon :size="20" />
        </button>
      </div>
    </div>
    <div
      v-if="showModal"
      class="modal-overlay"
      @click.self="showModal = false"
      aria-hidden="false"
    >
      <div class="modal" role="dialog" aria-modal="true">
        <div class="modal-content">
          <h3>Assistant</h3>
          <p>{{ modalMessage }}</p>
          <button
            class="close-btn"
            @click="stopRecognition"
            aria-label="Close modal"
          >
            Stop
          </button>
        </div>
      </div>
    </div>
    <div
      v-if="showClearModal"
      class="modal-overlay"
      @click.self="cancelClearHistory"
      aria-hidden="false"
    >
      <div class="modal">
        <div class="modal-content">
          <h3>Are you sure you want to clear the chat history?</h3>
          <div class="modal-actions">
            <button
              class="confirm"
              @click="confirmClearHistory"
              aria-label="Confirm clear history"
            >
              Yes
            </button>
            <button
              class="cancel"
              @click="cancelClearHistory"
              aria-label="Cancel clear history"
            >
              No
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
