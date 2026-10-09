# Sayyed Kashaf — Personal Data Science Portfolio

<p align="center">
  <a href="https://sayyedkashaf.github.io/kashaf-portfolio/">
    <img src="https://img.shields.io/badge/Live%20Demo-Visit%20Website-0d9488?style=for-the-badge&logo=firefox&logoColor=white" alt="Live Demo" />
  </a>
  <a href="https://sayyedkashaf.github.io/kashaf-portfolio/">
    <img src="https://img.shields.io/badge/Deployed%20with-GitHub%20Pages-14b8a6?style=for-the-badge&logo=github" alt="GitHub Pages" />
  </a>
  <a href="https://github.com/sayyedkashaf/kashaf-portfolio/stargazers">
    <img src="https://img.shields.io/github/stars/sayyedkashaf/kashaf-portfolio?style=for-the-badge&logo=star&logoColor=white" alt="GitHub Stars" />
  </a>
  <a href="https://github.com/sayyedkashaf/kashaf-portfolio/blob/main/LICENSE">
    <img src="https://img.shields.io/github/license/sayyedkashaf/kashaf-portfolio?style=for-the-badge&logo=opensourceinitiative&logoColor=white" alt="License" />
  </a>
  <a href="https://github.com/sayyedkashaf/kashaf-portfolio/issues">
    <img src="https://img.shields.io/github/issues/sayyedkashaf/kashaf-portfolio?style=for-the-badge&logo=github&logoColor=white" alt="Issues" />
  </a>
</p>

<p align="center">
  <strong>🔗 Quick Links:</strong>
  <a href="https://sayyedkashaf.github.io/kashaf-portfolio/">Live Demo</a> •
  <a href="#-featured-projects">Projects</a> •
  <a href="#-getting-started">Getting Started</a> •
  <a href="https://github.com/sayyedkashaf/kashaf-portfolio/issues">Report Bug</a> •
  <a href="https://github.com/sayyedkashaf/kashaf-portfolio/issues/new?template=feature_request.md">Request Feature</a>
</p>

---

> **A student-focused, transparent portfolio built with React + Vite.**  
> Showcasing hands-on projects across **data analysis, machine learning fundamentals, generative AI, backend development, and cybersecurity** — all backed by verifiable, public GitHub repositories.

---

## 🎯 Why This Portfolio?

| Aspect | Approach |
|--------|----------|
| **Identity** | Honest student positioning — no inflated titles or fake metrics |
| **Architecture** | Data-driven: projects, skills, timeline decoupled into `src/data/` modules |
| **Design** | Teal-accented dark/light theme, glassmorphism cards, fluid typography |
| **Accessibility** | Semantic HTML, keyboard navigation, reduced-motion support, WCAG AA contrast |
| **Recruiter Ready** | Interactive Academic CV modal with print-to-PDF, verifiable code links |

---

## 🚀 Tech Stack

| Category | Technologies |
|----------|--------------|
| **Framework** | React 18 + Vite 6 |
| **Styling** | Vanilla CSS with custom properties (CSS Variables) |
| **Icons** | Lucide React |
| **Fonts** | Plus Jakarta Sans, Outfit, JetBrains Mono (Google Fonts) |
| **Deployment** | GitHub Pages (static) |
| **Tooling** | ESLint, Prettier, GitHub Actions CI |

---

## 🔍 Featured Projects

| Project | Category | Description | Tech Stack | Live Code |
|---------|----------|-------------|------------|-----------|
| **GlowMatch AI** | AI / GenAI | Skincare recommendation engine using vector embeddings & semantic search | Python, Streamlit, Embeddings, Vector Search | [GitHub](https://github.com/sayyedkashaf/GlowMatch-AI) |
| **SentinelShield** | Cybersecurity | Defensive web protection with token-bucket rate limiting & structured logging | Python, Flask, Rate Limiting, Security Logging | [GitHub](https://github.com/sayyedkashaf/SentinelShield-Web-Protection-System) |
| **Threat Intel Aggregator** | Data & Security | Automated IoC pipeline for normalizing & correlating multi-source threat feeds | Python, Data Processing, REST APIs, JSON/CSV | [GitHub](https://github.com/sayyedkashaf/Threat-Intelligence-Aggregator) |
| **Leave Management API** | Backend | High-performance REST microservice with FastAPI, Pydantic validation, SQL persistence | FastAPI, Python, REST APIs, Pydantic, SQL | [GitHub](https://github.com/sayyedkashaf/fast-api) |

> [!TIP]
> All projects are **student-built**, open-source, and verifiable. No production-scale claims — just honest, practical learning.

---

## 📁 Repository Architecture

```text
kashaf-portfolio/
├── .github/
│   ├── workflows/
│   │   └── ci.yml                 # CI: lint, typecheck, build
│   ├── ISSUE_TEMPLATE/
│   │   ├── bug_report.yml
│   │   └── feature_request.yml
│   └── PULL_REQUEST_TEMPLATE.md
├── public/
│   └── favicon.svg                # Teal data science emblem
├── src/
│   ├── components/                # UI components (Navbar, Hero, About, etc.)
│   ├── data/                      # Decoupled data modules
│   │   ├── projects.js            # 4 featured projects
│   │   ├── skills.js              # 5 skill groups + learning focus
│   │   └── experience.js          # Education + practical timeline
│   ├── App.jsx                    # Root: theme, modal, scroll progress
│   ├── main.jsx                   # Vite entrypoint
│   └── index.css                  # Design system (2350+ lines)
├── index.html                     # SEO meta, Open Graph, fonts
├── package.json
├── vite.config.js
├── LICENSE                        # MIT License
├── CONTRIBUTING.md
├── ARCHITECTURE.md                # System design documentation
├── PRD.md                         # Product requirements
└── README.md
```

---

## 💻 Getting Started

### Prerequisites
- **Node.js** ≥ 18
- **npm** ≥ 9 (or pnpm/yarn)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/sayyedkashaf/kashaf-portfolio.git
cd kashaf-portfolio

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
# → Open http://localhost:5173
```

### Production Build

```bash
# Build optimized bundle
npm run build
# Output: ./dist/

# Preview production build locally
npm run preview
```

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server with HMR |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview `dist/` locally |
| `npm run lint` | Run ESLint |
| `npm run format` | Format with Prettier |

---

## 🛠️ Customization

### Updating Content
All portfolio content lives in **`src/data/`** — no JSX editing needed:

```javascript
// src/data/projects.js — Add a new project
{
  id: "my-new-project",
  title: "Project Name",
  badge: "Category",
  tagline: "One-line description",
  description: "Detailed description...",
  technologies: ["Tech1", "Tech2"],
  github: "https://github.com/yourusername/repo",
  featured: true,
  highlights: ["Highlight 1", "Highlight 2"],
  category: "AI / Data | Cybersecurity | Development"
}
```

```javascript
// src/data/skills.js — Add/remove skills
{ name: "New Skill", highlight: true }
```

### Theming
Edit CSS custom properties in `src/index.css`:

```css
:root {
  --accent-primary: #14b8a6;     /* Teal accent */
  --bg-primary: #080d1a;         /* Dark background */
  --font-sans: 'Plus Jakarta Sans', ...;
  --radius-md: 14px;             /* Card border radius */
}
```

---

## 🤝 Contributing

While this is a personal portfolio, suggestions are welcome!

1. Fork the repository
2. Create a feature branch: `git checkout -b feat/amazing-feature`
3. Commit changes: `git commit -m 'feat: add amazing feature'`
4. Push to branch: `git push origin feat/amazing-feature`
5. Open a Pull Request

> [!NOTE]
> See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines.

---

## 📄 License

Distributed under the **MIT License**. See `LICENSE` for more information.

---

## 📬 Connect

<p align="center">
  <a href="https://github.com/sayyedkashaf">
    <img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub" />
  </a>
  <a href="https://www.linkedin.com/in/kashaf-sayyed-712635379">
    <img src="https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn" />
  </a>
  <a href="mailto:kashafsayyed2008@gmail.com">
    <img src="https://img.shields.io/badge/Email-EA4335?style=for-the-badge&logo=gmail&logoColor=white" alt="Email" />
  </a>
</p>

---

<p align="center">
  <sub>Built with ❤️ by <a href="https://github.com/sayyedkashaf">Sayyed Kashaf</a> — B.Sc. Data Science, SDBI Mumbai University (2025–2028)</sub>
</p>