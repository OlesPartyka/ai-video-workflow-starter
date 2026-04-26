<script setup lang="ts">
defineProps<{
  workflow: string
  aspectRatio: string
  duration: string
  prompt: string
}>()

const rows = [
  { key: 'workflow',    label: 'Workflow',     icon: '⚡' },
  { key: 'aspectRatio', label: 'Aspect Ratio', icon: '📐' },
  { key: 'duration',    label: 'Duration',     icon: '⏱️' },
  { key: 'prompt',      label: 'Prompt',       icon: '✏️' },
] as const
</script>

<template>
  <div class="summary-panel">
    <h2 class="summary-panel__title">Summary</h2>

    <dl class="summary-panel__list">
      <div
        v-for="row in rows"
        :key="row.key"
        class="summary-panel__row"
      >
        <dt class="summary-panel__label">
          <span class="summary-panel__icon">{{ row.icon }}</span>
          {{ row.label }}
        </dt>
        <dd
          class="summary-panel__value"
          :class="{ 'summary-panel__value--empty': $props[row.key] === '—' }"
        >
          {{ $props[row.key] }}
        </dd>
      </div>
    </dl>
  </div>
</template>

<style scoped>
.summary-panel {
  background: var(--color-surface-alt);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: var(--space-lg);
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}

.summary-panel__title {
  font-size: var(--fs-sm);
  font-weight: 600;
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  margin: 0;
}

.summary-panel__list {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

.summary-panel__row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: var(--space-md);
}

.summary-panel__label {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  font-size: var(--fs-sm);
  color: var(--color-text-muted);
  white-space: nowrap;
}

.summary-panel__icon {
  font-size: var(--fs-base);
  line-height: 1;
}

.summary-panel__value {
  font-size: var(--fs-sm);
  font-weight: 500;
  color: var(--color-text);
  text-align: right;
  word-break: break-word;
  max-width: 60%;
}

.summary-panel__value--empty {
  color: var(--color-text-muted);
  opacity: 0.5;
}
</style>
