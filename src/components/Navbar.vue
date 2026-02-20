<template>
  <div class="navbar-wrapper">
    <nav class="navbar" :class="{ active: scrolled }">
      <div class="navbar__content max-width mb-0">
        <ul class="navbar__links">
          <li><a href="#header">Início</a></li>
          <li><a href="#about">Sobre</a></li>
          <li><a href="#skills">Habilidades</a></li>
          <li><a href="#projects">Projetos</a></li>
          <li><a href="#footer">Contato</a></li>
        </ul>
        <div class="navbar__actions">
          <ThemeToggle />
          <button
            class="hamburger"
            :class="{ active: sidebarOpen }"
            aria-label="Abrir menu"
            @click="toggleSidebar"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </nav>

    <!-- Overlay -->
    <div
      class="sidebar-overlay"
      :class="{ active: sidebarOpen }"
      @click="closeSidebar"
    ></div>

    <!-- Mobile Menu Liquid Glass -->
    <ul class="mobile__links" :class="{ active: sidebarOpen }">
      <li><a href="#header" @click="closeSidebar">Início</a></li>
      <li><a href="#about" @click="closeSidebar">Sobre</a></li>
      <li><a href="#skills" @click="closeSidebar">Habilidades</a></li>
      <li><a href="#projects" @click="closeSidebar">Projetos</a></li>
      <li><a href="#footer" @click="closeSidebar">Contato</a></li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import ThemeToggle from './ThemeToggle.vue'

const scrolled = ref(false)
const sidebarOpen = ref(false)

function toggleSidebar() {
  sidebarOpen.value = !sidebarOpen.value
  document.body.style.overflow = sidebarOpen.value ? 'hidden' : ''
}

function closeSidebar() {
  sidebarOpen.value = false
  document.body.style.overflow = ''
}

function onScroll() {
  scrolled.value = window.pageYOffset > 0
}

onMounted(() => {
  window.addEventListener('scroll', onScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>

<style>
/* Navbar — estilos não-scoped pra garantir que overlay e mobile menu funcionem */

.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: var(--nav-h);
  z-index: 10;
  background: var(--bg);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--border);
  transition: background 0.3s ease, border-color 0.3s ease, color 0.3s ease;
  animation: slideDown 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.navbar .navbar__content {
  height: var(--nav-h);
  padding: 0 4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.navbar .navbar__content .navbar__links {
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.navbar .navbar__content .navbar__links a {
  padding: 0.9rem 1.2rem;
  display: inline-block;
  border-radius: 1rem;
  transition: 0.2s ease;
  font-size: 1.5rem;
  font-weight: 500;
}

.navbar .navbar__content .navbar__links a:hover {
  background: var(--accent-weak);
  color: var(--accent);
}

.navbar.active {
  box-shadow: 0 0.8rem 2.4rem rgba(0, 0, 0, 0.08);
}

/* === Ações (toggle + hambúrguer) === */
.navbar__actions {
  position: absolute;
  right: 4rem;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  gap: 0.8rem;
}

/* === Hambúrguer Animado === */
.hamburger {
  display: none;
  width: 4.2rem;
  height: 4.2rem;
  border-radius: 1.2rem;
  border: 1px solid var(--border);
  background: var(--surface);
  cursor: pointer;
  position: relative;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: background 0.25s ease, border-color 0.25s ease;
}

.hamburger:hover {
  background: var(--accent-weak);
}

.hamburger span {
  display: block;
  width: 1.8rem;
  height: 0.2rem;
  background: var(--text);
  border-radius: 0.1rem;
  transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1),
              opacity 0.25s ease,
              width 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}

.hamburger.active span:nth-child(1) {
  transform: translateY(0.7rem) rotate(45deg);
}

.hamburger.active span:nth-child(2) {
  opacity: 0;
  width: 0;
}

.hamburger.active span:nth-child(3) {
  transform: translateY(-0.7rem) rotate(-45deg);
}

/* === Mobile Menu — Liquid Glass Modal === */
.mobile__links {
  display: none;
}

.sidebar-overlay {
  display: none;
}

@media only screen and (max-width: 768px) {
  .navbar .navbar__content {
    padding: 0 2rem;
    justify-content: flex-end;
  }

  .navbar .navbar__content .navbar__links {
    display: none;
  }

  .navbar__actions {
    position: static;
    transform: none;
  }

  .hamburger {
    display: flex;
  }

  /* Overlay */
  .sidebar-overlay {
    display: block;
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.4);
    z-index: 99;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.35s ease, visibility 0.35s ease;
    -webkit-backdrop-filter: blur(4px);
    backdrop-filter: blur(4px);
  }

  .sidebar-overlay.active {
    opacity: 1;
    visibility: visible;
  }

  /* Modal Liquid Glass — centralizado */
  .mobile__links {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(0.85);
    width: calc(100vw - 4rem);
    max-width: 36rem;
    z-index: 100;

    /* Liquid Glass */
    background: rgba(255, 255, 255, 0.08);
    -webkit-backdrop-filter: blur(40px) saturate(1.4);
    backdrop-filter: blur(40px) saturate(1.4);
    border: 1px solid rgba(255, 255, 255, 0.18);
    border-radius: 2.4rem;
    box-shadow:
      0 8px 32px rgba(0, 0, 0, 0.24),
      0 0 0 1px rgba(255, 255, 255, 0.06),
      inset 0 1px 0 rgba(255, 255, 255, 0.12);

    padding: 3.2rem 2rem;
    gap: 0.4rem;

    /* animate */
    opacity: 0;
    visibility: hidden;
    transition:
      opacity 0.35s cubic-bezier(0.16, 1, 0.3, 1),
      visibility 0.35s ease,
      transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .mobile__links::before {
    content: "";
    position: absolute;
    top: 0;
    left: 2rem;
    right: 2rem;
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.35),
      transparent
    );
    border-radius: 1px;
  }

  .mobile__links.active {
    opacity: 1;
    visibility: visible;
    transform: translate(-50%, -50%) scale(1);
  }

  .mobile__links li {
    width: 100%;
    opacity: 0;
    transform: translateY(1rem);
    transition: opacity 0.3s ease, transform 0.3s ease;
  }

  .mobile__links.active li {
    opacity: 1;
    transform: translateY(0);
  }

  .mobile__links.active li:nth-child(1) { transition-delay: 0.06s; }
  .mobile__links.active li:nth-child(2) { transition-delay: 0.10s; }
  .mobile__links.active li:nth-child(3) { transition-delay: 0.14s; }
  .mobile__links.active li:nth-child(4) { transition-delay: 0.18s; }
  .mobile__links.active li:nth-child(5) { transition-delay: 0.22s; }

  .mobile__links li a {
    padding: 1.4rem 2rem;
    display: block;
    border-radius: 1.4rem;
    transition: background 0.2s ease, color 0.2s ease;
    font-weight: 600;
    font-size: 1.8rem;
    color: var(--text);
    text-align: center;
  }

  .mobile__links li a:hover {
    background: rgba(255, 255, 255, 0.12);
    color: var(--accent);
  }

  /* Light theme glass adjustments */
  html[data-theme="light"] .mobile__links {
    background: rgba(255, 255, 255, 0.55);
    border-color: rgba(255, 255, 255, 0.6);
    box-shadow:
      0 8px 32px rgba(0, 0, 0, 0.10),
      0 0 0 1px rgba(0, 0, 0, 0.04),
      inset 0 1px 0 rgba(255, 255, 255, 0.5);
  }

  html[data-theme="light"] .mobile__links::before {
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.8),
      transparent
    );
  }

  html[data-theme="light"] .mobile__links li a:hover {
    background: rgba(0, 0, 0, 0.06);
  }
}
</style>
