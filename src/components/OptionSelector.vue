<script setup lang="ts">
defineProps<{
  label: string
  options: string[]
  modelValue: string | null
  id: string
}>()

defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()
</script>

<template>
  <fieldset :id="id" class="option-selector">
    <legend class="option-selector__label">{{ label }}</legend>

    <div class="option-selector__group" role="radiogroup" :aria-label="label">
      <button
        v-for="option in options"
        :key="option"
        type="button"
        role="radio"
        :aria-checked="modelValue === option"
        class="option-selector__btn"
        :class="{ 'option-selector__btn--active': modelValue === option }"
        @click="$emit('update:modelValue', option)"
      >
        {{ option }}
      </button>
    </div>
  </fieldset>
</template>

<style scoped>
.option-selector {
  border: none;
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

.option-selector__label {
  font-size: var(--fs-sm);
  font-weight: 600;
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.option-selector__group {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-xs);
}

.option-selector__btn {
  appearance: none;
  border: 1px solid var(--color-border);
  background: var(--color-surface-alt);
  color: var(--color-text-muted);
  font-family: var(--font-family);
  font-size: var(--fs-sm);
  font-weight: 500;
  padding: var(--space-xs) var(--space-md);
  border-radius: var(--radius-full);
  cursor: pointer;
  transition:
    background var(--duration) var(--ease),
    color var(--duration) var(--ease),
    border-color var(--duration) var(--ease),
    box-shadow var(--duration) var(--ease);
}

.option-selector__btn:hover {
  border-color: var(--color-text-muted);
  color: var(--color-text);
}

.option-selector__btn--active {
  background: var(--color-primary);
  border-color: var(--color-primary);
  color: #fff;
  box-shadow: var(--shadow-glow);
}

.option-selector__btn--active:hover {
  background: var(--color-primary-hover);
  border-color: var(--color-primary-hover);
  color: #fff;
}
</style>
