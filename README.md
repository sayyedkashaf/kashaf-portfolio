# Sayyed Kashaf — Personal Data Science Portfolio

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit%20Website-0d9488?style=for-the-badge&logo=firefox&logoColor=white)](https://sayyedkashaf.github.io/kashaf-portfolio/)
[![GitHub Pages](https://img.shields.io/badge/Deployed%20with-GitHub%20Pages-14b8a6?style=for-the-badge&logo=github)](https://sayyedkashaf.github.io/kashaf-portfolio/)

> **Live Website:** [https://sayyedkashaf.github.io/kashaf-portfolio/](https://sayyedkashaf.github.io/kashaf-portfolio/)

Personal portfolio website for **Sayyed Kashaf**, B.Sc. Data Science student at Mumbai University (SDBI). Showcasing hands-on projects across data analysis, machine learning fundamentals, generative AI, backend development, and cybersecurity.

---

## 🌟 Overview & Highlights

- **Student-Focused Identity:** Built strictly to transparently present education, coursework, active learning focus, and practical repositories.
- **Data-Driven Architecture:** All projects, skills, and academic timeline entries are decoupled into structured data modules (`src/data/`), making updates effortless without modifying JSX markup.
- **Curated Design System:** Premium dark/light themes with a restrained teal accent (`#0d9488` / `#14b8a6`), modern typography (Plus Jakarta Sans, Outfit, JetBrains Mono), glassmorphism cards, and responsive layouts.
- **SEO & Accessibility Ready:** Complete meta tags, Open Graph cards, semantic HTML5 landmarks, and keyboard-navigable interactive components.
- **Recruiter-Friendly:** Includes an interactive Academic CV / Resume preview modal with direct print and Save-as-PDF capabilities.

---

## 🚀 Tech Stack

- **Framework:** [React 18](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Styling:** Vanilla CSS design tokens with custom CSS variables (Dark/Light mode support)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Fonts:** Google Fonts (*Outfit*, *Plus Jakarta Sans*, *JetBrains Mono*)

---

## 📁 Project Structure

```text
personal website/
├── public/
│   └── favicon.svg                  # Modern teal data science emblem
├── src/
│   ├── components/
│   │   ├── Navbar.jsx               # Sticky navbar, scrollspy, theme toggle & drawer
│   │   ├── Hero.jsx                 # Intro, CTAs, interactive Python data terminal
│   │   ├── About.jsx                # Narrative background & core pillars
│   │   ├── CurrentFocus.jsx         # Active learning focus areas & status chips
│   │   ├── Timeline.jsx             # Chronological education & practical milestones
│   │   ├── Projects.jsx             # Category filtering container for projects
│   │   ├── ProjectCard.jsx          # Data-driven cards with architecture highlights
│   │   ├── Skills.jsx               # Grouped competencies without arbitrary ratings
│   │   ├── Contact.jsx              # Direct links, email copy & contact form
│   │   ├── Footer.jsx               # Brand info, quick links & back-to-top
│   │   └── ResumeModal.jsx          # Academic CV modal with print stylesheet
│   ├── data/
│   │   ├── projects.js              # Projects data (GlowMatch AI, SentinelShield, etc.)
│   │   ├── skills.js                # Categorized skill groups & learning focus items
│   │   └── experience.js            # Education & experience timeline data
│   ├── App.jsx                      # App root with theme state and modal management
│   ├── main.jsx                     # Vite React entrypoint
│   └── index.css                    # Comprehensive design system & component styles
├── index.html                       # HTML shell with SEO meta & fonts
├── package.json                     # Scripts and dependencies
├── vite.config.js                   # Vite configuration
├── ARCHITECTURE.md                  # System architecture document
├── PRD.md                           # Product requirements document
└── README.md                        # Documentation & setup guide
```

---

## 💻 Getting Started Locally

### Prerequisites
- Node.js (v18 or higher)
- npm (v9 or higher)

### Installation & Execution

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run development server:**
   ```bash
   npm run dev
   ```
   Open your browser and navigate to `http://localhost:5173`.

3. **Build production bundle:**
   ```bash
   npm run build
   ```
   The optimized production bundle will be generated inside the `dist/` directory.

4. **Preview production build locally:**
   ```bash
   npm run preview
   ```

---

## 🔍 Featured Projects Included

1. **GlowMatch AI:** AI-powered skincare recommendation system using vector embeddings, semantic search, and Streamlit.
2. **SentinelShield Web Protection System:** Python web application implementing token bucket rate limiting, request inspection, and defensive logging.
3. **Threat Intelligence Aggregator:** Automated pipeline for normalizing, deduplicating, and correlating threat indicators across multi-source feeds.
4. **Employee Leave Management API:** High-performance RESTful microservice built with FastAPI, Pydantic validation, and SQL persistence.

---

## 📬 Contact & Profiles

- **Developer:** Sayyed Kashaf
- **GitHub:** [https://github.com/sayyedkashaf](https://github.com/sayyedkashaf)
- **LinkedIn:** [https://www.linkedin.com/in/kashaf-sayyed-712635379](https://www.linkedin.com/in/kashaf-sayyed-712635379)
- **Email:** [kashafsayyed2008@gmail.com](mailto:kashafsayyed2008@gmail.com)
