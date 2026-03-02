# Swayed Over Coffee ☕

A modern, single-page café website built with React, Vite, and Three.js.

It showcases **Swayed Over Coffee** with a rich landing experience, animated visuals, category-based menu sections, gallery highlights, and clear call-to-action ordering via WhatsApp.

## Features

- Interactive one-page layout with smooth section navigation
- Light / dark theme toggle
- Responsive design for desktop and mobile
- Category-based menu presentation
- Animated hero visuals powered by Three.js
- Gallery and contact-focused conversion flow

## Tech Stack

- React 19
- Vite 7
- Three.js
- ESLint 9

## Getting Started

### 1) Install dependencies

```bash
npm install
```

### 2) Start development server

```bash
npm run dev
```

The app runs locally at the URL shown in your terminal (typically `http://localhost:5173`).

## Available Scripts

- `npm run dev` – Start local development server
- `npm run build` – Create a production build
- `npm run preview` – Preview the production build locally
- `npm run lint` – Run ESLint checks

## Project Structure

```text
src/
	App.jsx        # Main app UI and sections
	App.css        # Component and section styling
	index.css      # Global styles and resets
	main.jsx       # React app entry point
public/
	logo.jpeg      # Brand logo
```

## Customization

- Update café content and menu items in `src/App.jsx`
- Replace branding assets in `public/`
- Adjust theme and layout styling in `src/App.css` and `src/index.css`

## Build for Production

```bash
npm run build
```

Generated files are output to the `dist/` directory.
