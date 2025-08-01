<script setup>
import "./footer.scss";
</script>
<template>
  <footer class="footer">
    <div class="footer-top">
      <div class="container">
        <div class="footer-blocks">
          <div class="footer-block">
            <img
              src="@/assets/images/logo-e-course.svg"
              aria-label="Logo"
              alt="Logo"
              class="logo"
            />
            <span class="bottom-logo"
              >Language2Go — интерактивная платформа для легкого, удобного и
              быстрого изучения иностранных языков.</span
            >
          </div>
          <div class="footer-block">
            <p>Обучение</p>
            <ul>
              <li>
                <RouterLink class="footer-link" to="/">Все языки</RouterLink>
              </li>
              <li>
                <RouterLink class="footer-link" to="/">Взрослым</RouterLink>
              </li>
              <li>
                <RouterLink class="footer-link" to="/"
                  >Детям и подросткам</RouterLink
                >
              </li>
              <li>
                <RouterLink class="footer-link" to="/">Мини-курсы</RouterLink>
              </li>
              <li>
                <RouterLink class="footer-link" to="/">Тренажеры</RouterLink>
              </li>
              <li>
                <RouterLink class="footer-link" to="/"
                  >Индивидуальные занятия</RouterLink
                >
              </li>
            </ul>
          </div>
          <div class="footer-block">
            <p>Информация</p>
            <ul>
              <li><RouterLink class="footer-link" to="/">О нас</RouterLink></li>
              <li>
                <RouterLink class="footer-link" to="/">Отзывы</RouterLink>
              </li>
              <li>
                <RouterLink class="footer-link" to="/">Новости</RouterLink>
              </li>
              <li>
                <RouterLink class="footer-link" to="/"
                  >Частые вопросы</RouterLink
                >
              </li>
              <li>
                <RouterLink class="footer-link" to="/"
                  >Условия оплаты</RouterLink
                >
              </li>
              <li>
                <RouterLink class="footer-link" to="/">Контакты</RouterLink>
              </li>
            </ul>
          </div>
          <div class="footer-block">
            <p>Контакты</p>
            <p>+7 (495) 156-35-50</p>
            <span
              >info@language2go.ru support@language2go.ru <br />
              <br />
              101000, Москва, Россия</span
            >
          </div>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <div class="container">
        <span>© 2025 E-Course</span>
        <div>
          <p>Правовая оговорка</p>
          <p>Пользовательское соглашение</p>
          <p>Политика конфиденциальности</p>
        </div>
      </div>
    </div>
  </footer>
</template>
