<template>
  <button
    class="theme-toggle"
    aria-label="Alternar tema"
    @click="toggleTheme($event)"
  >
    <div class="toggle-icon">
      <div class="sun">
        <div class="sun-core"></div>
        <div class="sun-ray"></div>
        <div class="sun-ray"></div>
        <div class="sun-ray"></div>
        <div class="sun-ray"></div>
        <div class="sun-ray"></div>
        <div class="sun-ray"></div>
      </div>
      <div class="moon">
        <div class="moon-shadow"></div>
      </div>
    </div>
  </button>
</template>

<script setup>
import { useTheme } from '../composables/useTheme'

const { toggleTheme } = useTheme()
</script>

<style>
.theme-toggle {
  width: 4.2rem;
  height: 4.2rem;
  border-radius: 1.2rem;
  border: 1px solid var(--border);
  background: var(--surface);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.25s ease, border-color 0.25s ease, transform 0.25s ease;
  overflow: hidden;
}

.theme-toggle:hover {
  background: var(--accent-weak);
  transform: scale(1.05);
}

.toggle-icon {
  width: 2rem;
  height: 2rem;
  position: relative;
}

/* ---- SOL ---- */
.sun {
  position: absolute;
  inset: 0;
  transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1),
              opacity 0.4s ease;
}

.sun-core {
  position: absolute;
  width: 0.8rem;
  height: 0.8rem;
  background: var(--text);
  border-radius: 50%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1),
              background 0.3s ease;
}

.sun-ray {
  position: absolute;
  width: 0.2rem;
  height: 0.4rem;
  background: var(--text);
  border-radius: 0.1rem;
  top: 50%;
  left: 50%;
  transform-origin: center;
  transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1),
              opacity 0.4s ease;
}

.sun-ray:nth-child(2) { transform: translate(-50%, -50%) rotate(0deg) translateY(-0.8rem); }
.sun-ray:nth-child(3) { transform: translate(-50%, -50%) rotate(60deg) translateY(-0.8rem); }
.sun-ray:nth-child(4) { transform: translate(-50%, -50%) rotate(120deg) translateY(-0.8rem); }
.sun-ray:nth-child(5) { transform: translate(-50%, -50%) rotate(180deg) translateY(-0.8rem); }
.sun-ray:nth-child(6) { transform: translate(-50%, -50%) rotate(240deg) translateY(-0.8rem); }
.sun-ray:nth-child(7) { transform: translate(-50%, -50%) rotate(300deg) translateY(-0.8rem); }

/* ---- LUA ---- */
.moon {
  position: absolute;
  inset: 0;
  opacity: 0;
  transform: rotate(-90deg) scale(0.6);
  transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1),
              opacity 0.4s ease;
}

.moon::before {
  content: "";
  position: absolute;
  width: 1.4rem;
  height: 1.4rem;
  background: var(--text);
  border-radius: 50%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.moon-shadow {
  position: absolute;
  width: 1.1rem;
  height: 1.1rem;
  background: var(--surface);
  border-radius: 50%;
  top: 0.1rem;
  right: 0.15rem;
  transition: background 0.3s ease;
}

/* Estado: LIGHT = sol, DARK = lua */
html[data-theme="light"] .sun {
  transform: rotate(0deg) scale(1);
  opacity: 1;
}
html[data-theme="light"] .moon {
  opacity: 0;
  transform: rotate(90deg) scale(0.6);
}

html[data-theme="dark"] .sun {
  transform: rotate(90deg) scale(0.6);
  opacity: 0;
}
html[data-theme="dark"] .sun-ray {
  opacity: 0;
  transform: translate(-50%, -50%) scale(0);
}
html[data-theme="dark"] .moon {
  opacity: 1;
  transform: rotate(0deg) scale(1);
}
</style>
