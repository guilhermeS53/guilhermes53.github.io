<template>
  <Teleport to="body">
    <Transition name="preview">
      <div v-if="modelValue" class="preview-overlay" @click.self="close">
        <div class="preview-container" role="dialog" aria-modal="true" :aria-label="`Preview: ${project?.title}`">
          <!-- Header -->
          <div class="preview-header">
            <h3 class="preview-title" v-html="project?.title"></h3>
            <div class="preview-actions">
              <a
                :href="project?.link"
                target="_blank"
                rel="noopener noreferrer"
                class="preview-btn preview-btn--external"
                title="Abrir em nova aba"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
                <span class="preview-btn__label">Nova aba</span>
              </a>
              <button class="preview-btn preview-btn--close" @click="close" aria-label="Fechar preview">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
          </div>

          <!-- Iframe area -->
          <div class="preview-body">
            <div v-if="loading" class="preview-loading">
              <svg class="preview-spinner" xmlns="http://www.w3.org/2000/svg" width="36" height="36"
                viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <circle cx="12" cy="12" r="10" stroke-dasharray="31.4 31.4" stroke-linecap="round" />
              </svg>
              <span>Carregando projeto...</span>
            </div>
            <iframe
              v-if="iframeSrc"
              :src="iframeSrc"
              :title="project?.title"
              class="preview-iframe"
              :class="{ 'preview-iframe--loaded': !loading }"
              @load="onIframeLoad"
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  modelValue: { type: Boolean, default: false },
  project: { type: Object, default: null }
})

const emit = defineEmits(['update:modelValue'])

const loading = ref(true)
const iframeSrc = ref('')

function close() {
  emit('update:modelValue', false)
}

function onIframeLoad() {
  loading.value = false
}

// Quando abre, carrega o iframe; quando fecha, limpa
watch(() => props.modelValue, (val) => {
  if (val && props.project?.link) {
    loading.value = true
    iframeSrc.value = props.project.link
    document.body.style.overflow = 'hidden'
  } else {
    // Espera animação de saída antes de limpar
    setTimeout(() => {
      iframeSrc.value = ''
      loading.value = true
    }, 300)
    document.body.style.overflow = ''
  }
})

// Fechar com Esc
function handleKeydown(e) {
  if (e.key === 'Escape' && props.modelValue) close()
}

onMounted(() => document.addEventListener('keydown', handleKeydown))
onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
  document.body.style.overflow = ''
})
</script>

<style scoped>
/* ---- Overlay ---- */
.preview-overlay {
  position: fixed;
  inset: 0;
  z-index: 10000;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  padding: 1.6rem;
}

/* ---- Container ---- */
.preview-container {
  width: 100%;
  max-width: 120rem;
  height: 90vh;
  display: flex;
  flex-direction: column;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 1.6rem;
  box-shadow:
    0 2.4rem 6rem rgba(0, 0, 0, 0.35),
    0 0 0 1px rgba(255, 255, 255, 0.04);
  overflow: hidden;
}

/* ---- Header ---- */
.preview-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.4rem 2rem;
  border-bottom: 1px solid var(--border);
  background: var(--surface-2);
  gap: 1.2rem;
  flex-shrink: 0;
}

.preview-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--title);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  min-width: 0;
}

.preview-actions {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  flex-shrink: 0;
}

/* ---- Botões do Header ---- */
.preview-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.7rem 1.2rem;
  border-radius: 0.8rem;
  font-size: 1.3rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.18s ease;
  text-decoration: none;
  border: 1px solid var(--border);
  background: var(--surface);
  color: var(--muted);
}

.preview-btn:hover {
  transform: translateY(-1px);
}

.preview-btn--external:hover {
  background: var(--accent-weak);
  color: var(--accent);
  border-color: color-mix(in srgb, var(--accent) 30%, transparent);
}

.preview-btn--close {
  width: 3.4rem;
  height: 3.4rem;
  padding: 0;
}

.preview-btn--close:hover {
  background: rgba(239, 68, 68, 0.1);
  color: #ef4444;
  border-color: rgba(239, 68, 68, 0.25);
}

.preview-btn__label {
  display: inline;
}

/* ---- Body / Iframe ---- */
.preview-body {
  flex: 1;
  position: relative;
  overflow: hidden;
  background: #ffffff;
}

.preview-iframe {
  width: 100%;
  height: 100%;
  border: none;
  opacity: 0;
  transition: opacity 0.4s ease;
}

.preview-iframe--loaded {
  opacity: 1;
}

/* ---- Loading ---- */
.preview-loading {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.2rem;
  color: var(--muted);
  font-size: 1.4rem;
  font-weight: 500;
  z-index: 2;
  background: var(--surface);
}

.preview-spinner {
  animation: previewSpin 0.8s linear infinite;
  color: var(--accent);
}

@keyframes previewSpin {
  to { transform: rotate(360deg); }
}

/* ---- Transições ---- */
.preview-enter-active {
  transition: opacity 0.3s ease;
}

.preview-enter-active .preview-container {
  transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease;
}

.preview-leave-active {
  transition: opacity 0.2s ease;
}

.preview-leave-active .preview-container {
  transition: transform 0.2s ease, opacity 0.2s ease;
}

.preview-enter-from {
  opacity: 0;
}

.preview-enter-from .preview-container {
  opacity: 0;
  transform: scale(0.9) translateY(2rem);
}

.preview-leave-to {
  opacity: 0;
}

.preview-leave-to .preview-container {
  opacity: 0;
  transform: scale(0.95) translateY(1rem);
}

/* ---- Responsivo ---- */
@media (max-width: 768px) {
  .preview-overlay {
    padding: 0;
  }

  .preview-container {
    max-width: 100%;
    height: 100vh;
    height: 100dvh;
    border-radius: 0;
  }

  .preview-header {
    padding: 1.2rem 1.4rem;
  }

  .preview-title {
    font-size: 1.3rem;
  }

  .preview-btn__label {
    display: none;
  }

  .preview-btn--external {
    width: 3.4rem;
    height: 3.4rem;
    padding: 0;
  }
}
</style>
