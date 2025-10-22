<script setup>
import { ref, onUnmounted, watch } from "vue";
import { useRouter } from "vue-router";
import { useLoginStore } from "@/stores/login";
import HeaderButton from "@/UI/Buttons/HeaderButton/HeaderButton.vue";

const store = useLoginStore();
const router = useRouter();

const name = ref("");
const email = ref("");
const password = ref("");
const code = ref("");
const fieldErrors = ref({ name: "", email: "" });

const codeSent = ref(false);
const timer = ref(120);
let intervalId = null;
watch(
  () => store.login,
  (newValue) => {
    if (newValue) {
      store.error = "";
    }
  }
);

const startTimer = () => {
  timer.value = 120;
  intervalId = setInterval(() => {
    if (timer.value > 0) {
      timer.value--;
    } else {
      clearInterval(intervalId);
      codeSent.value = false;
    }
  }, 1000);
};

async function handleLogin(e) {
  e.preventDefault();
  fieldErrors.value = { name: "", email: "" };

  if (store.login) {
    await store.verifyInfo(name.value, password.value);
    if (store.logged) router.push("/");
  } else {
    if (!codeSent.value) {
      const result = await store.sendCode(email.value, name.value);
      if (result.success) {
        codeSent.value = true;
        startTimer();
      } else {
        if (result.field === "email") fieldErrors.value.email = result.message;
        if (result.field === "username")
          fieldErrors.value.name = result.message;
      }
    } else {
      const success = await store.registerUser(
        name.value,
        email.value,
        password.value,
        code.value
      );
      if (success) router.push("/");
    }
  }
}

onUnmounted(() => {
  if (intervalId) clearInterval(intervalId);
});
</script>

<template>
  <section v-if="store.login" class="login">
    <div class="container">
      <div class="login-block">
        <img src="@/assets/images/login-door.png" alt="Door" class="door" />
        <h2 class="login-title">Вход в кабинет</h2>
        <form class="login-form" @submit="handleLogin">
          <p v-if="store.error" class="error">
            Неверное имя пользователя или пароль
          </p>
          <div>
            <label for="name">Имя пользователя</label>
            <input v-model="name" type="text" id="name" placeholder="Имя" />
          </div>
          <div>
            <label for="password">Пароль</label>
            <input
              v-model="password"
              type="password"
              id="password"
              placeholder="********"
            />
          </div>
          <HeaderButton type="submit" :text="'Продолжить'" />
        </form>
        <span class="register-to">
          Нет аккаунта?
          <p @click="store.login = false">Зарегистрируйтесь сейчас</p>
        </span>
      </div>
    </div>
  </section>

  <section v-else class="authReg login">
    <div class="container">
      <div class="login-block">
        <h2 class="login-title2">Создать новый аккаунт</h2>
        <form class="login-form" @submit="handleLogin">
          <p v-if="store.error" class="error">Ошибка регистрации</p>

          <div v-if="!codeSent">
            <label for="name">Имя пользователя</label>
            <input v-model="name" type="text" id="name" placeholder="Имя" />
            <p class="error" v-if="fieldErrors.name">{{ fieldErrors.name }}</p>
          </div>

          <div v-if="!codeSent">
            <label for="email">Email</label>
            <input
              v-model="email"
              type="email"
              id="email"
              placeholder="example@mail.com"
            />
            <p class="error" v-if="fieldErrors.email">
              {{ fieldErrors.email }}
            </p>
          </div>

          <div v-if="codeSent">
            <p class="timer">Осталось: {{ timer }} сек</p>
            <label for="code">Код подтверждения</label>
            <input
              v-model="code"
              type="text"
              id="code"
              placeholder="6-значный код"
              required
            />
          </div>

          <div v-if="!codeSent">
            <label for="password">Пароль</label>
            <input
              v-model="password"
              type="password"
              id="password"
              placeholder="********"
            />
          </div>
          <span class="register-to">
            Уже есть аккаунт?
            <p @click="store.login = true">Войдите</p>
          </span>
          <HeaderButton
            type="submit"
            :text="codeSent ? 'Завершить регистрацию' : 'Отправить код'"
          />
        </form>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.login-title2 {
  font-size: 30px;
  margin-bottom: 20px;
}
.register-to {
  display: flex;
  align-items: center;
  gap: 5px;
  text-align: center;
  width: 100%;
  justify-content: center;
  margin-top: 20px;
  & p {
    cursor: pointer;
    color: #78258d;
  }
}
.door {
  position: absolute;
  right: -50%;
}
.error {
  color: red;
}
.timer {
  margin-top: -10px;
  margin-bottom: 15px;
  font-size: 14px;
  color: #555;
}
.login {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  & .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  &-block {
    width: 407px;
    position: relative;
  }
  &-title {
    margin-bottom: 20px;
    font-weight: 900;
    font-size: 46px;
    line-height: 1.13;
    letter-spacing: 0.01em;
    color: #232323;
  }
  &-form {
    display: flex;
    flex-direction: column;
    gap: 20px;
    & div {
      display: flex;
      flex-direction: column;
      gap: 10px;
      & label {
        font-weight: 500;
        font-size: 15px;
        line-height: 1.6;
        letter-spacing: 0.01em;
        color: #232323;
      }
      & input {
        height: 60px;
        width: 100%;
        padding-left: 20px;
        border: 2px solid #78258d;
        border-radius: 8px;
        outline: none;
      }
    }
  }
}
</style>
