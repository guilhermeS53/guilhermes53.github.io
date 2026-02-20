<template>
  <footer id="footer" class="reveal">
    <div class="footer__content max-width mb-0">
      <h2 class="tertiary-title mb-s"><b>Vamos conversar?</b></h2>
      <p class="mb-m">
        Ficarei muito contente em saber mais sobre seus projetos e como
        podemos trabalhar juntos para <br />
        torná-los realidade.
      </p>
      <div class="footer__contact mb-m">
        <a href="mailto:guilhermetxt53@gmail.com" target="_blank" class="footer__contact-link">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect width="20" height="16" x="2" y="4" rx="2"/>
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
          </svg>
          guilhermetxt53@gmail.com
        </a>
        <a href="https://wa.me/5562996881509" target="_blank" class="footer__contact-link">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          (62) 99688-1509
        </a>
      </div>
      <SocialLinks />
      <p class="footer__copyright mt-l">
        Todos os direitos reservados<br />
        &copy; 2026
      </p>
    </div>
  </footer>
</template>

<script setup>
import SocialLinks from './SocialLinks.vue'
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

.mt-l {
  margin-top: 4rem;
}

footer .footer__content .footer__contact {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.2rem;
}

footer .footer__content .footer__contact-link {
  display: inline-flex;
  align-items: center;
  gap: 0.8rem;
  color: var(--muted);
  font-weight: 500;
  font-size: 1.5rem;
  padding: 0.8rem 1.6rem;
  border-radius: 1rem;
  border: 1px solid var(--border);
  background: var(--surface);
  transition: background 0.25s ease, color 0.25s ease, transform 0.25s ease, border-color 0.25s ease;
}

footer .footer__content .footer__contact-link:hover {
  color: var(--accent);
  background: var(--accent-weak);
  transform: translateY(-2px);
  text-decoration: none;
}

footer .footer__content .footer__copyright {
  font-size: 1.4rem;
  color: var(--muted-2);
}
</style>
