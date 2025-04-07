# Brainly Frontend

This is the frontend application for Brainly, a modern web application built with React, TypeScript, and Vite.

## Features

- User authentication (Sign up, Sign in)
- Dashboard interface
- Content creation and management
- Real-time interactions

## Screenshots

### Sign Up Page

![Sign Up Page](./src/assets/images/signUp.png)

### Sign In Page

![Sign In Page](./src/assets/images/signIn.png)

### Dashboard

![Dashboard](./src/assets/images/dashboard%20picture.jpeg)

## Tech Stack

- React 18
- TypeScript
- Vite
- Modern CSS
- RESTful API integration

## Getting Started

1. Clone the repository
2. Install dependencies with `bun install`
3. Start the development server with `bun dev`
4. Build for production with `bun build`

## Project Structure

- `src/components`: Reusable UI components
- `src/pages`: Main application pages
- `src/hooks`: Custom React hooks
- `src/icons`: SVG icons as React components
- `src/assets`: Static assets

## Original Template Information

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```
