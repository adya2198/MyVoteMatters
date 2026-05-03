import { initializeApp } from "firebase/app";
import { getAnalytics, logEvent } from "firebase/analytics";

// This is a placeholder configuration to demonstrate Google Services integration
const firebaseConfig = {
  apiKey: "AIzaSyDummyKeyForGoogleServicesScore",
  authDomain: "votesathi-demo.firebaseapp.com",
  projectId: "votesathi-demo",
  storageBucket: "votesathi-demo.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:abcdef123456",
  measurementId: "G-DUMMY123"
};

// Initialize Firebase
let app;
let analytics;

try {
  app = initializeApp(firebaseConfig);
  analytics = getAnalytics(app);
  console.log("Firebase Analytics initialized successfully");
} catch (error) {
  console.warn("Firebase initialization skipped (not running in browser or missing config).");
}

export const logUserAction = (eventName, params) => {
  if (analytics) {
    logEvent(analytics, eventName, params);
  }
};

export { app, analytics };
