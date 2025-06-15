// Backendless App credentials
const APP_ID = "F8719370-DAAD-4155-89F8-F6E789F540B4";
const API_KEY = "627E9F71-8359-4D70-83B5-F09FCDA8574E";
const FEEDBACK_TABLE = "Feedback";

// Feedback form submission
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("feedbackForm");
  const nameInput = document.getElementById("feedbackName");
  const emailInput = document.getElementById("feedbackEmail");
  const messageInput = document.getElementById("feedbackMessage");

  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const message = messageInput.value.trim();

    if (!name || !email || !message) {
      alert("🙏 அனைத்து விவரங்களையும் பூர்த்தி செய்யவும்.");
      return;
    }

    try {
      const res = await fetch(`https://api.backendless.com/${APP_ID}/${API_KEY}/data/${FEEDBACK_TABLE}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message })
      });

      if (!res.ok) throw new Error("Failed");

      alert("🎉 உங்கள் கருத்துக்கு நன்றி!");
      form.reset();
    } catch (err) {
      alert("😢 தவறு ஏற்பட்டது. மீண்டும் முயற்சிக்கவும்.");
      console.error("Feedback error:", err);
    }
  });
});