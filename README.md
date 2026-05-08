# Git Shift

![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white)
![GitHub Pages](https://img.shields.io/badge/Deployed%20on-GitHub%20Pages-222222?logo=github&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green)

**TFS to Git Transition Guide for Texas A&M Technology Services**

An interactive learning tool built for senior TFS/TFVC developers at Texas A&M University Enterprise Application Services (EAS) who are migrating to Git. This single-page application provides command translation, a practice sandbox, and a comprehensive reference—all designed to help experienced version control users make a smooth transition to Git.

---

## 🎯 Overview

**Git Shift** is designed specifically for experienced TFVC/TFS developers making their first move to Git. Rather than starting from scratch, this tool helps you leverage your existing version control knowledge while learning Git's unique concepts and workflows.

The app provides three complementary learning modes:
- **Translate** – Map familiar TFS commands to their Git equivalents
- **Practice** – Experiment safely in an interactive Git sandbox
- **Reference** – Search commands and terminology on demand

---

## 🚀 Live Demo

**[https://dguido-tamu.github.io/tfs-to-git-tool/](https://dguido-tamu.github.io/tfs-to-git-tool/)**

![Git Shift demo screenshot](/public/demo-tfs-to-git-tool-2026-05-08-11_40_37.jpg)


---

## ✨ Features

### 📋 Translate Mode
- **Command Mapping Table**: Side-by-side comparison of TFS and Git commands
- **Mindset Shift Cards**: Understand key conceptual differences between centralized and distributed version control
- **Workflow Comparison**: Visual breakdown of daily workflows in TFS vs. Git

### 🧪 Practice Mode
- **5-Zone Git Visualizer** – See how commands affect the Working Directory, Staging Area, Local Repository, Remote Repository, and Stash
- **Interactive Terminal Sandbox** – Execute Git commands in a safe, simulated environment
- **6-Lesson Tutorial Rail** – Guided progression through core Git workflows with real-time feedback

### 📖 Reference Mode
- **Searchable Command Reference** – Quick lookup for Git commands with descriptions and examples
- **Glossary** – Definitions for Git terminology and TFS equivalents

---

## 🛠️ Tech Stack

- **React 18** – UI framework
- **Vite 5** – Build tool and dev server
- **React Router v6** – Client-side routing with `HashRouter` (required for GitHub Pages)
- **Lucide React** – Icon library
- **CSS Modules** – Component-scoped styling
- **GitHub Actions** – Automated deployment to GitHub Pages

---

## 💻 Local Development

### Prerequisites
- Node.js 18+ and npm

### Setup

```bash
# Clone the repository
git clone https://github.com/dguido-tamu/tfs-to-git-tool.git
cd tfs-to-git-tool 

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build locally
npm run lint     # Run ESLint
```

---

## 🌐 GitHub Pages Deployment

This project deploys automatically to GitHub Pages via **GitHub Actions** on every push to the `main` branch.

### Deployment Configuration

The deployment workflow is defined in `.github/workflows/deploy.yml` and uses Vite's static site generation.

> [!IMPORTANT]
> If you fork or clone this repo, update the `base` path in `vite.config.js` to match
> your own repository name before deploying. Using the wrong base path will cause a
> blank page on GitHub Pages.

```javascript
export default defineConfig({
  base: '/your-repo-name/', // Replace with your actual repository name
  // ...
})
```

After deployment, the app will be available at:  
`https://[YOUR-ACTUAL-USERNAME].github.io/[your-repo-name]/`

---

## 📁 Project Structure

```
tfs-to-git-tool/
├── public/                     # Static assets
│   └── RBG-TAM-White.svg      # Texas A&M logo
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── NavBar.jsx           # Main navigation with theme toggle
│   │   │   ├── NavBar.module.css
│   │   │   ├── Footer.jsx           # Site footer with TAMU branding
│   │   │   └── Footer.module.css
│   │   ├── practice/
│   │   │   ├── ZoneCanvas.jsx       # Git zones visualization
│   │   │   ├── Terminal.jsx         # Interactive command terminal
│   │   │   ├── TutorialRail.jsx     # Guided tutorial sidebar
│   │   │   ├── AlertBanner.jsx      # User feedback alerts
│   │   │   └── ZoneCard.jsx         # Individual zone display
│   │   └── translate/
│   │       ├── CommandTable.jsx     # TFS → Git command mappings
│   │       ├── MindsetCards.jsx     # Conceptual shift explanations
│   │       └── WorkflowComparison.jsx
│   ├── data/
│   │   ├── commandMappings.js       # TFS/Git command data
│   │   ├── glossary.js              # Terminology definitions
│   │   ├── referenceCommands.js     # Command reference data
│   │   └── tutorialSteps.js         # Practice mode lessons
│   ├── hooks/
│   │   ├── useGitState.js           # Git simulation state management
│   │   ├── useTerminal.js           # Terminal command processing
│   │   └── useTheme.js              # Dark/light theme toggle
│   ├── pages/
│   │   ├── TranslatePage.jsx        # Command translation view
│   │   ├── PracticePage.jsx         # Interactive sandbox view
│   │   └── ReferencePage.jsx        # Command reference view
│   ├── App.jsx                      # Main app with routing
│   ├── main.jsx                     # Application entry point
│   └── index.css                    # Global styles
├── index.html
├── vite.config.js                   # Vite configuration
├── package.json
└── README.md
```

---

## 🎨 Brand Compliance

This tool follows **Texas A&M AggieUX design standards**:

- **Aggie Maroon** (`#500000`) – Primary brand color used in navigation
- **Oswald** – Display typeface for headings
- **Open Sans** – Body text and UI elements
- **Texas A&M logo** – Official TAM-LogoBox from university brand guidelines

All design decisions align with the [Texas A&M Brand Guide](https://brandguide.tamu.edu/).

---

## 🤝 Contributing

This is an internal tool developed and maintained by **Texas A&M Technology Services** for Enterprise Application Services (EAS) developers.

For questions or feedback, contact the Texas A&M Technology Services team.

---

## 📄 License

MIT License - See [LICENSE](LICENSE) file for details.

---

**Built with ❤️ by Texas A&M Technology Services**
