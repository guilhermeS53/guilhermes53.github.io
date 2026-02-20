<template>
  <header id="header" class="max-width">
    <div class="header__left">
      <h1 class="hero-animate hero-animate-delay-1">Guilherme Sousa Desenvolvedor Fullstack</h1>
      <p class="hero-animate hero-animate-delay-5">
        Desenvolvedor Fullstack com experiência na criação de aplicações web
        escaláveis e responsivas. Tenho conhecimento em tecnologias frontend como
        <b>HTML, CSS e Vue.js</b>, além de domínio em
        linguagens backend <b>C# (.NET Framework) e Node.js</b>. Além disso, banco de dados
        <b>SQL e NoSQL</b>.
      </p>
      <p class="hero-animate hero-animate-delay-3">
        Tenho experiência em desenvolvimento de software
        com metodologias ágeis, como Scrum, e sou capaz de trabalhar
        em equipe, colaborando com designers, analistas e outros desenvolvedores
        para criar soluções que atendam às necessidades do negócio.
      </p>
      <p class="hero-animate hero-animate-delay-3">
        Com uma abordagem centrada na experiência do usuário, atuo no
        desenvolvimento de soluções que garantem segurança, performance e
        escalabilidade, sempre buscando inovação e aprimoramento contínuo para
        atender às demandas do mercado.
      </p>
      <div class="header__cta hero-animate hero-animate-delay-4">
        <a href="#projects" class="btn btn-primary hover-lift">Ver projetos</a>
        <a href="#about" class="btn btn-outline hover-lift">Sobre mim</a>
        <button type="button" class="btn btn-outline hover-lift" @click="showContact = true">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
            style="flex-shrink:0;margin-right:0.6rem">
            <rect width="20" height="16" x="2" y="4" rx="2" />
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
          </svg>
          Fale comigo
        </button>
      </div>
    </div>
    <div class="header__right">
      <div class="header__image">
        <img
          src="/assets/guilherme-image.jpeg"
          alt="Guilherme Sousa"
          class="guilherme hero-image-animate"
        />
        <img
          src="/assets/abstract.svg"
          alt="Background Abstract"
          class="background"
        />
      </div>
    </div>
  </header>

  <ContactModal v-model="showContact" />
</template>

<script setup>
import { ref } from 'vue'
import ContactModal from './ContactModal.vue'

const showContact = ref(false)
</script>

<style scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 4rem;
  scroll-margin-top: 20rem;
}

header .header__left {
  max-width: 62rem;
  flex: 1;
}

header .header__left p {
  max-width: 54rem;
  margin-top: 1.6rem;
  margin-bottom: 2.4rem;
}

header .header__left .header__cta {
  display: flex;
  flex-wrap: wrap;
  gap: 1.2rem;
  margin-top: 0.6rem;
}

header .header__right .header__image {
  position: relative;
  line-height: 0;
}

header .header__right .header__image:after {
  content: "";
  display: block;
  width: 100%;
  height: 100%;
  border: 1px solid var(--border);
  position: absolute;
  top: -1.2rem;
  right: -1.2rem;
  border-radius: 1.6rem;
  z-index: -1;
}

header .header__right .header__image .guilherme {
  border-radius: 1.6rem;
  width: 30rem;
  max-width: 100%;
  max-height: 38rem;
  object-fit: cover;
  display: block;
}

header .header__right .header__image .background {
  position: absolute;
  top: -4rem;
  right: -2.5rem;
  z-index: -1;
  opacity: 0.9;
}

@media only screen and (max-width: 768px) {
  header {
    flex-direction: column-reverse;
    text-align: center;
  }

  header .header__left {
    margin: 2rem auto 4rem;
  }

  header .header__left .header__cta {
    flex-direction: column;
  }

  header .header__left .header__cta .btn {
    justify-content: center;
    width: 100%;
  }

  header .header__right .header__image .guilherme {
    width: 24rem;
    max-height: 28rem;
    margin: 0 auto;
  }

  header .header__right .header__image:after {
    top: -0.8rem;
    right: -0.8rem;
  }
}
</style>
