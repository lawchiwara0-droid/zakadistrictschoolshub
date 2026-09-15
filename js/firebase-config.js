/**
 * Zaka District Schools Hub — Firebase initialization
 *
 * This file only connects the site to the Firebase project.
 * It does NOT add login, does NOT add data access, and does NOT
 * change anything about the public Hub (index.html / ed46.html).
 * Other files (built in later steps) will import `auth` and `db`
 * from here when they need to sign in or read/write Firestore.
 *
 * Uses CDN module imports because this project is plain HTML/CSS/JS
 * on GitHub Pages — no npm/bundler build step.
 */

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js";

// This apiKey is a public identifier, not a secret — real protection
// comes from Firebase Authentication + Firestore Security Rules.
const firebaseConfig = {
  apiKey: "AIzaSyBGK_Se8HpUosUKAoegERGnPnu0_gbC40Q",
  authDomain: "zaka-district-schools-hub.firebaseapp.com",
  projectId: "zaka-district-schools-hub",
  storageBucket: "zaka-district-schools-hub.firebasestorage.app",
  messagingSenderId: "545827090999",
  appId: "1:545827090999:web:6fb870034ec81887d145b2",
  measurementId: "G-QJW2WBXMT4"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
