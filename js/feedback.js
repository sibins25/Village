// js/feedback.js
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";
import app from "./firebase-config.js";

const db = getFirestore(app);

document.getElementById("feedbackForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("feedbackName").value.trim();
  const message = document.getElementById("feedbackMessage").value.trim();

  if (!name || !message) {
    alert("Please fill out both name and feedback message.");
    return;
  }

  try {
    await addDoc(collection(db, "feedback"), {
      name,
      message,
      timestamp: new Date()
    });
    alert("Feedback submitted successfully!");
    document.getElementById("feedbackForm").reset();
  } catch (error) {
    console.error("Error submitting feedback: ", error);
    alert("An error occurred. Please try again.");
  }
});