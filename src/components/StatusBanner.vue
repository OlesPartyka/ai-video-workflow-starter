<script setup lang="ts">
import type { SubmitStatus } from '../composables/useWorkflowForm'

defineProps<{
  status: SubmitStatus
  errorMessage?: string
}>()

defineEmits<{
  (e: 'retry'): void
  (e: 'reset'): void
}>()
</script>

<template>
  <Transition name="fade" mode="out-in">
    <div v-if="status === 'loading'" key="loading" class="status-banner status-banner--loading">
      <div class="status-banner__spinner" aria-hidden="true" />
      <div class="status-banner__body">
        <p class="status-banner__title">Generating your video…</p>
        <p class="status-banner__subtitle">This may take a moment.</p>
      </div>
    </div>

    <div v-else-if="status === 'success'" key="success" class="status-banner status-banner--success">
      <span class="status-banner__icon" aria-hidden="true">✓</span>
      <div class="status-banner__body">
        <p class="status-banner__title">Generation started successfully!</p>
        <p class="status-banner__subtitle">Your video is being processed. You'll be notified when it's ready.</p>
      </div>
      <button type="button" class="status-banner__action" @click="$emit('reset')">
        Start new
      </button>
    </div>

    <div v-else-if="status === 'error'" key="error" class="status-banner status-banner--error">
      <span class="status-banner__icon" aria-hidden="true">✕</span>
      <div class="status-banner__body">
        <p class="status-banner__title">Generation failed</p>
        <p class="status-banner__subtitle">{{ errorMessage || 'An unknown error occurred.' }}</p>
      </div>
      <div class="status-banner__actions">
        <button type="button" class="status-banner__action status-banner__action--primary" @click="$emit('retry')">
          Retry
        </button>
        <button type="button" class="status-banner__action" @click="$emit('reset')">
          Start new
        </button>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.status-banner {
  display: flex;
  align-items: flex-start;
  gap: var(--space-md);
  padding: var(--space-lg);
  border-radius: var(--radius-md);
  border: 1px solid;
  animation: fadeInUp 0.35s var(--ease) both;
}

.status-banner--loading {
  border-color: var(--color-border);
  background: var(--color-surface-alt);
}

.status-banner--success {
  border-color: var(--color-success);
  background: var(--color-success-bg);
}

.status-banner--error {
  border-color: var(--color-error);
  background: var(--color-error-bg);
}

.status-banner__spinner {
  width: 24px;
  height: 24px;
  border: 3px solid var(--color-border);
  border-top-color: var(--color-primary);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  flex-shrink: 0;
  margin-top: 2px;
}

.status-banner__icon {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  font-weight: 700;
  font-size: var(--fs-sm);
  flex-shrink: 0;
}

.status-banner--success .status-banner__icon {
  background: var(--color-success);
  color: #fff;
}

.status-banner--error .status-banner__icon {
  background: var(--color-error);
  color: #fff;
}

.status-banner__body {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.status-banner__title {
  font-weight: 600;
  font-size: var(--fs-base);
}

.status-banner__subtitle {
  font-size: var(--fs-sm);
  color: var(--color-text-muted);
}

.status-banner__actions {
  display: flex;
  gap: var(--space-xs);
  flex-shrink: 0;
  align-self: center;
}

.status-banner__action {
  appearance: none;
  border: 1px solid var(--color-border);
  background: var(--color-surface);
  color: var(--color-text);
  font-family: var(--font-family);
  font-size: var(--fs-sm);
  font-weight: 500;
  padding: var(--space-xs) var(--space-md);
  border-radius: var(--radius-full);
  cursor: pointer;
  transition:
    background var(--duration) var(--ease),
    border-color var(--duration) var(--ease);
}

.status-banner__action:hover {
  background: var(--color-surface-alt);
  border-color: var(--color-text-muted);
}

.status-banner__action--primary {
  background: var(--color-primary);
  border-color: var(--color-primary);
  color: #fff;
}

.status-banner__action--primary:hover {
  background: var(--color-primary-hover);
  border-color: var(--color-primary-hover);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s var(--ease), transform 0.25s var(--ease);
}
.fade-enter-from {
  opacity: 0;
  transform: translateY(8px);
}
.fade-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
