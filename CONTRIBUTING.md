# Contributing Guidelines

Thank you for your interest in contributing! While this is a personal portfolio repository, suggestions, bug reports, and improvements are welcome.

## 🎯 Ways to Contribute

- **Bug Reports**: Found a visual glitch, broken link, or accessibility issue? Open a [Bug Report](https://github.com/sayyedkashaf/kashaf-portfolio/issues/new?template=bug_report.yml).
- **Feature Ideas**: Have an idea for a better UX, new section, or enhancement? Open a [Feature Request](https://github.com/sayyedkashaf/kashaf-portfolio/issues/new?template=feature_request.yml).
- **Code Improvements**: Performance optimizations, accessibility fixes, design system consistency.
- **Documentation**: Typos, unclear instructions, missing examples.

## 🛠️ Development Setup

```bash
# Fork & clone your fork
git clone https://github.com/YOUR_USERNAME/kashaf-portfolio.git
cd kashaf-portfolio

# Install dependencies
npm install

# Start dev server
npm run dev
```

## 📝 Code Style

This project uses **ESLint + Prettier** (configure in `package.json`):

```bash
# Check linting
npm run lint

# Check formatting
npm run format:check

# Auto-fix formatting
npm run format
```

### Guidelines

- **Components**: One component per file, PascalCase naming (`ProjectCard.jsx`)
- **Data**: Keep content in `src/data/` — no hardcoded strings in JSX
- **Styles**: Use CSS custom properties from `index.css` design system
- **Accessibility**: Semantic HTML, ARIA labels, keyboard navigation, color contrast
- **Commits**: Conventional commits (`feat:`, `fix:`, `docs:`, `refactor:`, `style:`)

## 🎨 Design System

All styling lives in `src/index.css` using CSS custom properties:

```css
:root {
  --accent-primary: #14b8a6;
  --bg-primary: #080d1a;
  --card-bg: rgba(14, 22, 40, 0.7);
  --radius-md: 14px;
  --transition-base: 0.3s ease;
}
```

> **Do not** add arbitrary colors, spacing, or fonts — extend the design system instead.

## 🔍 Before Submitting

1. **Build passes**: `npm run build` completes without errors
2. **Lint clean**: `npm run lint` shows no warnings
3. **Format clean**: `npm run format:check` passes
4. **Test manually**: Verify dark/light mode, mobile responsive, keyboard nav

## 📋 Pull Request Process

1. Create a feature branch: `git checkout -b feat/your-feature-name`
2. Make focused, atomic commits
3. Push to your fork
4. Open PR against `main` with:
   - Clear title (`feat: add project filtering by tech stack`)
   - Description of changes
   - Screenshots for UI changes
   - Link related issues

## 🤝 Code of Conduct

Be respectful. This is a student learning project — constructive feedback only.

## 📬 Questions?

Open a [Discussion](https://github.com/sayyedkashaf/kashaf-portfolio/discussions) or email: kashafsayyed2008@gmail.com