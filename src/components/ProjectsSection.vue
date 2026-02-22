<template>
  <section id="projects" class="projects max-width reveal">
    <div class="projects__content">
      <h2 class="secondary-title">Meus Projetos em Destaque</h2>
      <p>
        De ideias abstratas a projetos bem-sucedidos, aqui estão alguns dos
        meus trabalhos mais recentes
      </p>
    </div>
    <ul>
      <li
        v-for="(project, index) in projects"
        :key="project.title"
        :class="[
          project.reversed ? 'projects__reversed-list' : '',
          'reveal',
          `reveal-delay-${index + 1}`
        ]"
      >
        <div class="image">
          <img :src="project.image" :alt="project.title" />
        </div>
        <div class="projects__info">
          <h3 class="tertiary-title" v-html="project.title"></h3>
          <p v-html="project.description"></p>
          <a
            :href="project.link"
            class="animated-link"
            @click.prevent="openPreview(project)"
            @click.middle.prevent
          >
            Confira
          </a>
        </div>
      </li>
    </ul>

    <ProjectPreviewModal
      v-model="showPreview"
      :project="selectedProject"
    />
  </section>
</template>

<script setup>
import { ref } from 'vue'
import ProjectPreviewModal from './ProjectPreviewModal.vue'

const showPreview = ref(false)
const selectedProject = ref(null)

function openPreview(project) {
  selectedProject.value = project
  showPreview.value = true
}

const projects = [
  {
    title: 'Desafio Smart Fit – <br>Reabertura das Unidades',
    description: 'Desafio de desenvolvimento de interface inspirado na Smart Fit, utilizando TypeScript, HTML e SCSS para construção de uma aplicação moderna, responsiva e com boas práticas de organização e componentização.',
    image: '/assets/smartfit-challenge.webp',
    link: 'https://desafio-smart-fit-eight.vercel.app/',
    reversed: false
  },
  {
    title: 'DevSorteio',
    description: 'DevSorteio é uma aplicação web desenvolvida para praticar e consolidar conceitos de JavaScript, com foco na lógica de geração de números aleatórios. <br>O projeto simula um sistema de sorteio real, aplicando manipulação de DOM e organização de código para entregar uma experiência simples e funcional.',
    image: '/assets/devsorteio.webp',
    link: 'https://dev-sorteador-indol.vercel.app',
    reversed: true
  },
  {
    title: 'Aplicação Web para Conversão de Moedas',
    description: 'Desenvolvimento de aplicação web com JavaScript puro para converter moedas. Além disso, foram utilizados conceitos de organização de código e componentização.',
    image: '/assets/currency-converter.png',
    link: 'https://currency-converter-bice-kappa.vercel.app',
    reversed: false
  }
]
</script>

<style scoped>
.projects {
  margin-bottom: 16rem;
  scroll-margin-top: 15rem;
  padding-top: 4rem;
}

.projects .projects__content {
  max-width: 56rem;
  text-align: center;
  margin: 0 auto 6rem;
}

.projects ul li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 4rem;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 1.6rem;
  padding: 2rem;
  transition: background 0.3s ease, border-color 0.3s ease, color 0.3s ease, transform 0.2s ease, box-shadow 0.2s ease;
}

.projects ul li:hover {
  transform: translateY(-4px);
  box-shadow: 0 1.8rem 4.5rem rgba(0, 0, 0, 0.10);
}

.projects ul li.projects__reversed-list {
  flex-direction: row-reverse;
}

.projects ul li:not(:last-of-type) {
  margin-bottom: 4rem;
}

.projects ul li .image img {
  width: 100%;
  min-width: 40rem;
  max-width: 47rem;
  height: auto;
  border-radius: 1.2rem;
  display: block;
}

.projects ul li .projects__info {
  max-width: 47rem;
}

.projects ul li .projects__info p {
  margin: 1rem 0 2rem;
}

/* Link estilizado como badge/botão */
.projects ul li .projects__info a {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.8rem 1.8rem;
  border-radius: 10rem;
  font-weight: 700;
  font-size: 1.4rem;
  color: var(--accent);
  background: var(--accent-weak);
  border: 1px solid color-mix(in srgb, var(--accent) 20%, transparent);
  text-decoration: none;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  position: relative;
  overflow: hidden;
  z-index: 1;
}

.projects ul li .projects__info a::before {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, var(--accent), color-mix(in srgb, var(--accent) 70%, #8b5cf6));
  opacity: 0;
  transition: opacity 0.25s ease;
  border-radius: inherit;
  z-index: -1;
}

.projects ul li .projects__info a:hover {
  color: #fff;
  border-color: transparent;
  transform: translateY(-2px);
  box-shadow: 0 0.8rem 2.4rem color-mix(in srgb, var(--accent) 30%, transparent);
  text-decoration: none;
}

.projects ul li .projects__info a:hover::before {
  opacity: 1;
}

.projects ul li .projects__info a span,
.projects ul li .projects__info a {
  position: relative;
  z-index: 1;
}

@media only screen and (max-width: 768px) {
  .projects ul li,
  .projects ul li.projects__reversed-list {
    flex-direction: column;
  }

  .projects ul li .projects__info {
    max-width: 66rem;
  }

  .projects ul li .image img {
    min-width: auto;
    max-width: 100%;
  }
}
</style>
