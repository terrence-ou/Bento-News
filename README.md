<h1 align="center"> Bento News - an AI-driven News App </h1>
<h4 align="center">1000+ faster than Google News, 3000+ reliable news source worldwide.</h4>

<p align="center">
  <image src="./resources/cover.jpg" width="100%"/>
</p>

<div align="center">

  **Website**: https://terrence-ou.github.io/Bento-News-Website/
  <br />
  <br />
  [![Release](https://github.com/terrence-ou/Bento-News/actions/workflows/release.yml/badge.svg)](https://github.com/terrence-ou/Bento-News/actions/workflows/release.yml) [![Test](https://github.com/terrence-ou/Bento-News/actions/workflows/test.yml/badge.svg)](https://github.com/terrence-ou/Bento-News/actions/workflows/test.yml)
  <img height="20px" src="https://img.shields.io/badge/License-AGPL%20v3-blue.svg" alt="LICENSE"/>
  <br/>
</div>

## Revolutionalize your way of reading, managing, and analyzing news
- Bento News supports content from over **3,000 trusted media outlets worldwide**.
- Harness **AI-driven tools** to gain broader and deeper insights into your curated collection.
- Collect and organize the news as you prefer locally to **ensure your privacy**.

## Features

- Curated Daily Headlines \
  We curate daily headlines in politics, economy, technology, science, and more to keep you informed about the fields you're interested in.

- Instant Keyword Search \
  Search for news by keywords, dates, and fields, and get results instantly. Bento News supports searches in 10+ languages and across 3000 resources.

- Local News Management
  Mark, save, and organize news as you prefer to maximize its value. All file management happens locally to ensure your privacy.

- AI-Assisted Analysis
  Use AI tools to summarize collected news, predict trends, and provide suggestions on related topics to help you gain broader and deeper insights.

- Cover Image Generation
  Generate cover images based on your selected topics in multiple styles for your posts or essays to make your work more attractive.

<image src="./resources/features.jpg" width="100%"/>

## Tech Stack

| Category                  | Technology                                                                                  |
|---------------------------|---------------------------------------------------------------------------------------------|
| **Programming Language**  | [TypeScript](https://www.typescriptlang.org/)                                               |
| **Software Framework**    | [Electron](https://www.electronjs.org/)                                                     |
| **Frontend Library**      | [React](https://react.dev/)                                                                 |
| **Build Tool**            | [Vite](https://vite.dev/)                                                                   |
| **State Management**      | [Jotai](https://jotai.org/)                                                                 |
| **UI and Styling**        | [shadcn](https://ui.shadcn.com/), [Tailwind](https://tailwindcss.com/)                      |
| **Testing**               | [Vitest](https://vitest.dev/), [Testing Library](https://testing-library.com/)              |
| **Code Sign and Notarize**| [Electron-forge](https://www.electronforge.io/)                                             |

## File Structure

```
├── .github/
│   └── workflows/                  # CI/CD workflows for GitHub Actions
│       ├── release.yml             # Workflow for releasing the app
│       └── test.yml                # Workflow for running tests
├── resources/                      # Additional resources for the app
├── src/                            # Project source code
│   ├── main/                       # Main process code
│   │   ├── lib/                    # Libraries and utilities for the main process
│   │   └── index.ts                # Entry point for the main process
│   ├── preload/                    # Preload scripts
│   │   └── index.ts                # Entry point for preload scripts
│   ├── renderer/                   # Renderer process code (frontend)
│   │   ├── src/                    # React code
│   │   │   ├── __test__/           # Unit and integration tests for renderer
│   │   │   ├── assets/             # Static assets for the renderer (images, fonts, etc.)
│   │   │   ├── atoms/              # Jotai atoms
│   │   │   ├── components/         # UI components
│   │   │   ├── hooks/              # Custom React hooks for reusable logic
│   │   │   ├── routes/             # Application routes and navigation components
│   │   │   └── utils/              # Utility functions and helpers
│   │   ├── App.tsx                 # Main React application component
│   │   ├── env.d.ts                # TypeScript environment declarations
│   │   ├── main.tsx                # Entry point for the renderer process
│   │   └── index.html              # HTML template for the renderer
│   └── shared/                     # Code shared between the main and renderer processes
├── .gitignore                      # Patterns to ignore in Git version control
├── components.json                 # Shadcn-ui component configuration
├── electron.vite.config.ts         # Vite configuration for Electron
├── forge.config.cjs                # Electron Forge build and publish configurations
├── LICENSE                         # License
├── package.json                    # Project meta and packages
├── package-lock.json               # Dependency lock file
├── postcss.config.js               # Configuration for PostCSS
├── README.md                       # Readme
├── tailwind.config.js              # Tailwind CSS configuration
├── tsconfig.json                   # TypeScript configuration (general)
├── tsconfig.node.json              # TypeScript configuration for Node.js
├── tsconfig.web.json               # TypeScript configuration for the web
└── vite.config.mjs                 # Vitest configuration for the project
```

## FLUX model credits

Stippled - https://huggingface.co/dvyio/flux-lora-stippled-illustration \
Watercolor - https://huggingface.co/alvdansen/araminta-k-illustration \
Line Art - https://huggingface.co/dvyio/flux-lora-simple-illustration \
Cartoon - https://huggingface.co/blink7630/graphic-novel-illustration \
Kid Illustration - https://huggingface.co/ampp/rough-kids-illustrations 
