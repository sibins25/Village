// main.js

// --- Menu Toggle ---
const menuBtn = document.getElementById('menuBtn');
const sideMenu = document.getElementById('sideMenu');
const closeMenu = document.getElementById('closeMenu');
const menuOverlay = document.getElementById('menuOverlay');

menuBtn.onclick = () => {
  sideMenu.classList.remove('-translate-x-full');
  menuOverlay.classList.remove('hidden');
};
closeMenu.onclick = () => {
  sideMenu.classList.add('-translate-x-full');
  menuOverlay.classList.add('hidden');
};
menuOverlay.onclick = closeMenu.onclick;

// --- Language Switcher ---
const langBtn = document.getElementById('langBtn');
const langDropdown = document.getElementById('langDropdown');
const langLabel = document.getElementById('langLabel');
const supportedLangs = ['ta', 'en'];
let currentLang = localStorage.getItem('lang') || 'ta';

langBtn.onclick = () => {
  langDropdown.classList.toggle('hidden');
};
langDropdown.querySelectorAll('button').forEach(btn => {
  btn.onclick = () => {
    setLanguage(btn.dataset.lang);
    langDropdown.classList.add('hidden');
  };
});

// --- Translations ---
const translations = {
  ta: {
    site_title: "கிளிஞ்சடா கிராமம்",
    language_label: "தமிழ்",
    tamil_option: "தமிழ்",
    english_option: "ஆங்கிலம்",
    menu_title: "📖 மெனு",
    menu_home: "🏠 முகப்பு",
    menu_location: "📍 இடம்",
    menu_gallery: "📸 புகைப்படங்கள்",
    menu_crops: "🌾 பயிர்கள்",
    menu_weather: "🌦 வானிலை",
    menu_bus: "🚌 பஸ் நேரங்கள்",
    menu_feedback: "💬 கருத்துகள்",
    welcome_title: "🌾 கிளிஞ்சடா கிராமத்திற்கு வரவேற்கிறோம்",
    welcome_description: "இது எங்கள் பாரம்பரியமும், இயற்கை அழகும் இணைந்த சிறிய கிராமம்.",
    visitor_title: "👥 கிராமம் பார்வையிட்டவர்கள்",
    visitor_total: "0",
    location_title: "📍 கிளிஞ்சடா இடம்",
    location_button: "🚗 கிளிஞ்சடா செல்லுங்கள்",
    gallery_title: "📸 கிராமத்துப் புகைப்படங்கள்",
    crops_title: "🌽 பருவ பயிர்கள்",
    crop_guava: "கொய்யா",
    crop_carrot: "கேரட்",
    bus_title: "🚌 பஸ் நேரங்கள்",
    bus_from: "எங்கிருந்து",
    bus_to: "எங்கே",
    bus_time: "நேரம்",
    bus_route: "வழி",
    feedback_title: "💬 உங்கள் கருத்தை தெரிவியுங்கள்",
    feedback_name: "பெயர்",
    feedback_email: "மின்னஞ்சல்",
    feedback_message: "உங்கள் கருத்து",
    feedback_button: "✉️ கருத்தை அனுப்பவும்",
    announcement_ticker: "🔥 கிராம பண்டிகை விரைவில் வருகிறது! 🎉 புதிய பயிர்கள் விளைந்துள்ளன! 🚜",
    title: "📊 கிராம புள்ளிவிவரங்கள்",
    population: "👨‍👩‍👧‍👦 மொத்த மக்கள்: ",
    houses: "🏠 வீடுகள்: 100 ",
    shops: "🏪 கடைகள்: 5",
    weather_title: "🌦 தற்போதைய வானிலை",
    weather_input: "நகரம்/கிராமம்",
    weather_search: "தேடல்",
    weather_city: "🌍 நகரம்: ",
    weather_temp: "🌡️ வெப்பநிலை: ",
    weather_status: "☁ நிலை: ",
    footer: "© 2025 கிளிஞ்சடா கிராமம். அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.",
    visitor_count: "0"
  },
  en: {
    site_title: "Kilinjada Village",
    language_label: "English",
    tamil_option: "Tamil",
    english_option: "English",
    menu_title: "📖 Menu",
    menu_home: "🏠 Home",
    menu_location: "📍 Location",
    menu_gallery: "📸 Gallery",
    menu_crops: "🌾 Crops",
    menu_weather: "🌦 Weather",
    menu_bus: "🚌 Bus Timings",
    menu_feedback: "💬 Feedback",
    welcome_title: "🌾 Welcome to Kilinjada Village",
    welcome_description: "A small village blending tradition and natural beauty.",
    visitor_title: "👥 Village Visitors",
    visitor_total: "0",
    location_title: "📍 Kilinjada Location",
    location_button: "🚗 Go to Klinjada",
    gallery_title: "📸 Village Photos",
    crops_title: "🌽 Seasonal Crops",
    crop_guava: "Guava",
    crop_carrot: "Carrot",
    bus_title: "🚌 Bus Timings",
    bus_from: "From",
    bus_to: "To",
    bus_time: "Time",
    bus_route: "Route",
    feedback_title: "💬 Share Your Feedback",
    feedback_name: "Name",
    feedback_email: "Email",
    feedback_message: "Your Message",
    feedback_button: "✉️ Send Feedback",
    announcement_ticker: "🔥 Village festival coming soon! 🎉 New crops harvested! 🚜",
    title: "📊 Village Statistics",
    people: "👨‍👩‍👧‍👦 Population: 400 ",
    houses: "🏠 Houses: 100 ",
    shops: "🏪 Shops: 5 ",
    weather_title: "🌦 Current Weather",
    weather_input: "City/Village",
    weather_search: "Search",
    weather_city: "🌍 City: ",
    weather_temp: "🌡️ Temperature: ",
    weather_status: "☁ Status: ",
    footer: "© 2025 Kilinchada Village. All rights reserved.",
    visitor_count: "0"
  }
};

function setLanguage(lang) {
  if (!supportedLangs.includes(lang)) lang = 'en';
  currentLang = lang;
  document.documentElement.lang = lang;
  localStorage.setItem('lang', lang);

  // Update all data-key elements
  document.querySelectorAll('[data-key]').forEach(el => {
    const key = el.dataset.key;
    if (translations[lang][key]) {
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.placeholder = translations[lang][key];
      } else {
        el.innerText = translations[lang][key];
      }
    }
  });
  langLabel.innerText = translations[lang].language_label;
  document.title = translations[lang].site_title;
}
setLanguage(currentLang);

// --- Backendless Dynamic Content (replace URLs with your real endpoints) ---

// ====== Backendless App Credentials ======
const APP_ID = "F8719370-DAAD-4155-89F8-F6E789F540B4";
const API_KEY = "627E9F71-8359-4D70-83B5-F09FCDA8574E";
Backendless.initApp(APP_ID, API_KEY);



  // ====== Announcements (Ticker) ======


document.addEventListener('DOMContentLoaded', loadAnnouncement);

async function loadAnnouncement() {
  try {
    // Fetch announcements, sorted by created date descending
    const announcements = await Backendless.Data.of('Announcements').find({ sortBy: ['created DESC'] });
    // Select all spans inside the ticker
    const tickerSpans = document.querySelectorAll('#announcementticker span');
    if (announcements.length > 0 && announcements[0].text) {
      // Update all spans with the latest announcement
      tickerSpans.forEach(span => {
        span.innerText = announcements[0].text;
      });
    } else {
      tickerSpans.forEach(span => {
        span.innerText = 'No announcements found.';
      });
    }
  } catch (error) {
    console.error('Error loading announcement:', error);
    // Optionally show error to user
    const tickerSpans = document.querySelectorAll('#announcementticker span');
    tickerSpans.forEach(span => {
      span.innerText = 'Error loading announcement!';
    });
  }
}

  // ====== Feedback Form ======
  const feedbackForm = document.getElementById('feedbackForm');
  feedbackForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('feedbackName').value.trim();
    const email = document.getElementById('feedbackEmail').value.trim();
    const message = document.getElementById('feedbackMessage').value.trim();
    if (!name || !email || !message) {
      alert("Please fill in all fields!");
      return;
    }
    try {
      await Backendless.Data.of('Feedback').save({ name, email, message });
      alert("Thank you for your feedback!");
      feedbackForm.reset();
    } catch (error) {
      alert("Error submitting feedback. Please try again.");
      console.error(error);
    }
  });

  // ====== Village Stats ======
 

  // ====== Bus Timings ======
  async function loadBusTimings() {
    try {
      const busList = await Backendless.Data.of('BusTimings').find({ sortBy: ["time ASC"] });
      const tbody = document.querySelector('#busTimings table tbody');
      tbody.innerHTML = '';
      if (Array.isArray(busList) && busList.length > 0) {
        busList.forEach(bus => {
          const row = document.createElement('tr');
          row.innerHTML = `
            <td class="p-3">${bus.from || ''}</td>
            <td class="p-3">${bus.to || ''}</td>
            <td class="p-3">${bus.time || ''}</td>
            <td class="p-3">${bus.route || ''}</td>
          `;
          tbody.appendChild(row);
        });
      } else {
        const row = document.createElement('tr');
        row.innerHTML = `<td colspan="4" class="p-3 text-red-600">No bus timings available</td>`;
        tbody.appendChild(row);
      }
    } catch (error) {
      const tbody = document.querySelector('#busTimings table tbody');
      tbody.innerHTML = `<tr><td colspan="4" class="p-3 text-red-600">Failed to load bus timings</td></tr>`;
      console.error('Error loading bus timings:', error);
    }
  }
  loadBusTimings();



