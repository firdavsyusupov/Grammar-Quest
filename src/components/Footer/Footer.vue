<script setup>
import "./footer.scss";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
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
            <span class="bottom-logo">
              {{ t("footer.description") }}
            </span>
          </div>
          <div class="footer-block">
            <p>{{ t("footer.learning") }}</p>
            <ul>
              <li><RouterLink class="footer-link" to="/">{{ t("footer.allLanguages") }}</RouterLink></li>
              <li><RouterLink class="footer-link" to="/">{{ t("footer.forAdults") }}</RouterLink></li>
              <li><RouterLink class="footer-link" to="/">{{ t("footer.forKids") }}</RouterLink></li>
              <li><RouterLink class="footer-link" to="/">{{ t("footer.miniCourses") }}</RouterLink></li>
              <li><RouterLink class="footer-link" to="/">{{ t("footer.trainers") }}</RouterLink></li>
              <li><RouterLink class="footer-link" to="/">{{ t("footer.individual") }}</RouterLink></li>
            </ul>
          </div>
          <div class="footer-block">
            <p>{{ t("footer.info") }}</p>
            <ul>
              <li><RouterLink class="footer-link" to="/">{{ t("footer.aboutUs") }}</RouterLink></li>
              <li><RouterLink class="footer-link" to="/">{{ t("footer.reviews") }}</RouterLink></li>
              <li><RouterLink class="footer-link" to="/">{{ t("footer.news") }}</RouterLink></li>
              <li><RouterLink class="footer-link" to="/">{{ t("footer.faq") }}</RouterLink></li>
              <li><RouterLink class="footer-link" to="/">{{ t("footer.paymentTerms") }}</RouterLink></li>
              <li><RouterLink class="footer-link" to="/">{{ t("footer.contacts") }}</RouterLink></li>
            </ul>
          </div>
          <div class="footer-block">
            <p>{{ t("footer.contactsTitle") }}</p>
            <p>+7 (495) 156-35-50</p>
            <span>
              info@language2go.ru support@language2go.ru <br /><br />
              101000, {{ t("footer.city") }}
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <div class="container">
        <span>© 2025 E-Course</span>
        <div>
          <p>{{ t("footer.legalDisclaimer") }}</p>
          <p>{{ t("footer.userAgreement") }}</p>
          <p>{{ t("footer.privacyPolicy") }}</p>
        </div>
      </div>
    </div>
  </footer>
</template>

