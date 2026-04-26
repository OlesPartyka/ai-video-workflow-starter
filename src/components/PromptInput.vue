<script setup lang="ts">
defineProps<{
  modelValue: string
  disabled?: boolean
}>()

defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()
</script>

<template>
  <div class="prompt-input">
    <label for="prompt-textarea" class="prompt-input__label">Prompt / Description</label>
    <textarea
      id="prompt-textarea"
      class="prompt-input__textarea"
      :value="modelValue"
      :disabled="disabled"
      placeholder="Describe the video you want to generate…"
      rows="4"
      maxlength="2000"
      @input="$emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
    />
    <span class="prompt-input__counter">{{ modelValue.length }} / 2 000</span>
  </div>
</template>

<style scoped>
.prompt-input {
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
}

.prompt-input__label {
  font-size: var(--fs-sm);
  font-weight: 600;
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.prompt-input__textarea {
  appearance: none;
  border: 1px solid var(--color-border);
  background: var(--color-surface-alt);
  color: var(--color-text);
  font-family: var(--font-family);
  font-size: var(--fs-base);
  line-height: var(--lh-normal);
  padding: var(--space-sm) var(--space-md);
  border-radius: var(--radius-md);
  resize: vertical;
  min-height: 100px;
  transition: border-color var(--duration) var(--ease);
}

.prompt-input__textarea::placeholder {
  color: var(--color-text-muted);
  opacity: 0.6;
}

.prompt-input__textarea:focus {
  border-color: var(--color-border-focus);
  outline: none;
  box-shadow: 0 0 0 3px var(--color-primary-glow);
}

.prompt-input__textarea:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.prompt-input__counter {
  font-size: var(--fs-xs);
  color: var(--color-text-muted);
  text-align: right;
}
</style>
