// js/firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";

const firebaseConfig = {
  apiKey: "AIzaSyDsvj-G2PY8FZtJ8rvYMClf17GnbNBdiJg",
  authDomain: "kilinjada-village.firebaseapp.com",
  projectId: "kilinjada-village",
  storageBucket: "kilinjada-village.firebasestorage.app",
  messagingSenderId: "145658439838",
  appId: "1:145658439838:web:e455bb7561741c52fe738f",
  measurementId: "G-MDK6VZTDHK"
};

const app = initializeApp(firebaseConfig);

export default app;
