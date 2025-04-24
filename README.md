# AI‑Med Assist

**Lead AI‑ML Developer:** Your Name  
**Role:** Predictive modeling, intelligent chatbot, full backend architecture, frontend contributions

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Features Implemented](#features-implemented)
3. [Tech Stack](#tech-stack)
4. [Architecture](#architecture)
5. [Getting Started](#getting-started)
   - Prerequisites
   - Installation
   - Environment Variables
   - Running the App
6. [Project Structure](#project-structure)
7. [Current Status](#current-status)
8. [Future Work](#future-work)
9. [Contributing](#contributing)
10. [License](#license)
11. [Contact](#contact)

---

## Project Overview

AI‑Med Assist is a personalized healthcare assistant that leverages user‑specific medical data to deliver context‑aware insights and recommendations. The system features a predictive AI/ML engine and an interactive chatbot.

---

## Features Implemented

- **User Management**

  - Sign up, login, JWT‑based authentication
  - Profile management, including image upload and health metrics

- **Medical Conditions Module**

  - CRUD for user’s medical conditions
  - Searchable dropdown of diseases from MongoDB dataset

- **AI Chatbot (AI‑Med Assist)**

  - Personalized greeting with motivational quote
  - Contextual prompt engineering using user profile data
  - Real‑time conversation persistence and session history
  - Delete and retrieve past sessions
  - Dark‑themed, responsive UI with Framer Motion animations

- **Predictive AI/ML**

  - Integration with Google Gemini API for generating medical-aware responses

- **Full Backend**

  - Node.js + Express API
  - MongoDB with Mongoose schemas for Users, ChatSessions, Diseases
  - File‑upload endpoint (multer) for bulk disease dataset import

- **Frontend**
  - Vite + React + TypeScript
  - TailwindCSS for styling
  - React Router for navigation
  - Context API for global auth state
  - Modular components (Chatbot, Sidebar, Modals, Pages)

---

## Tech Stack

| Layer    | Technology                                          |
| -------- | --------------------------------------------------- |
| Frontend | React, TypeScript, Vite, TailwindCSS, Framer Motion |
| Backend  | Node.js, Express, Mongoose, Multer                  |
| Database | MongoDB Atlas                                       |
| AI/ML    | Google Gemini API, Custom prompt engineering        |
| DevOps   | (TBD: Docker, CI/CD)                                |

---

## Architecture

```
[ Client (React) ] ←→ [ Express API ] ←→ [ MongoDB Atlas ]
                          ↑
                    [ Google Gemini ]
```

- **Frontend**: Renders UI, manages routes & state, calls REST endpoints
- **Backend**: Auth, user/profile, chat history, disease dataset, file‑upload, AI proxy
- **AI Layer**: Gemini 2.0 Flash for generating medical-aware responses

---

## Getting Started

### Prerequisites

- Node.js v16+
- npm or yarn
- MongoDB Atlas account (or local MongoDB)
- Google Gemini API Key

### Installation

1. **Clone repo**

   ```bash
   git clone <YOUR_REPO_URL>
   cd ai-med-assist
   ```

2. **Backend**

   ```bash
   cd backend
   npm install
   ```

3. **Frontend**
   ```bash
   cd ../frontend
   npm install
   ```

### Environment Variables

Create a `.env` file in `backend/` with:

```env
PORT=5000
MONGODB_URI=<your-mongo-uri>
GOOGLE_API_KEY=<your-gemini-api-key>
```

### Running the App

In two terminals:

```bash
# Backend
cd backend
npm run dev

# Frontend
cd frontend
npm run dev
```

Open `http://localhost:5173` in your browser.

---

## Project Structure

```
/backend
  /config/db.js
  /controllers
  /models
  /routes
  server.js
/frontend
  /src
    /components
    /pages
    /modals
    /services
    /context
  App.tsx
  main.tsx
```

---

## Current Status

| Module                  | Status         |
| ----------------------- | -------------- |
| User Auth & Profile     | ✅ Complete    |
| Medical Conditions CRUD | ✅ Complete    |
| Chatbot + History       | ✅ Complete    |
| Predictive Models       | ⚙️ In Progress |
| Deployment Scripts      | ⚙️ In Progress |

---

## Future Work

- **IoT Integration for Proactive Care**  
  Incorporate wearable and home‑sensor data (e.g. heart rate, sleep patterns, glucose monitors) via IoT devices to proactively detect anomalies and push real‑time alerts and insights to AI‑Med Assist.

- **Enhanced Predictive Analytics**  
  Build models that forecast risk trajectories (e.g. hospitalization risk) using time‑series health data.

- **Mobile App**  
  Develop a companion mobile application for on‑the‑go health monitoring and chat access.

---

## Contributing

1. Fork the repo
2. Create a feature branch (`git checkout -b feature/XYZ`)
3. Commit your changes (`git commit -m "Add XYZ"`)
4. Push to branch (`git push origin feature/XYZ`)
5. Open a Pull Request

---

## License

[MIT](LICENSE)

---

## Contact

**Lead AI‑ML Developer:** DEENATHAYALAN CK  
Email: deenathayalanck@gmail.com  
Portfolio: https://deenathayalanck.github.io/CK-portfolio/
