# Harshavardhan's Portfolio

A modern, animated portfolio website built with React, TypeScript, and Tailwind CSS.

## Features

- **Modern UI/UX** - Glassmorphism, gradients, and smooth animations
- **Dark Theme** - Sleek dark mode design
- **Fully Responsive** - Optimized for all screen sizes
- **Performance Optimized** - Lazy loading, code splitting, and optimized animations
- **SEO Friendly** - Meta tags and semantic HTML
- **Easy to Customize** - Content stored in JSON files

## Tech Stack

| Category | Technology | Purpose |
|----------|------------|---------|
| Framework | React 19 + Vite 8 | UI library + fast build tool with HMR |
| Language | TypeScript 6 | Type-safe JavaScript |
| Styling | Tailwind CSS v4 | Utility-first CSS framework |
| Animations | Framer Motion | Declarative React animations |
| Animations | GSAP | High-performance scroll-based animations |
| Smooth Scroll | Lenis | Smooth scrolling with momentum |
| Icons | React Icons | Icon library with multiple icon packs |
| Utilities | clsx + tailwind-merge | Conditional class names without conflicts |

## Project Structure

```
src/
├── components/
│   ├── common/      # Shared components (Navbar, ScrollIndicator, etc.)
│   ├── sections/    # Page sections (Hero, About, Skills, etc.)
│   └── ui/          # Reusable UI components (Button, Badge, etc.)
├── data/            # JSON content files
├── hooks/           # Custom React hooks
├── styles/          # Global styles and Tailwind config
└── utils/           # Utility functions and animation configs
```

## Customization

### Update Content

All content is stored in JSON files in `src/data/`:

- `content.json` - Personal info, stats, navigation
- `skills.json` - Skills and proficiency levels
- `experience.json` - Work experience
- `projects.json` - Project showcase
- `achievements.json` - Achievements and testimonials

### Update Theme Colors

Edit the CSS variables in `src/styles/index.css` under `@theme`.

## Getting Started

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview
```

## Remote Access with ngrok

To access your dev server from external devices or share with others using [ngrok](https://ngrok.com/):

### Setup

1. Install ngrok: `brew install ngrok` (macOS) or download from [ngrok.com](https://ngrok.com/download)
2. Authenticate: `ngrok config add-authtoken YOUR_TOKEN`

### Usage

```bash
# Terminal 1: Start dev server with ngrok support
pnpm run dev:ngrok

# Terminal 2: Start ngrok tunnel
ngrok http localhost:5173
```

The `dev:ngrok` script sets the `__VITE_ADDITIONAL_SERVER_ALLOWED_HOSTS` environment variable to allow ngrok domains, bypassing Vite's host check security.

> **Note:** The standard `pnpm dev` won't work with ngrok due to Vite 8's host validation. Always use `dev:ngrok` when tunneling.

## Deployment

This project is configured for GitHub Pages deployment. Push to `main` or `master` branch to trigger automatic deployment.

### Manual Deployment

1. Build the project: `pnpm build`
2. The output will be in the `dist/` folder
3. Deploy the `dist/` folder to your hosting provider

## License

MIT License - feel free to use this template for your own portfolio!

## Author

**Harshavardhan S**
- GitHub: [@harsha-snoogs](https://github.com/harsha-snoogs)
- LinkedIn: [harsha-vardhan](https://linkedin.com/in/harsha-vardhan)
