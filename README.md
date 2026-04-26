# AI Video Workflow Starter

A Vue 3 single-screen application for configuring and launching AI-powered video generation workflows.

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Tech Stack

| Layer       | Choice                     |
|-------------|----------------------------|
| Framework   | Vue 3 (Composition API)    |
| Language    | TypeScript                 |
| Build tool  | Vite                       |
| Styling     | Scoped CSS + CSS variables |

---

## Project Structure

```
src/
├── composables/
│   └── useWorkflowForm.ts   # All form state, validation, summary, and submission logic
├── components/
│   ├── OptionSelector.vue    # Reusable pill-toggle selector (Workflow, Aspect Ratio, Duration)
│   ├── PromptInput.vue       # Labeled textarea with character counter
│   ├── SummaryPanel.vue      # Live parameter summary display
│   └── StatusBanner.vue      # Loading / Success / Error feedback banner
├── styles/
│   └── global.css            # Design tokens, resets, animations
├── App.vue                   # Root layout — composes all sections
├── main.ts                   # Entry point
└── env.d.ts                  # TypeScript declarations for .vue files
```

---

## Design Decisions

### State Management
All reactive state lives in the `useWorkflowForm` composable:

- **Form fields** (`workflow`, `aspectRatio`, `duration`, `prompt`) — individual `ref`s with explicit union types.
- **Derived state** (`isValid`, `canSubmit`, `summary`) — `computed` properties that react automatically.
- **Submission state** (`status`, `errorMessage`) — a simple `SubmitStatus` discriminated union (`idle | loading | success | error`).

This approach keeps the root `App.vue` thin — it only wires composable outputs to child components. No Pinia store is needed at this scale; the composable provides the same encapsulation with less ceremony.

### Component Extraction
If the project grew:

| What                          | Why                                                     |
|-------------------------------|---------------------------------------------------------|
| `useWorkflowForm` → Pinia    | Share state across routes or deeply nested components    |
| `OptionSelector`              | Already generic — reusable for any pill-toggle need      |
| `StatusBanner`                | Could become a global toast / notification system        |
| `SummaryPanel`                | Could evolve into a configurable card with edit actions  |
| Form validation               | Extract into a `useFormValidation` composable            |
| API layer                     | Real HTTP client with interceptors, retry, error mapping |

### Edge Cases Considered

- **Whitespace-only prompt** — `prompt.value.trim().length > 0` prevents empty / spaces-only submissions.
- **Double-submit** — `canSubmit` is `false` while `status === 'loading'`, and the button gets `pointer-events: none`.
- **Error recovery** — "Retry" re-submits with the same values; "Start new" fully resets the form.
- **Character limit** — Textarea enforces `maxlength="2000"` with a live counter.
- **Accessibility** — `role="radiogroup"` + `aria-checked` on pill buttons; labels linked via `for`/`id`.
- **Mock error rate** — 80/20 success/error split so both paths are easily testable.

---

## AI Tools Note

This project was built with **Antigravity** (AI coding assistant). Specifically:

- **Used for:** Scaffolding the project, writing all component code, CSS design tokens, composable logic, and this README.
- **Sped up:** Boilerplate generation, consistent design-token usage, and initial component wiring.
- **Verified manually:** Full user flow tested in-browser (selection → summary → submit → loading → success/error), responsive layout, accessibility attributes, and state transitions.
