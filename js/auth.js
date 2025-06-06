// js/auth.js
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";
import app from './firebase-config.js';

const auth = getAuth(app);

// 👇 Change this to your admin email
const ADMIN_EMAIL = "kld@kilinjada1.com";

document.getElementById("adminLoginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("adminEmail").value;
  const password = document.getElementById("adminPassword").value;

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    if (user.email === ADMIN_EMAIL) {
      console.log("✅ Admin logged in");
      alert("Login successful");

      // Hide all public content
      document.querySelectorAll("section").forEach(sec => sec.style.display = "none");

      // Show admin-only section
      document.getElementById("villagerAdminSection").style.display = "block";
    } else {
      alert("Access denied. Not an admin.");
    }

  } catch (error) {
    console.error("❌ Login failed:", error.message);
    alert("Login failed. Check credentials");
  }
});