<template>
  <footer id="footer" class="reveal">
    <div class="footer__content max-width mb-0">
      <h2 class="tertiary-title mb-s"><b>Tem um projeto em mente?</b></h2>
      <p class="mb-m">
        Vamos conversar e torná-lo realidade. Me conta a sua ideia e
        retorno o mais breve possível.
      </p>
      <button type="button" class="btn btn-primary btn-cta hover-lift" @click="showContact = true">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect width="20" height="16" x="2" y="4" rx="2" />
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
        Enviar mensagem
      </button>
      <div class="footer__social">
        <SocialLinks />
      </div>
      <p class="footer__copyright">
        Todos os direitos reservados<br />
        &copy; 2026
      </p>
    </div>
  </footer>

  <ContactModal v-model="showContact" />
</template>

<script setup>
import { ref } from 'vue'
import SocialLinks from './SocialLinks.vue'
import ContactModal from './ContactModal.vue'

const showContact = ref(false)
</script>

<style scoped>
footer {
  background: var(--surface-2);
  border-top: 1px solid var(--border);
  transition: background 0.3s ease, border-color 0.3s ease, color 0.3s ease;
}

footer .footer__content {
  text-align: center;
  padding: 6rem 2rem 1rem;
  max-width: 47rem;
}

.btn-cta {
  display: inline-flex;
  align-items: center;
  gap: 0.8rem;
  font-size: 1.5rem;
  padding: 1.4rem 2.8rem;
}

.footer__social {
  margin-top: 3.2rem;
}

.footer__copyright {
  margin-top: 4rem;
  font-size: 1.4rem;
  color: var(--muted-2);
}
</style>

