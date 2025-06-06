// Load Seasonal Fruits & Vegetables
fetch("seasonal-items/fruits-vegetables.json")
  .then((response) => response.json())
  .then((data) => {
    const container = document.getElementById("seasonalItems");
    container.innerHTML = "";
    data.items.forEach((item) => {
      const div = document.createElement("div");
      div.className = "text-center";
      div.innerHTML = `
        <img src="fruits-vegetables-images/${item.image}" alt="${item.name}" class="rounded shadow w-full h-32 object-cover mb-2" loading="lazy"/>
        <p class="text-sm font-medium">${item.name}</p>
      `;
      container.appendChild(div);
    });
  })
  .catch((error) => console.error("Error loading seasonal items:", error));

// Handle Public Villager Form Submission
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";
import app from './firebase-config.js';
const db = getFirestore(app);

document.getElementById("addVillagerPublicForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("publicVillagerName").value.trim();
  const age = parseInt(document.getElementById("publicVillagerAge").value);
  const door = document.getElementById("publicVillagerDoor").value.trim();
  const work = document.getElementById("publicVillagerWork").value.trim();
  const phone = document.getElementById("publicVillagerPhone").value.trim();

  if (!name || !age || !door || !work || !phone) return alert("All fields are required.");

  try {
    await addDoc(collection(db, "villagers"), {
      name,
      age,
      door,
      work,
      phone,
      timestamp: new Date()
    });

    e.target.reset();
    alert("✅ Your details have been submitted successfully!");
  } catch (err) {
    console.error("Error adding villager:", err);
    alert("❌ Failed to submit. Please try again.");
  }
});