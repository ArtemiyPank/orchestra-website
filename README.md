# Atid Raziel Orchestra Website

This repository contains the source code for the official website of the **Atid Raziel School Orchestra**. The project is built with [Next.js](https://nextjs.org) and provides information about performances, achievements, and alumni of the orchestra. It supports English, Russian, and Hebrew and is optimized for both desktop and mobile browsers.

## Table of Contents
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Scripts](#scripts)
- [Internationalization](#internationalization)

## Features
- **Modern Next.js 15 application** using the app router and TypeScript
- **Responsive design** with [Tailwind CSS](https://tailwindcss.com)
- **Dynamic gallery and photo grid** with swipe, zoom, and share capabilities
- **Achievements carousel** and pages for alumni and performances
- **Theme switching** (light and dark) powered by `next-themes`
- **Multilingual content** managed by `next-i18next`
- **Serverless API routes** for serving images from the `public` directory

## Technology Stack
- **Next.js** – React framework with server and client components
- **TypeScript** – Static typing for safer code
- **Tailwind CSS** – Utility‑first styling
- **Framer Motion** – Animations
- **next-i18next** – Internationalization
- **next-themes** – Theme management

## Project Structure
```
src/
├── app/                # Application routes and pages
├── components/         # Reusable UI components
├── data/               # JSON data for performances, alumni, achievements
├── i18n/               # i18n initialization
├── styles/             # Global styles
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
└── utils/              # Helpers for data and images
public/
└── locales/            # Translation files (en, ru, he)
```

## Getting Started
1. **Clone the repository**
   ```bash
   git clone https://github.com/your-user/orchestra-website.git
   cd orchestra-website
   ```
2. **Install dependencies**
   ```bash
   npm install
   ```
3. **Start the development server**
   ```bash
   npm run dev
   ```
   The site will be available at `http://localhost:3000`.

## Scripts
- `npm run dev` – Start the development server
- `npm run build` – Create an optimized production build
- `npm run start` – Start the production server
- `npm run lint` – Run ESLint checks

## Internationalization
Content is available in English (`en`), Russian (`ru`), and Hebrew (`he`). Language files live in `public/locales`. The language is detected automatically but can also be changed using the language switcher in the navigation bar.

To add or update translations, edit the JSON files in `public/locales/<lang>` and restart the development server.
