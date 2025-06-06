import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";
import app from './firebase-config.js'; //  FIXED default import

const db = getFirestore(app);
const announcementBox = document.getElementById("announcementBox");

async function loadAnnouncement() {
  try {
    const docRef = doc(db, "village", "announcement");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      announcementBox.innerHTML = `
        <div class="bg-yellow-100 p-3 rounded border-l-4 border-yellow-500 shadow">
          <h3 class="font-semibold text-yellow-800">📢 Announcement</h3>
          <p class="text-yellow-700 mt-1">${data.message}</p>
        </div>
      `;
    } else {
      announcementBox.innerHTML = `<p class="text-gray-500">No announcement found.</p>`;
    }
  } catch (error) {
    console.error("Error loading announcement:", error);
    announcementBox.innerHTML = `<p class="text-red-500">⚠️ Failed to load announcement.</p>`;
  }
}

loadAnnouncement();