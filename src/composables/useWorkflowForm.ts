import { ref, computed } from 'vue'

export type Workflow = 'Beat Sync' | 'UGC Video' | 'Generate Video'
export type AspectRatio = '9:16' | '16:9' | '1:1'
export type Duration = 'Short' | 'Medium' | 'Long'

export type SubmitStatus = 'idle' | 'loading' | 'success' | 'error'

export const WORKFLOW_OPTIONS: Workflow[] = ['Beat Sync', 'UGC Video', 'Generate Video']
export const ASPECT_RATIO_OPTIONS: AspectRatio[] = ['9:16', '16:9', '1:1']
export const DURATION_OPTIONS: Duration[] = ['Short', 'Medium', 'Long']

export function useWorkflowForm() {
  const workflow = ref<Workflow | null>(null)
  const aspectRatio = ref<AspectRatio | null>(null)
  const duration = ref<Duration | null>(null)
  const prompt = ref('')

  const status = ref<SubmitStatus>('idle')
  const errorMessage = ref('')

  const isValid = computed(() =>
    workflow.value !== null &&
    aspectRatio.value !== null &&
    duration.value !== null &&
    prompt.value.trim().length > 0
  )

  const summary = computed(() => ({
    workflow: workflow.value ?? '—',
    aspectRatio: aspectRatio.value ?? '—',
    duration: duration.value ?? '—',
    prompt: prompt.value.trim() || '—',
  }))

  const canSubmit = computed(() => isValid.value && status.value !== 'loading')

  function submit(): Promise<void> {
    status.value = 'loading'
    errorMessage.value = ''

    const delay = 1000 + Math.random() * 1000

    return new Promise<void>((resolve) => {
      setTimeout(() => {
        const isSuccess = Math.random() > 0.2

        if (isSuccess) {
          status.value = 'success'
        } else {
          status.value = 'error'
          errorMessage.value = 'Something went wrong. The generation server is temporarily unavailable. Please try again.'
        }
        resolve()
      }, delay)
    })
  }

  function reset() {
    workflow.value = null
    aspectRatio.value = null
    duration.value = null
    prompt.value = ''
    status.value = 'idle'
    errorMessage.value = ''
  }

  function clearStatus() {
    status.value = 'idle'
    errorMessage.value = ''
  }

  return {
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
  }
}
