// view-villagers.js
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";
import app from './firebase-config.js';

const db = getFirestore(app);
const villagersList = document.getElementById("villagersList");
const villagerAdminSection = document.getElementById("villagerAdminSection");

export async function loadVillagers() {
  try {
    const snapshot = await getDocs(collection(db, "villagers"));
    if (snapshot.empty) {
      villagersList.innerHTML = "<p class='text-gray-500'>No villagers found.</p>";
      return;
    }

    
    let tableHTML = `
      <table class="w-full table-auto border border-gray-300 text-sm">
        <thead class="bg-gray-100">
          <tr>
            <th class="border px-3 py-2">Name</th>
            <th class="border px-3 py-2">Age</th>
            <th class="border px-3 py-2">Door No.</th>
            <th class="border px-3 py-2">Work</th>
            <th class="border px-3 py-2">Phone</th>
          </tr>
        </thead>
        <tbody>
    `;

    snapshot.forEach((doc) => {
      const v = doc.data();
      tableHTML += `
        <tr>
          <td class="border px-3 py-1">${v.name}</td>
          <td class="border px-3 py-1">${v.age}</td>
          <td class="border px-3 py-1">${v.door}</td>
          <td class="border px-3 py-1">${v.work}</td>
          <td class="border px-3 py-1">${v.phone}</td>
        </tr>
      `;
    });

    tableHTML += "</tbody></table>";
    villagersList.innerHTML = tableHTML;
    villagerAdminSection.classList.remove("hidden");
  } catch (error) {
    console.error("Error loading villagers:", error);
    villagersList.innerHTML = "<p class='text-red-600'>Failed to load villagers.</p>";
  }
}