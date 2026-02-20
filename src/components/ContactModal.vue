<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="modelValue" class="modal-overlay" @click.self="close" @keydown.esc="close">
        <div class="modal-container" role="dialog" aria-modal="true" aria-labelledby="contact-title">
          <!-- Header -->
          <div class="modal-header">
            <h2 id="contact-title" class="modal-title">Fale comigo</h2>
            <button class="modal-close" @click="close" aria-label="Fechar modal">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          <!-- Formulário -->
          <form v-if="status === 'idle' || status === 'error'" @submit.prevent="handleSubmit" class="modal-form" novalidate>
            <div class="form-group">
              <label for="contact-name">Nome completo <span class="required">*</span></label>
              <input
                id="contact-name"
                v-model="form.name"
                type="text"
                placeholder="Seu nome completo"
                required
                :class="{ 'input-error': errors.name }"
                @input="errors.name = ''"
              />
              <span v-if="errors.name" class="error-msg">{{ errors.name }}</span>
            </div>

            <div class="form-group">
              <label for="contact-email">E-mail <span class="required">*</span></label>
              <input
                id="contact-email"
                v-model="form.email"
                type="email"
                placeholder="seu@email.com"
                required
                :class="{ 'input-error': errors.email }"
                @input="errors.email = ''"
              />
              <span v-if="errors.email" class="error-msg">{{ errors.email }}</span>
            </div>

            <div class="form-group">
              <label for="contact-phone">Celular / WhatsApp <span class="required">*</span></label>
              <input
                id="contact-phone"
                :value="form.phone"
                type="tel"
                placeholder="(62) 99999-9999"
                maxlength="15"
                required
                :class="{ 'input-error': errors.phone }"
                @input="formatPhone"
              />
              <span v-if="errors.phone" class="error-msg">{{ errors.phone }}</span>
            </div>

            <div class="form-group">
              <label for="contact-company">Empresa</label>
              <input
                id="contact-company"
                v-model="form.company"
                type="text"
                placeholder="Nome da empresa (opcional)"
              />
            </div>

            <div class="form-group">
              <label for="contact-message">Mensagem / Solicitação</label>
              <textarea
                id="contact-message"
                v-model="form.message"
                placeholder="Descreva brevemente o que precisa (opcional)"
                rows="4"
              ></textarea>
            </div>

            <span v-if="status === 'error'" class="error-msg error-global">
              Ops, algo deu errado. Tente novamente ou envie direto para guilhermetxt53@gmail.com
            </span>

            <button type="submit" class="btn btn-primary btn-submit" :disabled="submitting">
              <svg v-if="submitting" class="spinner" xmlns="http://www.w3.org/2000/svg" width="18" height="18"
                viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <circle cx="12" cy="12" r="10" stroke-dasharray="31.4 31.4" stroke-linecap="round" />
              </svg>
              <span v-else>Enviar</span>
            </button>
          </form>

          <!-- Sucesso -->
          <div v-if="status === 'success'" class="success-state">
            <div class="success-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </div>
            <h3>Mensagem enviada!</h3>
            <p>Obrigado pelo contato. Retornarei o mais breve possível.</p>
            <button type="button" class="btn btn-outline btn-close-success" @click="close">Fechar</button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, reactive, watch, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  modelValue: { type: Boolean, default: false }
})

const emit = defineEmits(['update:modelValue'])

const form = reactive({
  name: '',
  email: '',
  phone: '',
  company: '',
  message: ''
})

const errors = reactive({
  name: '',
  email: '',
  phone: ''
})

const status = ref('idle') // idle | error | success
const submitting = ref(false)
let autoCloseTimer = null

function close() {
  emit('update:modelValue', false)
}

function resetForm() {
  form.name = ''
  form.email = ''
  form.phone = ''
  form.company = ''
  form.message = ''
  errors.name = ''
  errors.email = ''
  errors.phone = ''
  status.value = 'idle'
  submitting.value = false
  if (autoCloseTimer) {
    clearTimeout(autoCloseTimer)
    autoCloseTimer = null
  }
}

function formatPhone(e) {
  errors.phone = ''
  // Extrai só os dígitos
  let digits = e.target.value.replace(/\D/g, '')
  // Limita a 11 dígitos (DDD + 9 dígitos)
  if (digits.length > 11) digits = digits.slice(0, 11)

  let formatted = ''
  if (digits.length > 0) formatted += '(' + digits.slice(0, 2)
  if (digits.length >= 2) formatted += ') '
  if (digits.length > 2 && digits.length <= 7) {
    formatted += digits.slice(2)
  } else if (digits.length > 7) {
    formatted += digits.slice(2, 7) + '-' + digits.slice(7)
  }

  form.phone = formatted
  // Garante que o input reflete o valor formatado
  e.target.value = formatted
}

function validate() {
  let valid = true

  if (!form.name.trim()) {
    errors.name = 'Nome é obrigatório'
    valid = false
  }

  if (!form.email.trim()) {
    errors.email = 'E-mail é obrigatório'
    valid = false
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
    errors.email = 'E-mail inválido'
    valid = false
  }

  const phoneDigits = form.phone.replace(/\D/g, '')
  if (!phoneDigits) {
    errors.phone = 'Celular é obrigatório'
    valid = false
  } else if (phoneDigits.length < 10) {
    errors.phone = 'Número incompleto'
    valid = false
  }

  return valid
}

async function handleSubmit() {
  if (!validate()) return

  submitting.value = true
  status.value = 'idle'

  const payload = new FormData()
  payload.append('Nome Completo', form.name.trim())
  payload.append('E-mail', form.email.trim())
  payload.append('Celular/WhatsApp', form.phone.trim())
  if (form.company.trim()) payload.append('Empresa', form.company.trim())
  if (form.message.trim()) payload.append('Mensagem', form.message.trim())

  // Campos de configuração do FormSubmit
  payload.append('_subject', `Novo contato pelo portfólio — ${form.name.trim()}`)
  payload.append('_captcha', 'true')
  payload.append('_template', 'table')

  try {
    const res = await fetch('https://formsubmit.co/ajax/guilhermetxt53@gmail.com', {
      method: 'POST',
      body: payload,
      headers: { 'Accept': 'application/json' }
    })

    if (res.ok) {
      status.value = 'success'
      autoCloseTimer = setTimeout(() => {
        close()
      }, 25000)
    } else {
      status.value = 'error'
    }
  } catch {
    status.value = 'error'
  } finally {
    submitting.value = false
  }
}

// Reset ao fechar
watch(() => props.modelValue, (val) => {
  if (!val) {
    setTimeout(resetForm, 300) // espera animação de saída
  }
})

// Fechar com Esc
function handleKeydown(e) {
  if (e.key === 'Escape' && props.modelValue) close()
}

onMounted(() => document.addEventListener('keydown', handleKeydown))
onUnmounted(() => document.removeEventListener('keydown', handleKeydown))
</script>

<style scoped>
/* ---- Overlay ---- */
.modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 10000;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.55);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  padding: 2rem;
}

/* ---- Container ---- */
.modal-container {
  width: 100%;
  max-width: 48rem;
  max-height: 90vh;
  overflow-y: auto;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 1.6rem;
  padding: 3.2rem;
  box-shadow:
    0 2.4rem 6rem rgba(0, 0, 0, 0.3),
    0 0 0 1px rgba(255, 255, 255, 0.04);

  /* Scrollbar interna */
  scrollbar-width: thin;
  scrollbar-color: rgba(148, 163, 184, 0.2) transparent;
}

.modal-container::-webkit-scrollbar { width: 4px; }
.modal-container::-webkit-scrollbar-track { background: transparent; }
.modal-container::-webkit-scrollbar-thumb {
  background: rgba(148, 163, 184, 0.2);
  border-radius: 2px;
}

/* ---- Header ---- */
.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2.4rem;
}

.modal-title {
  font-size: 2.2rem;
  font-weight: 750;
  color: var(--title);
  background: linear-gradient(135deg, var(--title) 40%, var(--accent));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.modal-close {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3.6rem;
  height: 3.6rem;
  border: 1px solid var(--border);
  border-radius: 1rem;
  background: var(--surface-2);
  color: var(--muted);
  cursor: pointer;
  transition: 0.18s ease;
}

.modal-close:hover {
  background: var(--accent-weak);
  color: var(--accent);
  transform: scale(1.05);
}

/* ---- Form ---- */
.modal-form {
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.form-group label {
  font-size: 1.3rem;
  font-weight: 600;
  color: var(--muted);
  letter-spacing: 0.02em;
}

.required {
  color: var(--accent);
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 1.2rem 1.4rem;
  font-size: 1.5rem;
  font-family: var(--font-family);
  color: var(--text);
  background: var(--surface-2);
  border: 1px solid var(--border);
  border-radius: 1rem;
  outline: none;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.form-group input::placeholder,
.form-group textarea::placeholder {
  color: var(--muted-2);
}

.form-group input:focus,
.form-group textarea:focus {
  border-color: var(--accent);
  box-shadow: 0 0 0 3px var(--accent-weak);
}

.form-group textarea {
  resize: vertical;
  min-height: 8rem;
}

/* ---- Input com erro ---- */
.input-error {
  border-color: #ef4444 !important;
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.15) !important;
}

.error-msg {
  font-size: 1.2rem;
  color: #ef4444;
  font-weight: 500;
}

.error-global {
  text-align: center;
  margin-bottom: 0.4rem;
}

/* ---- Submit ---- */
.btn-submit {
  width: 100%;
  padding: 1.4rem;
  font-size: 1.5rem;
  margin-top: 0.4rem;
  justify-content: center;
  gap: 0.8rem;
  animation: none !important;
}

.btn-submit:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

/* ---- Spinner ---- */
.spinner {
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* ---- Sucesso ---- */
.success-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.2rem;
  padding: 2rem 0;
  text-align: center;
}

.success-icon {
  color: #22c55e;
  animation: successPop 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

.success-state h3 {
  font-size: 2rem;
  font-weight: 700;
  color: var(--title);
}

.success-state p {
  font-size: 1.5rem;
  color: var(--muted);
  max-width: 30rem;
}

@keyframes successPop {
  0% { transform: scale(0); opacity: 0; }
  60% { transform: scale(1.15); }
  100% { transform: scale(1); opacity: 1; }
}

/* ---- Transições do Modal ---- */
.modal-enter-active {
  transition: opacity 0.3s ease;
}

.modal-enter-active .modal-container {
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease;
}

.modal-leave-active {
  transition: opacity 0.2s ease;
}

.modal-leave-active .modal-container {
  transition: transform 0.2s ease, opacity 0.2s ease;
}

.modal-enter-from {
  opacity: 0;
}

.modal-enter-from .modal-container {
  opacity: 0;
  transform: scale(0.92) translateY(1.6rem);
}

.modal-leave-to {
  opacity: 0;
}

.modal-leave-to .modal-container {
  opacity: 0;
  transform: scale(0.95) translateY(0.8rem);
}

/* ---- Sucesso - Botão Fechar ---- */
.btn-close-success {
  margin-top: 0.8rem;
  padding: 1rem 3.2rem;
  font-size: 1.4rem;
}

/* ---- Responsivo ---- */
@media (max-width: 768px) {
  .modal-overlay {
    padding: 1.6rem;
  }

  .modal-container {
    max-width: 100%;
    max-height: 88vh;
    padding: 2.4rem 2rem;
  }
}
</style>
