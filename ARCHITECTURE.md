# ARCHITECTURE --- Sayyed Kashaf Personal Portfolio

## 1. Architecture Goal

Build a lightweight, responsive personal portfolio that is easy to
update as Kashaf adds projects, skills, certifications, and experience.

## 2. Recommended Stack

### Frontend

-   React
-   Vite
-   JavaScript or TypeScript
-   CSS / CSS Modules
-   Lucide React or another lightweight icon library

### Hosting

A static hosting platform such as Vercel, Netlify, or GitHub Pages can
be used.

### Repository

Keep the website in a dedicated GitHub repository, separate from
individual project repositories.

## 3. High-Level Architecture

``` text
                    ┌─────────────────────────┐
                    │        Visitor          │
                    └────────────┬────────────┘
                                 │
                                 ▼
                    ┌─────────────────────────┐
                    │   Portfolio Frontend    │
                    │     React + Vite        │
                    └────────────┬────────────┘
                                 │
             ┌───────────────────┼───────────────────┐
             ▼                   ▼                   ▼
      ┌──────────────┐    ┌──────────────┐    ┌──────────────┐
      │ Static Data  │    │ Project Data │    │ External     │
      │ About/Skills │    │ GitHub URLs  │    │ Links        │
      └──────────────┘    └──────────────┘    │ LinkedIn     │
                                               │ GitHub       │
                                               └──────────────┘
                                 │
                                 ▼
                    ┌─────────────────────────┐
                    │      Static Build       │
                    │ HTML + CSS + JS assets  │
                    └────────────┬────────────┘
                                 │
                                 ▼
                    ┌─────────────────────────┐
                    │       Web Hosting       │
                    └─────────────────────────┘
```

## 4. Page Structure

``` text
App
├── Navigation
├── Hero
├── About
├── CurrentFocus
├── EducationExperience
├── Projects
├── Skills
├── Contact
└── Footer
```

## 5. Recommended Folder Structure

``` text
kashaf-portfolio/
│
├── public/
│   ├── favicon.svg
│   └── images/
│
├── src/
│   ├── assets/
│   │
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx
│   │   ├── About.jsx
│   │   ├── CurrentFocus.jsx
│   │   ├── Timeline.jsx
│   │   ├── ProjectCard.jsx
│   │   ├── Skills.jsx
│   │   ├── Contact.jsx
│   │   └── Footer.jsx
│   │
│   ├── data/
│   │   ├── projects.js
│   │   ├── skills.js
│   │   └── experience.js
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── PRD.md
├── ARCHITECTURE.md
├── package.json
└── README.md
```

## 6. Data-Driven Project Architecture

Projects should be stored as data rather than duplicated JSX.

Example:

``` js
export const projects = [
  {
    title: "GlowMatch AI",
    description:
      "AI-powered skincare product recommendation system.",
    technologies: [
      "Python",
      "Streamlit",
      "Embeddings",
      "Generative AI"
    ],
    github:
      "https://github.com/sayyedkashaf/GlowMatch-AI"
  },
  {
    title: "Threat Intelligence Aggregator",
    description:
      "Python project for processing and correlating threat intelligence indicators.",
    technologies: [
      "Python",
      "Data Processing",
      "Cybersecurity"
    ],
    github:
      "https://github.com/sayyedkashaf/Threat-Intelligence-Aggregator"
  }
];
```

The `ProjectCard` component maps over this data.

## 7. Component Responsibilities

### Navbar

Responsibilities: - Display name/logo - Navigate to sections - Mobile
navigation - Highlight current section if implemented

### Hero

Responsibilities: - Name - Professional headline - Short introduction -
Primary CTA - GitHub and LinkedIn links

### About

Responsibilities: - Short personal introduction - Data science student
positioning

### CurrentFocus

Responsibilities: - Show active learning areas - Keep content short and
scannable

### Timeline

Responsibilities: - Render education and experience chronologically -
Support multiple entries

### ProjectCard

Responsibilities: - Project title - Description - Technology tags -
GitHub button - Optional live-demo button

### Skills

Responsibilities: - Display grouped skills - Avoid skill-rating bars
because they can imply unsupported precision

### Contact

Responsibilities: - Provide professional contact options - LinkedIn and
GitHub links

## 8. External Integrations

### GitHub

Primary profile: https://github.com/sayyedkashaf

Use direct repository links for projects.

Do not depend on GitHub API data for the initial version. Static project
data is simpler, faster, and more reliable.

### LinkedIn

Profile: https://www.linkedin.com/in/kashaf-sayyed-712635379

Open the profile in a new browser tab.

## 9. State Management

No global state management library is required for the initial
portfolio.

React local state is sufficient for: - Mobile menu - Theme toggle if
implemented - Small UI interactions

## 10. Performance Strategy

-   Keep dependencies minimal
-   Compress images
-   Prefer SVG icons
-   Lazy-load non-critical images
-   Avoid unnecessary animation libraries
-   Avoid large background videos
-   Keep project content static

## 11. SEO

Set:

``` text
Title:
Sayyed Kashaf | Data Science Student

Description:
Portfolio of Sayyed Kashaf, a B.Sc. Data Science student building projects across data analysis, AI, visualization, backend development, and cybersecurity.
```

Include: - Semantic headings - Meta description - Open Graph metadata -
Descriptive page title - Favicon

## 12. Security

Because the first version is a static portfolio:

-   Do not expose API keys in frontend code.
-   Do not put private credentials in GitHub.
-   External links should use safe target/rel attributes where
    appropriate.
-   If a contact form is added, use a trusted form backend rather than
    exposing email credentials.

## 13. Deployment Flow

``` text
Local Development
       │
       ▼
Git Commit
       │
       ▼
GitHub Repository
       │
       ▼
Static Hosting
       │
       ▼
Production Portfolio
```

Recommended workflow:

``` text
npm install
npm run dev
npm run build
```

Test the production build before deployment.

## 14. Future Architecture

The website can later evolve into:

``` text
Portfolio
├── Home
├── Projects
│   └── Individual Case Studies
├── Experience
├── Skills
├── Certificates
├── Blog / Learning Notes
└── Contact
```

A backend should only be introduced if the portfolio later needs
features such as authentication, a database, CMS functionality,
analytics storage, or a custom contact system.
