# Git Transition Tool — Revised PRD v2.0
## For Senior TFVC/TFS Developers at Texas A&M University Technology Services

**Document Version:** 2.1  
**Owner:** Technology Services, Software Applications  
**Status:** Draft — Ready for Antigravity Build  
**Changes from v2.0:** Migrated from single-file HTML to React (Vite) application; added GitHub Pages CI/CD deployment pipeline.

---

## 1. Executive Summary

This document defines the product requirements for the **TFS-to-Git Transition Tool**, an interactive React web application built for experienced software developers at Texas A&M University Technology Services who are migrating from Team Foundation Version Control (TFVC/TFS) to Git. The tool is not a beginner Git tutorial. Its primary audience already understands version control deeply — what they need is a mental model bridge: a way to map familiar TFS vocabulary, workflows, and concepts onto Git equivalents without re-learning version control from scratch.

The application is a **React (Vite) single-page application** hosted on **GitHub Pages**, with automated CI/CD via GitHub Actions. It is designed to be built inside Google Antigravity (agent-driven mode, Gemini 3 Pro).

---

## 2. Audience Profile

### Primary User: Senior TFVC/TFS Developer

| Attribute | Detail |
|---|---|
| Experience | 5–15+ years with TFS/TFVC in enterprise Microsoft environments |
| Git knowledge | None to minimal — may have heard terms but lacks muscle memory |
| Mental model | Centralized: server is the source of truth, workspace = personal copy |
| Motivation | Required migration to Git; not voluntary learning |
| Pain points | Confusion about when to push, why staging exists, what a "local repo" means |
| Environment | Windows, Visual Studio / VS Code, Azure DevOps transitioning to GitHub |

### Secondary User: Developer Lead / Trainer

A Tech Services lead who will use this tool to onboard their team to Git. They need accurate content they can share in workshops.

---

## 3. Brand Identity (TAMU Compliance)

All visual design must comply with Texas A&M University brand standards and the Aggie UX (AUX) design system.

### Color Palette

| Role | Name | Hex | CSS Variable |
|---|---|---|---|
| Primary brand | Aggie Maroon | `#500000` | `--color-maroon` |
| Primary brand dark | Dark Maroon | `#3C0000` | `--color-maroon-dark` |
| Primary brand light | Light Maroon | `#732F2F` | `--color-maroon-light` |
| Background | White | `#FFFFFF` | `--color-bg` |
| Surface | Gray 100 | `#F6F6F6` | `--color-surface` |
| Surface elevated | Cream | `#D6D3C4` | `--color-cream` |
| Muted text | Gray 500 | `#707070` | `--color-text-muted` |
| Body text | Gray 900 | `#202020` | `--color-text` |
| Borders / dividers | Gray 300 | `#D1D1D1` | `--color-border` |

Semantic state colors (zone indicators and alerts):

| State | Color | Hex |
|---|---|---|
| Success / Staged | Green | `#437a22` |
| Warning / Conflict | Gold | `#d19900` |
| Error / Destructive | Error Red | `#a12c7b` |
| Info / Remote | Blue | `#006494` |

### Typography

| Role | Font | Weight | Notes |
|---|---|---|---|
| H1–H3 headings | Oswald | Bold / SemiBold | Condensed display font per AUX spec |
| H4–H6 sub-headings | Open Sans | SemiBold | Used for labels and UI chrome |
| Body copy | Open Sans | Regular | All readable content |
| Code / terminal | `monospace` (system) | Regular | All terminal output, command syntax |
| Action elements | Work Sans | SemiBold | Buttons, CTAs, interactive labels |

Load via Google Fonts CDN in `index.html`:
```html
<link href="https://fonts.googleapis.com/css2?family=Oswald:wght@200..700&family=Open+Sans:wght@300..800&family=Work+Sans:wght@100..900&display=swap" rel="stylesheet">
```

### Visual Style

- Clean, professional, and academic consistent with TAMU identity
- Maroon as primary identity color; neutral gray surfaces for workspace zones
- WCAG AA compliant: 4.5:1 body text, 3:1 large text
- No decorative blobs, gradient backgrounds, or icon circles

---

## 4. Technology Stack

### Core

| Layer | Technology | Notes |
|---|---|---|
| Framework | **React 18** | Functional components, hooks only |
| Build tool | **Vite 5** | Fast dev server, optimized production build |
| Language | **JavaScript (ES2022)** | No TypeScript required for MVP |
| Styling | **CSS Modules** or plain CSS custom properties | No Tailwind — keep the bundle light |
| State | **React `useState` / `useReducer`** | No Redux needed for MVP; all in-memory |
| Routing | **React Router v6** | Hash-based routing for GitHub Pages compatibility |
| Icons | **Lucide React** | `npm install lucide-react` — lightweight and tree-shakeable |

### Why Vite + React over plain HTML

- Component architecture allows Tutorial Rail, Zone Canvas, and Terminal to be independently stateful and reusable
- React Router enables shareable deep-links to specific modes (e.g., `/#/translate`, `/#/practice`, `/#/reference`)
- Vite's dev server provides instant hot-reload for rapid iteration in Antigravity
- The build output (a `dist/` folder of static assets) deploys cleanly to GitHub Pages

### Key Dependencies

```json
{
  "dependencies": {
    "react": "^18.3.0",
    "react-dom": "^18.3.0",
    "react-router-dom": "^6.23.0",
    "lucide-react": "^0.383.0"
  },
  "devDependencies": {
    "vite": "^5.2.0",
    "@vitejs/plugin-react": "^4.3.0"
  }
}
```

---

## 5. Project Structure

```
tfs-to-git-tool/
├── .github/
│   └── workflows/
│       └── deploy.yml          ← GitHub Actions CI/CD pipeline
├── public/
│   └── favicon.ico
├── src/
│   ├── main.jsx                ← React entry point
│   ├── App.jsx                 ← Root component, router, theme provider
│   ├── index.css               ← Global styles, CSS custom properties, TAMU palette
│   ├── components/
│   │   ├── layout/
│   │   │   ├── NavBar.jsx      ← Top nav with mode switcher + theme toggle
│   │   │   └── Footer.jsx      ← TAMU footer
│   │   ├── translate/
│   │   │   ├── CommandTable.jsx       ← TFS → Git mapping table
│   │   │   ├── MindsetCards.jsx       ← Three expandable concept cards
│   │   │   └── WorkflowComparison.jsx ← Side-by-side daily workflow
│   │   ├── practice/
│   │   │   ├── ZoneCanvas.jsx         ← Five-zone visual model
│   │   │   ├── ZoneCard.jsx           ← Individual zone (WD, Staging, etc.)
│   │   │   ├── Terminal.jsx           ← Interactive terminal
│   │   │   ├── TutorialRail.jsx       ← Left sidebar lesson flow
│   │   │   └── AlertBanner.jsx        ← Four alert types
│   │   └── reference/
│   │       ├── CommandModal.jsx        ← Searchable command reference
│   │       └── Glossary.jsx            ← A–Z Git glossary
│   ├── hooks/
│   │   ├── useGitState.js      ← Core reducer: manages all zone states
│   │   ├── useTerminal.js      ← Command parsing and output generation
│   │   └── useTheme.js         ← Light/dark mode toggle
│   ├── data/
│   │   ├── commandMappings.js  ← TFS → Git translation data (13 entries)
│   │   ├── tutorialSteps.js    ← Six tutorial lesson definitions
│   │   ├── referenceCommands.js ← Command reference data (four categories)
│   │   └── glossary.js         ← Git glossary terms + TFS cross-references
│   └── pages/
│       ├── TranslatePage.jsx
│       ├── PracticePage.jsx
│       └── ReferencePage.jsx
├── vite.config.js              ← base path set to repo name for GitHub Pages
├── package.json
└── README.md
```

---

## 6. GitHub Pages Deployment

### Repository Setup

1. Create a new GitHub repository under your organization: e.g., `tamu-techservices/tfs-to-git-tool`
2. Push the project to the `main` branch
3. In repository Settings → Pages → Source: select **GitHub Actions**

### Vite Configuration

Set the `base` path in `vite.config.js` to match the repository name so asset paths resolve correctly on GitHub Pages:

```js
// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/tfs-to-git-tool/',  // ← must match your GitHub repo name
})
```

### React Router — Hash Routing (Required for GitHub Pages)

GitHub Pages does not support server-side routing. Use `HashRouter` instead of `BrowserRouter` so all routes resolve client-side:

```jsx
// src/main.jsx
import { HashRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <HashRouter>
    <App />
  </HashRouter>
)
```

This means your URLs will look like: `https://tamu-techservices.github.io/tfs-to-git-tool/#/translate`

### GitHub Actions Workflow

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: ['main']
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: 'pages'
  cancel-in-progress: true

jobs:
  build-and-deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest

    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Set up Node
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Setup Pages
        uses: actions/configure-pages@v5

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './dist'

      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

**Result:** Every push to `main` automatically builds and deploys the app. No manual `npm run deploy` needed.

---

## 7. Product Architecture — Three Modes

The application has three top-level routes accessible from the main navigation bar.

```
/#/translate   → Translate Mode (default)
/#/practice    → Practice Mode (Sandbox)
/#/reference   → Reference Mode
```

### Mode 1: TRANSLATE (`/#/translate`)

**Purpose:** Map TFS vocabulary and workflows onto Git equivalents.

#### 1A. TFS → Git Command Translator (`CommandTable.jsx`)

A searchable table (search input filters rows in real-time using React state) with four columns:

| Column | Description |
|---|---|
| You know this in TFS | Familiar TFS term or action |
| Git equivalent | The Git command or concept |
| Key difference | One-sentence mental model callout |
| Try it | Button that opens Practice mode pre-loaded with the relevant lesson |

**Required 13 mappings:**

| TFS / TFVC | Git Equivalent | Key Difference |
|---|---|---|
| Get Latest (first time) | `git clone <url>` | Creates a full local copy with complete history |
| Get Latest (ongoing) | `git pull` | Fetches AND merges remote changes into current branch |
| Check Out (file lock) | *(just edit the file)* | Git has no file locking — edit freely |
| Check In | `git add` + `git commit` + `git push` | Three steps: stage → commit locally → push to remote |
| Shelveset | `git stash` | Stash is local only — does NOT go to the server |
| Label | `git tag` | Tags must be pushed separately with `git push --tags` |
| Workspace | Local repository (`~/.git`) | Your local repo contains the full history — no server needed |
| Changeset | Commit (`git log`) | Commits are local-first; shared only when pushed |
| Undo Pending Changes | `git restore .` | Discards all working directory changes permanently |
| Merge (TFS) | `git merge <branch>` | Git merges are branch-to-branch |
| Branch (TFS server) | `git switch -c <name>` | Branches are free, local, and disposable |
| Code Review (TFS) | Pull Request (PR) | Opened on remote (GitHub/Azure DevOps) after push |
| History / Changesets | `git log --oneline` | Full history lives locally — no server needed |

#### 1B. Mindset Shift Cards (`MindsetCards.jsx`)

Three expandable `<details>`-style accordion cards:

1. **The Local Repository** — TFS workspace vs. full local Git repo with history
2. **Commit ≠ Check In** — Local snapshot vs. shared server changeset
3. **No File Locking** — TFS Check Out file lock vs. Git's optimistic concurrency

Each card: headline, side-by-side "TFS World / Git World" columns, one code example.

#### 1C. Daily Workflow Comparison (`WorkflowComparison.jsx`)

Animated step-by-step side-by-side flow. Steps animate in sequence when user clicks "Step Through" button:

| Step | TFS | Git |
|---|---|---|
| 1 | Get Latest | `git pull` |
| 2 | Check Out file | *(just edit)* |
| 3 | Edit code | Edit code |
| 4 | Check In | `git add .` |
| 5 | *(done)* | `git commit -m "..."` |
| 6 | *(done)* | `git push` |

---

### Mode 2: PRACTICE (`/#/practice`)

**Purpose:** Visual, consequence-free Git sandbox. All state lives in `useGitState.js` — a `useReducer` hook that models the five zones.

#### Git State Model (`useGitState.js`)

```js
const initialState = {
  workingDirectory: [],   // Array of file objects: { name, type, status }
  stagingArea: [],        // Files staged with git add
  localRepo: {            // Commit history
    commits: [],          // Array of: { hash, message, branch, timestamp }
    branches: ['main'],
    currentBranch: 'main',
    HEAD: null,
  },
  stash: [],              // Stashed changesets
  remote: {               // Simulated origin
    connected: false,
    url: '',
    commits: [],
    aheadBy: 0,
    behindBy: 0,
  },
}
```

Actions dispatched by the terminal: `INIT`, `STATUS`, `ADD`, `ADD_ALL`, `COMMIT`, `PUSH`, `PULL`, `BRANCH`, `SWITCH`, `STASH`, `STASH_POP`, `RESTORE`, `LOG`, `REMOTE_ADD`.

#### 2A. Zone Canvas (`ZoneCanvas.jsx`)

Five `ZoneCard` components laid out in a CSS Grid:

```
┌──────────────┬───────────────┬──────────────────┐
│  Working     │  Staging      │  Local           │
│  Directory   │  Area         │  Repository      │
│              │               │                  │
└──────────────┴───────────────┴──────────────────┘
┌──────────────┬───────────────────────────────────┐
│  Stash       │  Remote Repository (Origin)       │
└──────────────┴───────────────────────────────────┘
```

Each `ZoneCard` receives the relevant slice of state and renders:
- Zone label and icon (Lucide)
- File cards (Working Dir, Staging) or commit nodes (Local Repo, Remote)
- Status badge (Untracked, Modified, Staged, Committed, Ahead/Behind)
- Empty state message when zone is empty

File card animation: When `git add` is executed, the file card in Working Directory animates with a CSS `translate + opacity` transition (300ms ease-out) to appear in the Staging Area. Implemented via React state change + CSS transition classes.

#### 2B. Terminal (`Terminal.jsx`)

- Monospace font, dark background (`#1a1a1a`), green prompt text
- Input: `$ ~/project git |` — controlled input field
- On Enter: dispatches command to `useTerminal.js` parser
- Output rendered below input as an array of lines, newest at bottom
- "TFS Context" tip rendered above terminal in a styled callout box: _"In TFS, this is like... Get Latest"_
- Keyboard: Up/Down arrow cycles command history (stored in component state array)
- Supported commands: `git init`, `git status`, `git add <file>`, `git add .`, `git commit -m "msg"`, `git push`, `git pull`, `git branch`, `git branch <name>`, `git switch <name>`, `git switch -c <name>`, `git stash`, `git stash pop`, `git log`, `git log --oneline`, `git restore .`, `git remote add origin <url>`
- Unrecognized commands: display `"Command not recognized. Type 'help' for available commands."`

#### 2C. Tutorial Rail (`TutorialRail.jsx`)

Left sidebar, 280px wide on desktop, collapsible. Six lessons defined in `src/data/tutorialSteps.js`:

| # | Lesson | TFS Equivalent | Key Commands |
|---|---|---|---|
| 1 | Start a Project | Create new TFS workspace | `git init`, `git remote add origin` |
| 2 | Check Your Changes | View pending changes | `git status` |
| 3 | Stage Your Changes | Select files for Check In | `git add` |
| 4 | Commit to History | Check In (local only) | `git commit` |
| 5 | Push to the Team | Share your changeset | `git push` |
| 6 | Save Work in Progress | Create a Shelveset | `git stash` |

Each step object:
```js
{
  id: 3,
  title: 'Stage Your Changes',
  tfsEquivalent: 'Selecting files for Check In',
  description: 'You have modified style.css. Now add it to the staging area.',
  command: 'git add style.css',
  highlightZone: 'stagingArea',
  successCondition: (state) => state.stagingArea.length > 0,
  tip: 'In TFS, you selected which pending changes to include in a Check In. git add does the same — you choose exactly which files go into the next commit.',
}
```

#### 2D. Alert System (`AlertBanner.jsx`)

Rendered at top-right, stacking if multiple alerts fire. Uses React `useState` array + `useEffect` for auto-dismiss:

```js
const ALERT_TYPES = {
  success: { bg: '#437a22', icon: 'CheckCircle' },
  info:    { bg: '#006494', icon: 'Info' },
  warning: { bg: '#d19900', icon: 'AlertTriangle' },
  error:   { bg: '#500000', icon: 'XCircle' },
}
```

Animation: CSS `@keyframes slideIn` (300ms) on mount, `fadeOut` (200ms) before removal. Auto-dismiss after 4000ms via `setTimeout`. Manual dismiss via ✕ button.

---

### Mode 3: REFERENCE (`/#/reference`)

#### 3A. Command Reference (`CommandModal.jsx`)

Full-page panel (not a modal dialog — a full route) with:
- Search bar at top (filters command list by name, description, or TFS equivalent)
- Tab navigation: Core | Branching | Remote | Advanced
- Each command card: syntax block, one-line description, TFS equivalent badge, usage example, Copy button

#### 3B. Glossary (`Glossary.jsx`)

- Alphabetical A–Z letter navigation (sticky)
- Each entry: term, plain-language definition, TFS cross-reference note
- Required entries: Branch, Checkout, Clone, Commit, Fetch, HEAD, Index, Merge, Origin, Pull, Push, Rebase, Remote, Repository, Stash, Stage, Tag, Working Directory

---

## 8. Responsive Design

### Desktop (1200px+)

- Three-pane Practice layout: Tutorial Rail (280px fixed) | Zone Canvas (flex) | no right panel on MVP
- Top navigation bar: logo + mode tabs + theme toggle
- Terminal docked to bottom of Practice page (200px, not resizable in MVP)

### Tablet (768px–1199px)

- Tutorial Rail collapses to an icon strip; expands on click
- Zone canvas adapts: Working Dir + Staging in top row, Local + Remote in bottom row, Stash inline with Staging

### Mobile (375px–767px)

- Hamburger nav menu
- Zone cards stacked vertically in a scrollable column
- Terminal becomes a floating action button (`+`) that opens a bottom sheet
- Tutorial Rail becomes a modal overlay triggered from nav

---

## 9. Themes: Light & Dark Mode

Implemented via CSS custom properties on `:root` and `[data-theme="dark"]`. Toggle managed by `useTheme.js` hook (no `localStorage` — in-memory only):

```css
:root {
  --color-bg: #f6f6f6;
  --color-surface: #ffffff;
  --color-nav: #500000;
  --color-text: #202020;
  --color-text-muted: #707070;
  --color-border: #d1d1d1;
  --color-primary: #500000;
  --color-primary-hover: #3c0000;
  --color-primary-light: #732f2f;
}

[data-theme="dark"] {
  --color-bg: #1a1a1a;
  --color-surface: #242424;
  --color-nav: #3c0000;
  --color-text: #ececec;
  --color-text-muted: #a7a7a7;
  --color-border: #3e3e3e;
  --color-primary: #732f2f;
  --color-primary-hover: #500000;
  --color-primary-light: #8a4040;
}
```

---

## 10. Accessibility

- Semantic HTML throughout: `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`
- One `<h1>` per page; heading hierarchy never skips levels
- All interactive elements keyboard-navigable (Tab, Enter, Space, Escape)
- Visible focus rings (`:focus-visible`) on all controls
- `aria-label` on all icon-only buttons
- `aria-live="polite"` on the terminal output and alert container
- `role="alert"` on alert banners
- `prefers-reduced-motion`: all CSS transitions wrapped in `@media (prefers-reduced-motion: no-preference)`
- Minimum 44×44px touch targets on all interactive elements
- Skip-to-content link as first focusable element

---

## 11. Animation & Transition Spec

| Trigger | Animation | Duration |
|---|---|---|
| File moves Working Dir → Staging | `translate + opacity` CSS transition | 300ms ease-out |
| Commit created | Staging cards fade out; commit node fades in | 300ms |
| Alert appears | `slideInFromRight` keyframe | 300ms |
| Alert dismisses | `fadeOut` keyframe | 200ms |
| Mode route change | React Router transition: `opacity 0→1` | 200ms |
| Zone highlight (tutorial) | Pulsing maroon border ring | 400ms ease |
| Workflow step animation | Sequential step reveals | 400ms per step |

All wrapped in `@media (prefers-reduced-motion: no-preference)`.

---

## 12. MVP Build Order (for Antigravity)

Build in this sequence for fastest path to a testable product:

1. **Project scaffold** — `npm create vite@latest`, install dependencies, configure `vite.config.js` base path, set up `HashRouter`, create page shells
2. **GitHub Actions workflow** — Create `deploy.yml` immediately so deployment is wired from day one
3. **Global styles** — `index.css` with TAMU CSS custom properties, font imports, base reset
4. **NavBar + routing** — Three routes, active tab highlighting, theme toggle
5. **Data files** — `commandMappings.js`, `tutorialSteps.js`, `referenceCommands.js`, `glossary.js`
6. **Translate Mode** — `CommandTable.jsx` (with search), `MindsetCards.jsx`, `WorkflowComparison.jsx`
7. **Practice: Zone Canvas** — Static `ZoneCard` components with sample data, `useGitState.js` reducer
8. **Practice: Terminal** — `Terminal.jsx`, `useTerminal.js` parser, wire dispatch to `useGitState`
9. **Practice: Tutorial Rail** — `TutorialRail.jsx` with lesson flow, zone highlights, hints
10. **Practice: Alerts** — `AlertBanner.jsx`, wire to terminal events
11. **Reference Mode** — `CommandModal.jsx` with search + tabs, `Glossary.jsx`
12. **Responsive layout** — Mobile hamburger, bottom sheet terminal, stacked zones
13. **Dark mode polish** — Verify all surfaces in both themes
14. **Accessibility audit** — Keyboard nav, ARIA, contrast check

---

## 13. Out of Scope (Future Iterations)

- Real Git execution (simulation only — no actual shell)
- TypeScript migration
- User accounts or progress persistence
- Azure DevOps / GitHub API integration
- Commit DAG branch visualization graph — consider for v2
- Export / print cheat sheet — consider for v2
- `localStorage` progress saving — blocked by GitHub Pages iframe constraints on some browsers

---

## 14. Success Metrics

| Metric | Target |
|---|---|
| Senior dev identifies Git equivalent of any TFS action < 60 seconds | Translate mode validated |
| Developer completes all 6 tutorial lessons without external help | Practice mode validated |
| Zero WCAG AA contrast failures | Accessibility audit clean |
| App loads in under 2 seconds (Vite-optimized build) | Lighthouse performance ≥ 90 |
| GitHub Actions deploy succeeds on every push to main | CI/CD operational |
| At least 3 Tech Services team leads endorse for onboarding use | Stakeholder sign-off |

---

## 15. Antigravity Opening Prompt (Ready to Paste)

Use **Review-driven mode** in Google Antigravity. Paste this as your first message:

> *"Build a React 18 + Vite 5 application called 'TFS to Git Transition Guide' for senior TFVC/TFS developers at Texas A&M University Technology Services. The app uses HashRouter for GitHub Pages compatibility and has three routes: /#/translate (default), /#/practice, and /#/reference. Use TAMU brand colors: Aggie Maroon #500000 primary, #F6F6F6 gray surface, #202020 body text. Fonts via Google Fonts: Oswald (H1–H3), Open Sans (body), Work Sans (buttons). Light and dark mode via CSS custom properties on data-theme attribute. Start with: (1) Vite project scaffold with vite.config.js base set to '/tfs-to-git-tool/', (2) a GitHub Actions deploy.yml workflow targeting GitHub Pages, (3) global index.css with TAMU CSS variables, (4) NavBar with three mode tabs and theme toggle, then build the Translate mode first: a searchable 13-row TFS-to-Git command table, three expandable mindset shift cards, and an animated side-by-side daily workflow comparison."*

