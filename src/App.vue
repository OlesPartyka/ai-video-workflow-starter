<script setup lang="ts">
import OptionSelector from './components/OptionSelector.vue'
import PromptInput from './components/PromptInput.vue'
import SummaryPanel from './components/SummaryPanel.vue'
import StatusBanner from './components/StatusBanner.vue'
import {
  useWorkflowForm,
  WORKFLOW_OPTIONS,
  ASPECT_RATIO_OPTIONS,
  DURATION_OPTIONS,
} from './composables/useWorkflowForm'

const {
  workflow,
  aspectRatio,
  duration,
  prompt,
  status,
  errorMessage,
  isValid,
  canSubmit,
  summary,
  submit,
  reset,
  clearStatus,
} = useWorkflowForm()

function handleRetry() {
  clearStatus()
  submit()
}
</script>

<template>
  <main class="app-shell">
    <header class="app-header">
      <div class="app-header__badge">AI</div>
      <div>
        <h1 class="app-header__title">Video Workflow Starter</h1>
        <p class="app-header__subtitle">Configure and launch your AI-powered video generation.</p>
      </div>
    </header>

    <template v-if="status === 'idle' || status === 'loading'">
      <section class="card" style="animation-delay: 0.05s">
        <OptionSelector
          id="selector-workflow"
          label="Workflow"
          :options="WORKFLOW_OPTIONS"
          v-model="workflow"
        />
      </section>

      <section class="card" style="animation-delay: 0.1s">
        <OptionSelector
          id="selector-aspect-ratio"
          label="Aspect Ratio"
          :options="ASPECT_RATIO_OPTIONS"
          v-model="aspectRatio"
        />
      </section>

      <section class="card" style="animation-delay: 0.15s">
        <OptionSelector
          id="selector-duration"
          label="Duration"
          :options="DURATION_OPTIONS"
          v-model="duration"
        />
      </section>

      <section class="card" style="animation-delay: 0.2s">
        <PromptInput
          v-model="prompt"
          :disabled="status === 'loading'"
        />
      </section>

      <Transition name="slide-fade">
        <section v-if="isValid" class="card card--summary" style="animation-delay: 0.25s">
          <SummaryPanel
            :workflow="summary.workflow"
            :aspect-ratio="summary.aspectRatio"
            :duration="summary.duration"
            :prompt="summary.prompt"
          />
        </section>
      </Transition>

      <button
        id="btn-start-generation"
        type="button"
        class="btn-primary"
        :class="{ 'btn-primary--loading': status === 'loading' }"
        :disabled="!canSubmit"
        @click="submit"
      >
        <span v-if="status === 'loading'" class="btn-primary__spinner" aria-hidden="true" />
        {{ status === 'loading' ? 'Generating…' : 'Start generation' }}
      </button>
    </template>

    <StatusBanner
      v-if="status !== 'idle'"
      :status="status"
      :error-message="errorMessage"
      @retry="handleRetry"
      @reset="reset"
    />
  </main>
</template>

<style scoped>
.app-shell {
  width: 100%;
  max-width: 560px;
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);
  padding-bottom: var(--space-2xl);
}

.app-header {
  display: flex;
  align-items: center;
  gap: var(--space-md);
  padding-bottom: var(--space-sm);
  animation: fadeInUp 0.4s var(--ease) both;
}

.app-header__badge {
  width: 44px;
  height: 44px;
  border-radius: var(--radius-md);
  background: linear-gradient(135deg, var(--color-primary), #a855f7);
  display: grid;
  place-items: center;
  font-weight: 700;
  font-size: var(--fs-lg);
  color: #fff;
  flex-shrink: 0;
  box-shadow: var(--shadow-glow);
}

.app-header__title {
  font-size: var(--fs-xl);
  font-weight: 700;
  line-height: var(--lh-tight);
  margin: 0;
}

.app-header__subtitle {
  font-size: var(--fs-sm);
  color: var(--color-text-muted);
  margin: 0;
}

.card {
  animation: fadeInUp 0.4s var(--ease) both;
}

.btn-primary {
  appearance: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-xs);
  width: 100%;
  border: none;
  background: linear-gradient(135deg, var(--color-primary), #7c3aed);
  color: #fff;
  font-family: var(--font-family);
  font-size: var(--fs-base);
  font-weight: 600;
  padding: var(--space-md) var(--space-xl);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition:
    opacity var(--duration) var(--ease),
    transform var(--duration) var(--ease),
    box-shadow var(--duration) var(--ease);
  animation: fadeInUp 0.4s var(--ease) 0.3s both;
}

.btn-primary:not(:disabled):hover {
  box-shadow: var(--shadow-glow), 0 4px 20px rgba(124, 58, 237, 0.3);
  transform: translateY(-1px);
}

.btn-primary:not(:disabled):active {
  transform: translateY(0);
}

.btn-primary:disabled {
  opacity: 0.35;
  cursor: not-allowed;
}

.btn-primary--loading {
  pointer-events: none;
  opacity: 0.8;
}

.btn-primary__spinner {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255,255,255,.3);
  border-top-color: #fff;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
}

.slide-fade-enter-active {
  transition: all 0.35s var(--ease);
}
.slide-fade-leave-active {
  transition: all 0.2s var(--ease);
}
.slide-fade-enter-from {
  opacity: 0;
  transform: translateY(12px);
}
.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
