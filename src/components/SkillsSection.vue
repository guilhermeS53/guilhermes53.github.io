<template>
  <section id="skills" class="skills reveal">
    <div class="skills__content max-width">
      <h2 class="tertiary-title">
        <b>Minha caixinha de recursos e conhecimentos</b>
      </h2>
      <p class="description">
        Descubra as habilidades e ferramentas que domino e que me permitem
        criar soluções criativas e funcionais para meus clientes.
      </p>
      <ul>
        <li
          v-for="(skill, index) in skills"
          :key="skill.title"
          class="skills__item hover-lift reveal"
          :class="`reveal-delay-${index + 1}`"
        >
          <div class="image-container">
            <img
              :src="skill.icon"
              :alt="skill.title"
              class="float-animate"
              :class="`float-animate-delay-${index + 1}`"
            />
          </div>
          <p>{{ skill.description }}</p>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup>
const skills = [
  {
    title: 'Desenvolvimento Web',
    icon: '/assets/notebook.png',
    description: 'Experiência em desenvolvimento fullstack com foco em tecnologias modernas.'
  },
  {
    title: 'Web Design',
    icon: '/assets/colors.png',
    description: 'Habilidade em criar layouts modernos e responsivos, com foco na experiência do usuário.'
  },
  {
    title: 'UX/UI Design',
    icon: '/assets/phone.png',
    description: 'Conhecimentos em design de interface e experiência do usuário visualmente atraentes e intuitivas.'
  },
  {
    title: 'Gerenciamento de versões',
    icon: '/assets/files.png',
    description: 'Experiência em ferramentas de gerenciamento de versão para controle de projetos.'
  }
]
</script>

<style scoped>
.skills {
  background: var(--surface-2);
  scroll-margin-top: 15rem;
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
  transition: background 0.3s ease, border-color 0.3s ease;
}

.skills .skills__content {
  padding: 6rem 4rem;
  text-align: center;
}

.skills .skills__content .description {
  max-width: 56rem;
  margin: 0 auto 6rem;
  color: var(--muted);
}

.skills .skills__content ul {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(25rem, 1fr));
  gap: 2rem;
}

.skills .skills__content ul li {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 1.6rem;
  padding: 3rem 2rem;
  transition: background 0.3s ease, border-color 0.3s ease, color 0.3s ease, transform 0.18s ease, box-shadow 0.18s ease;
}

.skills .skills__content ul li:hover {
  transform: translateY(-3px);
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.14);
}

.skills .skills__content ul li .image-container {
  background: var(--surface-2);
  padding: 2rem;
  border-radius: 50%;
  display: flex;
  width: 7rem;
  height: 7rem;
  justify-content: center;
  align-items: center;
  box-shadow: 0 0.4rem 1rem rgba(0, 0, 0, 0.1);
  margin: 0 auto;
}

.skills .skills__content ul li p {
  color: var(--muted);
}

.skills .skills__content ul li h3 {
  font-size: 1.6rem;
  font-weight: 500;
  margin: 2rem 0 1rem;
}
</style>
