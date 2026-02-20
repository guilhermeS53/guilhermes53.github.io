<template>
  <Navbar />
  <HeroSection />
  <SectionDivider />
  <AboutSection />
  <SectionDivider />
  <SkillsSection />
  <ProjectsSection />
  <FooterSection />
</template>

<script setup>
import { onMounted } from 'vue'
import { useTheme } from './composables/useTheme'
import { useScrollReveal } from './composables/useScrollReveal'

import Navbar from './components/Navbar.vue'
import HeroSection from './components/HeroSection.vue'
import SectionDivider from './components/SectionDivider.vue'
import AboutSection from './components/AboutSection.vue'
import SkillsSection from './components/SkillsSection.vue'
import ProjectsSection from './components/ProjectsSection.vue'
import FooterSection from './components/FooterSection.vue'

const { initTheme } = useTheme()
useScrollReveal()

onMounted(() => {
  initTheme()

  // Proteção de imagens
  document.querySelectorAll('img').forEach(img => {
    img.addEventListener('contextmenu', e => e.preventDefault())
    img.addEventListener('dragstart', e => e.preventDefault())
  })
})
</script>
