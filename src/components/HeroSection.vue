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
        <a href="https://wa.me/5562996881509" target="_blank" class="btn btn-outline hover-lift">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style="flex-shrink:0;margin-right:0.6rem">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          Fale comigo
        </a>
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
</template>

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
