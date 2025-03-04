# Spotify Clone - React + TypeScript + Vite

This project is a Spotify clone built with React, TypeScript, and Vite, providing a responsive and interactive music streaming interface.

## Features

### Navigation Bar
- **Fixed Position**: The navbar is fixed at the top of the viewport with proper content offset to ensure the main content is always visible
- **Responsive Design**: Fully responsive with a mobile-friendly toggle menu that appears on smaller screens
- **Search Functionality**: Integrated search input with custom styling that matches Spotify's design language
- **Smooth Transitions**: All interactive elements have smooth transitions for a polished user experience

## Development Setup

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```

## Component Documentation

### NavBar Component

The navigation bar has been designed with the following features:

1. **Fixed Positioning**:
   - The navbar stays fixed at the top of the viewport
   - Main content is automatically offset to prevent overlap with the navbar
   - Implemented with useEffect to dynamically calculate and apply the correct margin

2. **Responsive Design**:
   - Adapts to different screen sizes with media queries
   - On mobile devices, navigation links collapse into a toggle menu
   - Custom hamburger button animation for toggle state indication

3. **Search Functionality**:
   - Integrated search input with Spotify-inspired styling
   - Focus states with color transitions
   - Responsive sizing that adjusts based on viewport width

4. **Accessibility**:
   - Proper contrast ratios for text visibility
   - Interactive elements have appropriate hover and focus states
   - Semantic HTML structure for better screen reader support

These enhancements improve user experience across all devices while maintaining the Spotify design aesthetic.
