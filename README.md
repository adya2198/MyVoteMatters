# MyVoteMatters (VoteSathi)

VoteSathi is a comprehensive educational platform designed to empower citizens with knowledge about the voting process. It features a multilingual interface, accessibility controls, interactive learning modules, an AI-powered assistant (Gemini integration), a polling locator, and much more.

The project is divided into two main parts:
- `vote-sathi-web`: The frontend React application built with Vite.
- `backend`: The backend Node.js/Express service that handles AI interactions (Gemini API) and other services (e.g., Twilio for WhatsApp).

## Features

- **Multilingual Support (i18n):** Support for English, Hindi, and more.
- **Accessibility:** High contrast mode, text-to-speech, and resizable text.
- **AI Assistant:** Integration with Google's Gemini API to answer voting-related queries.
- **Educational Modules:** Step-by-step guides, interactive quizzes, and a comprehensive FAQ.
- **Tools:** Election calendar, candidate locator, polling station locator, and registration checker.

## Prerequisites

Make sure you have the following installed on your local machine:
- Node.js (v18 or higher recommended)
- npm (usually comes with Node.js)
- Git

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/adya2198/MyVoteMatters.git
cd MyVoteMatters
```

### 2. Setup the Backend

The backend is built with Node.js and Express.

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Environment Variables:
   Create a `.env` file in the `backend` directory with the following variables:
   ```env
   PORT=5000
   GEMINI_API_KEY=your_gemini_api_key_here
   # Add your Twilio credentials if using the WhatsApp features
   TWILIO_ACCOUNT_SID=your_twilio_sid
   TWILIO_AUTH_TOKEN=your_twilio_auth_token
   TWILIO_WHATSAPP_NUMBER=your_twilio_whatsapp_number
   ```
4. Start the backend server:
   ```bash
   npm run dev
   ```
   The backend will typically run on `http://localhost:5000`.

### 3. Setup the Frontend (vote-sathi-web)

The frontend is a React application built using Vite.

1. Open a new terminal window/tab and navigate back to the root of the project, then go into the frontend directory:
   ```bash
   cd vote-sathi-web
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Environment Variables:
   Create a `.env` file in the `vote-sathi-web` directory. You will need to specify the URL of your backend.
   ```env
   VITE_GEMINI_API_KEY=your_gemini_api_key_here
   # VITE_API_URL=http://localhost:5000 # If frontend directly calls backend
   ```
4. Start the frontend development server:
   ```bash
   npm run dev
   ```
   The frontend will typically run on `http://localhost:5173`.

## Technologies Used

### Frontend
- React 19
- Vite
- Framer Motion (Animations)
- React Router DOM (Routing)
- i18next (Internationalization)
- Lucide React (Icons)
- Vanilla CSS

### Backend
- Node.js
- Express
- @google/genai (Google Gemini API Integration)
- Twilio (WhatsApp API)
- dotenv (Environment Variables)

## Contributing

Contributions are welcome! Please fork the repository, make your changes, and submit a pull request.