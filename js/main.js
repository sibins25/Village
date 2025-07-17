// 1. Scroll-triggered fade-in animation
document.addEventListener("DOMContentLoaded", function () {
  const animatedEls = document.querySelectorAll('.scroll-animate');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  animatedEls.forEach(el => observer.observe(el));
});

// 2. Side menu logic
document.addEventListener("DOMContentLoaded", function() {
  const menuBtn = document.getElementById('menuBtn');
  const sideMenu = document.getElementById('sideMenu');
  const closeMenu = document.getElementById('closeMenu');
  const menuOverlay = document.getElementById('menuOverlay');
  menuBtn.onclick = () => {
    sideMenu.classList.add('open');
    menuOverlay.classList.remove('hidden');
    menuOverlay.classList.add('show');
  };
  closeMenu.onclick = closeMenuAndOverlay;
  menuOverlay.onclick = closeMenuAndOverlay;
  function closeMenuAndOverlay() {
    sideMenu.classList.remove('open');
    menuOverlay.classList.add('hidden');
    menuOverlay.classList.remove('show');
  }
  document.querySelectorAll('.menu-link').forEach(link => {
    link.onclick = () => {
      closeMenuAndOverlay();
    };
  });
});

// 3. Language switcher logic
document.addEventListener("DOMContentLoaded", function() {
  const langBtn = document.getElementById('langBtn');
  const langDropdown = document.getElementById('langDropdown');
  langBtn.onclick = (e) => {
    e.stopPropagation();
    langDropdown.classList.toggle('hidden');
  };
  document.body.onclick = () => {
    langDropdown.classList.add('hidden');
  };
  langDropdown.onclick = (e) => e.stopPropagation();

  // Translations
  const translations = {
    en: {
      site_title: "Kilinjada Village",
      language_label: "English",
      tamil_option: "Tamil",
      english_option: "English",
      menu_home: "🏠Home",
      menu_location: "📍Location",
      menu_gallery: "📸Gallery",
      menu_crops: "🌾Crops",
      menu_bus: "🚌Bus Timings",
      menu_calendar:"📅 Calendar",
      title: "📊Village Stats",
      name:"Name",
      message:"Your Message",
      menu_weather: "🌦Weather",
      menu_feedback: "💬Feedback",
      welcome_title: "🌾Welcome to Kilinjada Village",
      welcome_description: "A small village blending tradition and natural beauty.",
      location_title: "📍Kilinjada Location",
      location_button: "Go to Kilinjada",
      gallery_title: "📸Village Photos",
      season: "🌾Seasonal Crops",
      calendar:"📅 Calendar",
      bus_title: "🚌Bus Timings",
      bus_from: "From",
    
      bus_to: "To",
      bus_time: "Time",
      note: "Note",
      menu_home2:"📊About",
      exception: "All the above buses will pass through Kilinjada",
      people: " 👨‍👩People: <span>400</span>",
      houses: " 🏠Houses: <span>100</span>",
      shops: "🏪 Shops: <span>5</span>",
      weather_title: "🌦Kilinjada Village Weather",
      weather_village: "Kilinjada Village",
      weather_label: "Weather",
      weather_placeholder: "Weather details can be added here.",
      feedback_name_placeholder: "Name",
      feedback_message_placeholder: "Your message",
      feedback_submit: "Submit",
      about_title: "About Kilinjada Village",
          about_title: "About Kilinjada Village",
          feedback:"💬feedback",

                
  fruit_chayote: "Chow chow",
  fruit_guava: "Guava",
  fruit_carrot: "Carrot",
  fruit_cabbage: "Cabbage",
  fruit_cauliflower: "Cauliflower",
  fruit_beans: "Beans",
  fruit_plums: "Plums",
  fruit_potato: "Potato",
  fruit_broccoli: "Broccoli",
  Announcement:"🗞️ Announcement",
    about_text: "Kilinjada village is filled with peace and greenery. It is known for traditional farming, culture, kind people, natural beauty, and joyful festivals.",

    // Section titles
    bus_title: "🚌 Bus Timings",
    bus_from: "From",
    bus_to: "To",
    bus_time: "Time",
     submit:"submit",
    kil:"🚌Kilinjada ➝ Coonoor",
    coon:"🚌Coonoor ➝  Kilinjada",
    show:"🔁All busses",
      label_schools: "Schools",
  label_churches: "Churches",
  label_temples: "Temples",
  btn_show_more: "Show More",
  btn_show_less: "Show Less",

    footer:"© 2025 Kilnjada Village. All rights are reserved ",

    // Notes
    note: "Note:",
    exception: "All the above buses go via Kilinjada.",
    at_coonoor: "(at Coonoor)",
    at_kilinjada: "(at Kilinjada)",

    // Bus stops (From/To)
    from_1: "Kilinjada",      to_1: "Coonoor",
    from_2: "Coonoor",        to_2: "Kilinjada",
    from_3a: "Coonoor",       to_3a: "Thudurmattam",
    from_3b: "Coonoor",       to_3b: "Thudurmattam",
    from_3c: "Coonoor",       to_3c: "Thudurmattam",
    from_3d: "Coonoor",       to_3d: "Sattan",
    from_3e: "Coonoor",       to_3e: "Thudurmattam",
    from_3f: "Coonoor",       to_3f: "Thudurmattam",
    from_3g: "Coonoor",       to_3g: "Sattan",
    from_3h: "Thudurmattam",  to_3h: "Coonoor",
    from_3i: "Sattan",        to_3i: "Coonoor",
    from_3j: "Palamara",     to_3j: "Coonoor",
    from_3k: "Thudurmattam",  to_3k: "Coonoor",
    from_3l: "Kottakkal",     to_3l: "Coonoor",
    from_4: "Coonoor",        to_4: "Kolacambai",
    from_4b: "Coonoor",       to_4b: "Kolacambai",
    from_4c: "Coonoor",       to_4c: "Kolacambai",
    from_5: "Coonoor",         to_5a: "Kolacambai",
                               to_5b: "Thudurmattam",
     from_5b: "Coonoor",    
     from_5a: "Coonoor",        to_5: "Kolacambai",
    from_6: "Coonoor",        to_6: "Kottakkal",
    about_text:`"Kilinjada Village is a peaceful, green place known for its traditional farming, vibrant culture, kind-hearted people, beautiful scenery, and joyful festivals celebrated together."`
    },
    ta: {
          fruit_chayote: "சவ் சவ்",
  fruit_guava: "கொய்யா",
  fruit_carrot: "காரட்",
  fruit_cabbage: "முட்டைக்கோஸ்",
  fruit_cauliflower: "பூக்கோஸ்",
  fruit_beans: "பீன்ஸ்",
  fruit_plums: "பிளம்ஸ்",
  fruit_potato: "உருளைக்கிழங்கு",
  fruit_broccoli: "ப்ரோகொலி",
      site_title: "கிளிஞ்சடா கிராமம்",
      language_label: "தமிழ்",
      tamil_option: "தமிழ்",
      english_option: "English",
      menu_home: "🏠முகப்பு",
      menu_location: "📍இடம்",
       label_schools: "பள்ளிகள்",
        name:"பெயர்",
      message:"உங்கள் கருத்து",
      submit:"அனுப்பு",
  label_churches: "தேவாலயங்கள்",
  label_temples: "கோவில்கள்",
  btn_show_more: "மேலும் காண்க",
  btn_show_less: "குறைவு காண்க",
      menu_gallery: "📸புகைப்படங்கள்",
      menu_calendar:"📅 காலண்டர்",
      menu_crops: "🌾பயிர்கள்",
      menu_bus: "🚌பஸ் நேரங்கள்",
      title: "📊கிராம புள்ளிவிவரங்கள்",
      menu_weather: "🌦வானிலை",
      menu_feedback: "💬கருத்துகள்",
      welcome_title: "🌾கிளிஞ்சடா கிராமத்திற்கு வரவேற்கிறோம்",
      welcome_description: "இது எங்கள் பாரம்பரியமும், இயற்கை அழகும் இணைந்த சிறிய கிராமம்.",
      location_title: "📍கிளிஞ்சடா இடம்",
      location_button: "கிளிஞ்சடா செல்லுங்கள்",
      gallery_title: "📸கிராமத்துப் புகைப்படங்கள்",
      season: "🌾பருவ பயிர்கள்",
           calendar:"📅 காலண்டர்",
      bus_title: "🚌பஸ் நேரங்கள்",
      bus_from: "எங்கிருந்து",
      bus_to: "எங்கே",
      bus_time: "நேரம்",


      note: "குறிப்பு",
      footer:"© 2025 கிளிஞ்சடா கிராமம். அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.",
      exception: "மேலுள்ள அனைத்து பேருந்துகளும் கிளிஞ்சடா வழியாக செல்லும்.",
      people: "👨‍👩‍👧‍👦மக்கள்: <span>400</span>",
      houses: "🏠வீடுகள்: <span>100</span>",
      shops: "🏪 கடைகள்: <span>5</span>",
      weather_title: "🌦கிளிஞ்சடா கிராமம் வானிலை",
      weather_village: "கிளிஞ்சடா கிராமம்",
      weather_label: "வானிலை",
      weather_placeholder: "இங்கு வானிலை விவரங்கள் சேர்க்கலாம்.",
      feedback_name_placeholder: "பெயர்",
      feedback_message_placeholder: "உங்கள் கருத்து",
      feedback_submit: "அனுப்பு",
      about_title: "📊கிளிஞ்சடா கிராமம் பற்றி",
      at_kilinjada: "(கிளிஞ்சடாவில்)",
      at_coonoor: "(குன்னூரில்)",
      feedback:"💬 கருத்துகள்",
      menu_home2:"📊பற்றி",

    // Bus stops (From/To)
    from_1: "கிளிஞ்சடா",      to_1: "குன்னூர்",
    from_2: "குன்னூர்",        to_2: "கிளிஞ்சடா",
    from_3a: "குன்னூர்",       to_3a: "தூதூர்மட்டம்",
    from_3b: "குன்னூர்",       to_3b: "தூதூர்மட்டம்",
    from_3c: "குன்னூர்",       to_3c: "தூதூர்மட்டம்",
    from_3d: "குன்னூர்",       to_3d: "சட்டன்",
    from_3e: "குன்னூர்",       to_3e: "தூதூர்மட்டம்",
    from_3f: "குன்னூர்",       to_3f: "தூதூர்மட்டம்",
    from_3g: "குன்னூர்",       to_3g: "சட்டன்",
    from_3h: "தூதூர்மட்டம்",  to_3h: "குன்னூர்",
    from_3i: "சட்டன்",         to_3i: "குன்னூர்",
    from_3j: "பால்மாரா",     to_3j: "குன்னூர்",
    from_3k: "தூதூர்மட்டம்",  to_3k: "குன்னூர்",
    from_3l: "கோட்டக்கல்",     to_3l: "குன்னூர்",
    from_4: "குன்னூர்",        to_4: "கொலைகாம்பை",
    from_4b: "குன்னூர்",       to_4b: "கொலைகாம்பை",
    from_4c: "குன்னூர்",       to_4c: "கொலைகாம்பை",
    from_5: "குன்னூர்",
     from_5b: "குன்னூர்",        to_5a: "கொலைகாம்பை",
                               to_5b: "தூதூர்மட்டம்",
     from_5a: "குன்னூர்",        to_5: "கொலைகாம்பை",
    from_6: "குன்னூர்",        to_6: "கோட்டக்கல்",
    kil:"🚌 கிளிஞ்சடா ➝ குன்னூர்",
    coon:"🚌 குன்னூர் ➝ கிளிஞ்சடா",
    Announcement:"🗞️ அறிவிப்புகள்",
    show:"🔁 எல்லா பேருந்துகளும்",
    about_text:"கிளிஞ்சடா கிராமம் அமைதியும் பசுமையும் நிறைந்தது. பாரம்பரிய வேளாண்மை, பண்பாடு, நல்லவர்கள், இயற்கை அழகு, மகிழ்ச்சியான திருவிழாக்கள் புகழ்பெற்றது."
     }
  };

  document.querySelectorAll('#langDropdown button').forEach(btn => {
    btn.onclick = function() {
      const lang = this.getAttribute('data-lang');
      setLanguage(lang);
      document.getElementById('langLabel').textContent = this.textContent;
      langDropdown.classList.add('hidden');
    };
  });

  function setLanguage(lang) {
    const dict = translations[lang];
    if (!dict) return;
    document.querySelectorAll('[data-key]').forEach(el => {
      const key = el.getAttribute('data-key');
      if (dict[key]) {
        if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") {
          el.placeholder = dict[key];
        } else if (key === "people" || key === "houses" || key === "shops") {
          el.innerHTML = dict[key];
        } else {
          el.textContent = dict[key];
        }
      }
    });
    document.title = dict.site_title;
  }
});

// 4. Gallery/Crops Scroll Buttons
window.scrollGallery = function(containerId, direction) {
  const container = document.getElementById(containerId);
  if (!container) return;
  const firstChild = container.querySelector(':scope > *');
  const scrollAmount = firstChild ? firstChild.offsetWidth + 32 : 300;
  container.scrollBy({
    left: direction * scrollAmount,
    behavior: 'smooth'
  });
};

// 5. Weather API (WeatherAPI.com)
const weatherApiKey = 'b10632c504034b9ab9a171528250506'; // Replace with your API key
const locationName = "Coimbatore"; // Or use "Kilinjada" if recognized, or lat/lon
async function fetchWeather() {
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=${weatherApiKey}&q=${encodeURIComponent(locationName)}&lang=ta`
    );
    if (!response.ok) throw new Error("Weather data not available");
    const data = await response.json();
    const temp = data.current.temp_c;
    const humidity = data.current.humidity;
    const condition = data.current.condition.text;
    const iconUrl = "https:" + data.current.condition.icon;
    document.getElementById("weather_temp").textContent = `${temp} °C`;
    document.getElementById("weather_humidity").textContent = `ஈரப்பதம்: ${humidity}%`;
    document.getElementById("weather_condition").textContent = condition;
    document.getElementById("weather_icon").src = iconUrl;
    document.getElementById("weather_icon").alt = condition;
  } catch (error) {
    document.getElementById("weather_placeholder").textContent = "வானிலை பெற முடியவில்லை.";
  }
}
fetchWeather();

// 6. Feedback Form (Backendless)
const APP_ID = "F8719370-DAAD-4155-89F8-F6E789F540B4";
const API_KEY = "99384368-B200-4E07-9314-51301C9EA974";



// 7. Announcement ticker fetch
const ANNOUNCE_TABLE = "announcement";
async function fetchLatestAnnouncement() {
  const displayEl = document.getElementById('latestAnnouncement');
  try {
    const response = await fetch(
      `https://api.backendless.com/${APP_ID}/${API_KEY}/data/${ANNOUNCE_TABLE}?pageSize=1&sortBy=created%20desc`
    );
    const data = await response.json();
    if (Array.isArray(data) && data.length > 0) {
      displayEl.textContent = data[0].message;
    } else {
      displayEl.textContent = "இப்போது அறிவிப்பு இல்லை.";
    }
  } catch (error) {
    displayEl.textContent = "அறிவிப்பை பெற முடியவில்லை.";
    console.error(error);
  }
}
fetchLatestAnnouncement();
document.addEventListener("DOMContentLoaded", function () {
  const aboutSection = document.getElementById('about');
  if (aboutSection) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          aboutSection.classList.add('visible');
          observer.unobserve(aboutSection);
        }
      });
    }, { threshold: 0.15 });
    observer.observe(aboutSection);
  }
});

const CONTACT_TABLE = "contactinfo";

async function fetchContactInfoFooter() {
  const footerEl = document.getElementById('footerContactInfo');
  if (!footerEl) return;

  try {
    const response = await fetch(
      `https://api.backendless.com/${APP_ID}/${API_KEY}/data/${CONTACT_TABLE}?pageSize=1&sortBy=created%20desc`
    );
    const data = await response.json();

    if (Array.isArray(data) && data.length > 0) {
      const email = data[0].email || "மின்னஞ்சல் இல்லை";
      footerEl.innerHTML = `
        <div class="flex-1 min-w-[50%] text-center truncate">
          📧 ${email}
        </div>
      `;
    } else {
      footerEl.innerHTML = `<div class="w-full text-center">தகவல் இல்லை</div>`;
    }

  } catch (error) {
    console.error(error);
    footerEl.innerHTML = `<span class="text-yellow-400 text-lg font-semibold">பிழை ஏற்பட்டது</span>`;
  }
}

fetchContactInfoFooter();

// 1. Bus Filter Logic
function filterBus(direction) {
  const rows = document.querySelectorAll("#busTimings tbody tr");

  rows.forEach(row => {
    const note = row.querySelector(".bus-note");
    const noteText = note ? note.textContent.trim() : "";

    let showRow = false;

    if (direction === 'all') {
      showRow = true;
    } else if (direction === 'coonoorToKilinjada') {
      showRow = noteText.includes("குன்னூரில்") || noteText.includes("(at Coonoor)");
    } else if (direction === 'kilinjadaToCoonoor') {
      showRow = noteText.includes("கிளிஞ்சடாவில்") || noteText.includes("(at Kilinjada)");
    }

    row.style.display = showRow ? "" : "none";
  });

  // Optional: highlight active button
  document.querySelectorAll('.bus-btn').forEach(btn => btn.classList.remove('active'));
  if (direction === 'all') {
    document.getElementById("btnAll").classList.add("active");
  } else if (direction === 'coonoorToKilinjada') {
    document.getElementById("btnCoonoor").classList.add("active");
  } else if (direction === 'kilinjadaToCoonoor') {
    document.getElementById("btnKilinjada").classList.add("active");
  }
}

// 2. Bind Filter Buttons (call this once on DOM load and after language change)
function bindBusFilterButtons() {
  const btnKil = document.getElementById("btnKilinjada");
  const btnCoon = document.getElementById("btnCoonoor");
  const btnAll = document.getElementById("btnAll");

  if (btnKil) btnKil.onclick = () => filterBus("kilinjadaToCoonoor");
  if (btnCoon) btnCoon.onclick = () => filterBus("coonoorToKilinjada");
  if (btnAll) btnAll.onclick = () => filterBus("all");
}

// 3. Re-bind after DOM is ready
document.addEventListener("DOMContentLoaded", function () {
  bindBusFilterButtons();
});


function setLanguage(lang) {
  // ... your existing translation logic ...
  bindBusFilterButtons(); // 🔁 rebind buttons after text changes
}


  //calendar
document.addEventListener("DOMContentLoaded", function () {
  const CALENDAR_TABLE = "calendar";

  let monthsData = [];
  let currentMonthIndex = 0;

  async function fetchMonthsFromBackendless() {
    try {
      const response = await fetch(
        `https://api.backendless.com/${APP_ID}/${API_KEY}/data/${CALENDAR_TABLE}?sortBy=month%20asc`
      );
      const data = await response.json();
      monthsData = data;

      if (monthsData.length > 0) {
        currentMonthIndex = 0;
        renderCalendarMonth();
      } else {
        document.getElementById('calendarMonth').textContent = "No data";
        document.getElementById('calendarEvents').textContent = "";
      }
    } catch (error) {
      document.getElementById('calendarMonth').textContent = "Error loading calendar";
      document.getElementById('calendarEvents').textContent = "";
      console.error("Calendar fetch error:", error);
    }
  }

  function renderCalendarMonth() {
    const monthObj = monthsData[currentMonthIndex];
    document.getElementById('calendarMonth').textContent = monthObj.month;
    document.getElementById('calendarEvents').textContent = monthObj.events || "No events";
  }

  document.getElementById('prevMonth').onclick = function () {
    if (monthsData.length === 0) return;
    currentMonthIndex = (currentMonthIndex - 1 + monthsData.length) % monthsData.length;
    renderCalendarMonth();
  };

  document.getElementById('nextMonth').onclick = function () {
    if (monthsData.length === 0) return;
    currentMonthIndex = (currentMonthIndex + 1) % monthsData.length;
    renderCalendarMonth();
  };

  // ✅ CALL IT HERE directly
  fetchMonthsFromBackendless();
});


  function scrollGallery(containerId, direction) {
    const container = document.getElementById(containerId);
    const scrollAmount = container.querySelector('.gallery-img-xl')?.offsetWidth + 24 || 320;
    container.scrollBy({ left: direction * scrollAmount, behavior: 'smooth' });
  }
const TABLE2_NAME = 'VillageStats';

const fetchVillageStats = async () => {
  try {
    const response = await fetch(`https://api.backendless.com/${APP_ID}/${API_KEY}/data/${TABLE2_NAME}`);
    const data = await response.json();
    const stats = data[0];

    if (stats) {
      document.getElementById("statPeople").textContent = stats.people ?? '--';
      document.getElementById("statHouses").textContent = stats.houses ?? '--';
      document.getElementById("statShops").textContent = stats.shops ?? '--';
      document.getElementById("statSchools").textContent = stats.schools ?? '--';
      document.getElementById("statChurches").textContent = stats.churches ?? '--';
      document.getElementById("statTemples").textContent = stats.temples ?? '--';
    }
  } catch (err) {
    console.error("Error loading village stats:", err);
  }
};

document.addEventListener("DOMContentLoaded", () => {
  fetchVillageStats();

  const toggleBtn = document.getElementById("toggleStatsBtn");
  const extraStats = document.querySelectorAll(".extra-stat");
  let expanded = false;

  toggleBtn.addEventListener("click", () => {
    extraStats.forEach(card => {
      card.classList.toggle("show");
    });
    expanded = !expanded;
    toggleBtn.textContent = expanded ? "குறைவு காண்க" : "மேலும் காண்க";
    toggleBtn.setAttribute("data-key", expanded ? "btn_show_less" : "btn_show_more");
  });
});

  const form = document.getElementById("feedbackForm");
  const status = document.getElementById("feedbackStatus");
  const submitBtn = form.querySelector("button");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // 1. Immediately show sending message
    status.textContent = "📤 அனுப்புகிறது...";
    status.classList.remove("hidden");
    submitBtn.disabled = true;
    submitBtn.textContent = "அனுப்புகிறது...";

    fetch(form.action, {
      method: "POST",
      body: new FormData(form),
    })
    .then(response => response.text())
    .then(data => {
      if (data === "Success") {
        // 2. Show success message
        status.textContent = "🙏 உங்கள் கருத்துக்கு நன்றி! அது வெற்றிகரமாக அனுப்பப்பட்டது.";
        form.reset();
      } else {
        status.textContent = "❌ அனுப்ப முடியவில்லை. பின்னர் முயற்சிக்கவும்.";
      }
    })
    .catch(() => {
      status.textContent = "⚠️ பிழை ஏற்பட்டது!";
    })
    .finally(() => {
      // 3. Enable button again after 3s
      submitBtn.disabled = false;
      submitBtn.textContent = "அனுப்பு";
    });
  });

