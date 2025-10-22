<script setup>
import HeaderButton from "@/UI/Buttons/HeaderButton/HeaderButton.vue";
import { ref, watch } from "vue";
import { useI18n } from "vue-i18n";
import "./register.scss";
const {t} =useI18n()
const phoneInput = ref(null);
const isFocused = ref(false);

const handleInput = (e) => {
  let value = e.target.value.replace(/\D/g, "");
  if (value.length > 12) {
    value = value.substring(0, 12);
  }
  let formattedValue = "+998 ";
  if (value.length > 3) formattedValue += value.substring(3, 5);
  if (value.length > 5) formattedValue += " " + value.substring(5, 8);
  if (value.length > 8) formattedValue += " " + value.substring(8, 10);
  if (value.length > 10) formattedValue += " " + value.substring(10);

  e.target.value = formattedValue;
};

const handleKeyDown = (e) => {
  if (
    e.target.selectionStart <= 4 &&
    (e.key === "Backspace" || e.key === "Delete")
  ) {
    e.preventDefault();
  }
};
watch(isFocused, (newValue, oldValue) => {
  isFocused.value = newValue;
});

const handleBlur = (e) => {
  if (!e.target.value || e.target.value === "+998") {
    e.target.value = "+998 ";
  }
  isFocused.value = false;
};
</script>

<template>
  <section class="register">
    <div class="container">
      <img
        src="@/assets/images/main/register-person.png"
        class="register-person"
        alt="Person"
      />
      <h2 class="register-title">
        {{ t("register.title") }}
      </h2>
      <form class="register-form">
        <div class="form-inputs">
          <div class="phone-input-container">
            <label class="static-label" :class="{ active: isFocused }">
              {{ t("register.phone") }}
            </label>
            <div class="input-container" :class="{ focused: isFocused }">
              <input
                ref="phoneInput"
                type="text"
                id="phone"
                @focus="
                  isFocused = true;
                  if (!$event.target.value) $event.target.value = '+998 ';
                "
                @blur="handleBlur"
                @input="handleInput"
                @keydown="handleKeyDown"
                maxlength="17"
                inputmode="numeric"
              />
            </div>
          </div>
        </div>
      </form>
      <div class="accept">
        <input type="checkbox" />

        <p>
          {{ t("register.agree") }}
          <span>{{ t("register.policy") }}</span>
          {{ t("register.and") }}
          <span>{{ t("register.terms") }}</span>
        </p>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.static-label {
  position: absolute;
  background: #efefff;
  z-index: 99;
  top: 61%;
  left: 10px;
  transform: translateY(-50%);
  padding: 2px 10px;
  transition: 0.3s;
  color: #828282;
  &.active {
    top: 0px;
    transform: scale(0.9);
    color: #000;
  }
}
.register {
  margin-top: 70px;

  &-person {
    position: absolute;
    right: 8%;
    top: 25%;
    z-index: 1;
  }

  .container {
    background: url(@/assets/images/main/register-bg.png) no-repeat center /
      cover;
    min-height: 525px;
    position: relative;
    padding-left: 100px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-radius: 12px;
    overflow: hidden;
  }

  &-title {
    font-weight: 900;
    font-size: 46px;
    line-height: 1.17391;
    letter-spacing: -0.01em;
    color: #232323;
    width: 700px;
    margin-bottom: 40px;
    position: relative;
    z-index: 2;
  }

  &-form {
    margin-bottom: 25px;
    position: relative;
    z-index: 2;

    .form-inputs {
      display: flex;
      align-items: flex-end;
      gap: 20px;

      .phone-input-container {
        width: 407px;
      }
    }
  }

  .accept {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    width: 600px;
    position: relative;
    z-index: 2;

    p {
      font-weight: 500;
      font-size: 16px;
      line-height: 1.25;
      letter-spacing: -0.02em;
      color: #828282;

      span {
        text-decoration: underline;
        text-decoration-skip-ink: none;
        color: #2e90d1;
        cursor: pointer;
      }
    }

    input {
      width: 20px;
      height: 20px;
      min-width: 20px;
      border: 1px solid #bb92c6;
      border-radius: 4px;
      cursor: pointer;
      margin-top: 2px;
    }
  }
}

.input-container {
  position: relative;
  border-radius: 8px;
  border: 1px solid #ccc;
  transition: all 0.3s ease;
  height: 48px;
  width: 100%;

  &.focused {
    border-color: #78258d;
  }

  input {
    width: 100%;
    height: 100%;
    padding: 20px 20px 8px;
    border: none;
    background: transparent;
    font-size: 16px;
    &:focus {
      outline: none;
    }
  }

  .floating-label {
    position: absolute;
    left: 20px;
    top: 50%;
    transform: translateY(-50%);
    color: #999;
    font-size: 16px;
    pointer-events: none;
    transition: 0.3s ease;
  }

  &.focused .floating-label {
    top: 6px;
    font-size: 12px;
    color: #4a90e2;
  }
}
</style>
