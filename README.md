# 🎨 Convomate Frontend (React SPA)

[![React Version](https://img.shields.io/badge/React-19.0.0-blue.svg)](https://react.dev/)
[![React Router](https://img.shields.io/badge/React%20Router%20Dom-7.2.0-red.svg)](https://reactrouter.com/)
[![Bootstrap Version](https://img.shields.io/badge/Bootstrap-5.3.3-purple.svg)](https://getbootstrap.com/)
[![Hosting Platform](https://img.shields.io/badge/Hosted-Vercel-black.svg)](https://vercel.com/)

Welcome to the frontend application of **Convomate**, a responsive Single Page Application (SPA) that provides a user-friendly and modern interface for our AI-powered language tools and chatbot assistant.

---

## ⚡ Features

- **Auth Screens (OTP Logins):** Clean, validated forms for registering profiles, generating instant OTP validation codes via email, and securely storing JWT session credentials.
- **Smart Translation Tool:** Interactive interface supporting bidirectional translation across multiple languages.
- **Grammar Checker & Diff:** Analyzes entered paragraphs, suggests grammatical corrections, and displays beautiful side-by-side or inline diffs of the changes.
- **Text Summarizer:** Provides customizable summarizing capabilities for long documents or paragraphs.
- **AI Chatbot Interface:** Rich chat layout that dynamically updates with conversational logs, loading animations, and automatic scroll-to-bottom features.
- **🎙️ Voice Input System:** Integrated Web Speech API support that allows users to dictate text directly into translation, grammar checker, and chatbot panels.
- **Responsive Layout:** Engineered with React-Bootstrap and CSS to ensure smooth operation across mobile, tablet, and desktop viewports.

---

## 🛠️ Tech Stack & Libraries

- **Framework:** React 19.0.0
- **Routing:** React Router Dom v7.2.0 (leveraging public and protected route mappings)
- **Styling:** Vanilla CSS & Bootstrap 5 (via `react-bootstrap`)
- **Icons:** FontAwesome v6 React wrappers
- **Http Client:** Axios & Native Fetch
- **Diff Utility:** `diff` module for highlighted text reviews
- **Bundler:** Webpack 5 with Babel transpiler

---

## 📂 Project Structure

```bash
CONVOMATE-FRONTEND/
├── convomate/
│   ├── src/
│   │   ├── App.jsx             # Main router configuration & global state wrapper
│   │   ├── api.js              # Endpoint functions interfacing with the Spring Boot backend
│   │   ├── index.js            # Virtual DOM mounting point
│   │   ├── components/         # Reusable layouts, sections, and controls
│   │   │   ├── Layout/         # Header, Footer, TopBar navigation
│   │   │   ├── Sections/       # Summariser, ChatbotSection, TranslationModule, VoiceInput, etc.
│   │   │   └── Shared/         # Route protectors (ProtectedRoute, PublicRoute)
│   │   ├── context/            # AuthContext managing user sessions and tokens
│   │   └── pages/              # Page view components (HomePage, ChatbotPage, ModelPage, etc.)
│   ├── webpack.config.js       # Custom Webpack configuration for local dev and production builds
│   ├── .babelrc                # Babel presets for JSX parsing
│   └── package.json            # Scripts and dependencies list
```

---

## 🚀 Installation & Local Development

### Prerequisites
- **Node.js** (v18 or higher recommended)
- **npm** or **yarn**

### 1. Clone & Install Dependencies
Navigate to the `convomate` subdirectory and install NPM packages:
```bash
cd convomate
npm install
```

### 2. Configure Environment Variables
Create a `.env` file in the `convomate` folder:
```env
REACT_APP_BACKEND_URL=http://localhost:8080
```

### 3. Run Development Server
```bash
npm start
```
The server will boot locally at **[http://localhost:2031](http://localhost:2031)** (configured in Webpack config).

### 4. Build for Production
To bundle assets for production deployment:
```bash
npm run build
```

---

## 👥 Related Repositories

- ☕ **[CONVOMATE-BACKEND](https://github.com/Shevadesuyash/CONVOMATE-BACKEND)** - Spring Boot REST API core.
- 🐍 **[Convomate-Python-module](https://github.com/Shevadesuyash/Convomate-Python-module)** - Python NLP microservices.