<template>
  <section id="about" class="about max-width reveal">
    <div class="about__left">
      <h2 class="secondary-title reveal-left reveal-delay-1">Quem sou eu?</h2>
      <p>
        Que tal me seguir nas redes sociais e saber mais sobre o meu trabalho?
      </p>
      <SocialLinks />
    </div>
    <div class="about__right reveal-right reveal-delay-2">
      <p>
        Bacharel em Engenharia de Computação pelo Instituto Federal Goiano e um
        profissional apaixonado por tecnologia e soluções inovadoras e criativas.<br />
        <b>Desenvolvedor Fullstack</b> fascinado por soluções criativas e
        resolução de problemas distintos.
      </p>
      <p>
        Com 1 ano de experiência prática com o Desenvolvimento Fullstack, tenho
        atuado com diversas tecnologias, recursos e plataformas para criar
        soluções robustas, concretas e escaláveis que atendam às necessidades
        do mercado.
      </p>
      <p>
        Eu amo o desafio de encontrar soluções inovadoras e criativas para
        problemas complexos e estou sempre buscando aprender e crescer
        profissionalmente.
      </p>
    </div>
  </section>
</template>

<script setup>
import SocialLinks from './SocialLinks.vue'
</script>

<style scoped>
.about {
  display: flex;
  justify-content: space-between;
  gap: 4rem;
  scroll-margin-top: 20rem;
}

.about .about__left {
  max-width: 40rem;
  flex: 1;
  text-align: center;
}

.about .about__left p {
  margin: 1rem 0 2rem;
}

.about .about__right {
  flex: 1;
  max-width: 66rem;
}

@media only screen and (max-width: 768px) {
  .about {
    flex-direction: column;
    text-align: center;
  }

  .about .about__left {
    max-width: 66rem;
    text-align: center;
  }

  .about .about__right {
    text-align: center;
  }
}
</style>
