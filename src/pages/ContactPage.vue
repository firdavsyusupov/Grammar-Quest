<script setup>
import HeaderButton from '@/UI/Buttons/HeaderButton/HeaderButton.vue';
import { useI18n } from 'vue-i18n';
const {t} = useI18n()
</script>
<template>
  <section class="contact-page">
    <div class="container">
      <div class="contact-top">
        <h2>Контакты</h2>
        <p>Мы на связи в любое удобное время</p>
      </div>
      <div class="contact-blocks">
        <div class="contact-block">
          <div class="contact-card">
            <img src="@/assets/images/contact/card1.png" alt="Image" />
            <span
              >По телефону <br />
              <p>+7 (495) 156-35-50</p></span
            >
          </div>
          <div class="contact-card">
            <img src="@/assets/images/contact/card2.png" alt="Image" />
            <span
              >По электронке <br />
              <p>
                info@language2go.ru <br />
                support@language2go.ru
              </p></span
            >
          </div>
          <div class="contact-card">
            <img src="@/assets/images/contact/card3.png" alt="Image" />
            <span>В соц. сетях <br /></span>
          </div>
        </div>
        <div class="contact-block contact-block2">
          <h3>Нужна помощь с выбором курса?</h3>
          <span>Оставьте заявку и мы подберем индивидуальное решение</span>
          <form>
            <div class="input1">
              <label for="">Имя</label>
              <input type="text" placeholder="Имя" />
            </div>
            <div class="input1">
              <label for="">Телефон</label>
              <input type="text" placeholder="+7 (___) ___-__-__" />
            </div>
            <div class="input2">
              <label for="comment">Сообщение (не обязательно)</label>
              <textarea
                class="textarea"
                id="comment"
                placeholder="Расскажите нам о возникшем вопрос"
              ></textarea>
            </div>
            <HeaderButton :text="t('faq.btn')"/>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>
<style lang="scss" scoped>
.contact-page{
    margin: 50px 0;
}
.contact-block2 {
  & h3 {
    font-weight: 700;
    font-size: 24px;
    line-height: 1.33333;
    color: #232323;
  }
  & span {
    font-weight: 500;
    font-size: 16px;
    line-height: 1.5;
    letter-spacing: 0.02em;
    color: #585858;
  }
  & form {
    display: flex;
    flex-wrap: wrap;
    gap: 25px;
    & div {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    & .input1 {
      width: 48%;
      & label {
        font-weight: 500;
        font-size: 15px;
        line-height: 1.6;
        letter-spacing: 0.01em;
        color: #232323;
      }
      & input {
        border: 2px solid #78258d;
        border-radius: 8px;
        outline: none;
        padding: 18px;
        &::placeholder {
          color: #78258d;
        }
      }
    }
    & .input2 {
      width: 100%;
      & label {
        color: #232323;
        font-weight: 500;
        font-size: 15px;
        line-height: 1.6;
        letter-spacing: 0.01em;
      }
      & .textarea {
        background: #f2f2f2;
        border-radius: 8px;
        padding: 18px;
        border: none;
        height: 148px;
      }
    }
  }
}
.contact-blocks {
  display: flex;
  gap: 40px;
}
.contact-card {
  width: 100%;
  padding: 35px 40px;
  background: #f9f9f9;
  border-radius: 20px;
  display: flex;
  align-items: center;
  gap: 35px;
}
.contact-block {
  width: 30%;
  display: flex;
  flex-direction: column;
  gap: 30px;
  &2 {
    width: 70%;
    gap: 10px;
  }
}

.contact-top {
  display: flex;
  flex-direction: column;
  gap: 10px;
  & h2 {
    font-weight: 900;
    font-size: 46px;
    line-height: 1.17391;
    letter-spacing: 0.01em;
    color: #232323;
  }
  & p {
    font-weight: 500;
    font-size: 20px;
    line-height: 1.4;
    letter-spacing: 0.01em;
    color: #585858;
    margin-bottom: 30px;
  }
}
</style>
