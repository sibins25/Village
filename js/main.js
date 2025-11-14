/* ========== main.js (cleaned & fixed) ========== */
/* Features:
   - Scroll animations
   - Side menu
   - Language switcher (TA/EN)
   - Gallery modal + scrolling
   - Weather fetch
   - Firebase init (Firestore compat)
   - Live listeners for: announcements, calendar, villageStats, contactInfo
   - Bus filter buttons
   - Feedback form (uses form.action as you had)
*/

/* ---------------------------
   0) Utilities
   --------------------------- */
   function safeText(el, text) {
    if (!el) return;
    el.textContent = text;
  }
  function safeHTML(el, html) {
    if (!el) return;
    el.innerHTML = html;
  }
  
  /* ---------------------------
     1) Scroll-triggered fade-in
     --------------------------- */
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
  
  /* ---------------------------
     2) Side menu logic
     --------------------------- */
  document.addEventListener("DOMContentLoaded", function() {
    const menuBtn = document.getElementById('menuBtn');
    const sideMenu = document.getElementById('sideMenu');
    const closeMenu = document.getElementById('closeMenu');
    const menuOverlay = document.getElementById('menuOverlay');
  
    function openMenu() {
      if (!sideMenu) return;
      sideMenu.classList.remove('-translate-x-full');
      sideMenu.classList.add('translate-x-0');
      if (menuOverlay) menuOverlay.classList.remove('hidden');
    }
    function closeMenuAndOverlay() {
      if (!sideMenu) return;
      sideMenu.classList.add('-translate-x-full');
      sideMenu.classList.remove('translate-x-0');
      if (menuOverlay) menuOverlay.classList.add('hidden');
    }
  
    if (menuBtn) menuBtn.onclick = openMenu;
    if (closeMenu) closeMenu.onclick = closeMenuAndOverlay;
    if (menuOverlay) menuOverlay.onclick = closeMenuAndOverlay;
  
    document.querySelectorAll('.menu-link').forEach(link => {
      link.onclick = () => closeMenuAndOverlay();
    });
  
    // close on outside click/touch
    document.addEventListener('mousedown', (e) => {
      if (!sideMenu) return;
      if (!sideMenu.contains(e.target) && !menuBtn.contains(e.target) && !sideMenu.classList.contains('-translate-x-full')) {
        closeMenuAndOverlay();
      }
    });
    document.addEventListener('touchstart', (e) => {
      if (!sideMenu) return;
      if (!sideMenu.contains(e.target) && !menuBtn.contains(e.target) && !sideMenu.classList.contains('-translate-x-full')) {
        closeMenuAndOverlay();
      }
    });
  });
  
  /* ---------------------------
     3) Language switcher
     --------------------------- */
  document.addEventListener("DOMContentLoaded", function() {
    const langBtn = document.getElementById('langBtn');
    const langDropdown = document.getElementById('langDropdown');
    const langLabel = document.getElementById('langLabel');
  
    if (langBtn) {
      langBtn.onclick = (e) => {
        e.stopPropagation();
        if (langDropdown) langDropdown.classList.toggle('hidden');
      };
    }
    document.body.onclick = () => {
      if (langDropdown) langDropdown.classList.add('hidden');
    };
    if (langDropdown) langDropdown.onclick = (e) => e.stopPropagation();
  
  
 const translations = {
      en: {
        site_title: "Kilinjada Village", language_label: "English", tamil_option: "Tamil", english_option: "English",
        menu_home: "🏠Home", menu_location: "📍Location", menu_gallery: "📸Gallery", menu_crops: "🌾Crops", menu_bus: "🚌Bus Timings",
        menu_calendar:"📅 Calendar", title: "📊Village Stats", name:"Name", message:"Your Message", menu_weather: "🌦Weather", menu_feedback: "💬Feedback",
        welcome_title: "🌾Welcome to Kilinjada Village", welcome_description: "A small village blending tradition and natural beauty.",
        location_title: "📍Kilinjada Location", location_button: "Go to Kilinjada", gallery_title: "📸Village Photos",
        season: "🌾Seasonal Crops", calendar:"📅 Calendar", bus_title: "🚌Bus Timings", bus_from: "From", bus_to: "To", bus_time: "Time",
        note: "Note", menu_home2:"📊About", exception: "All the above buses will pass through Kilinjada",
        people: "People:", houses: "Houses:", shops: "Shops:", weather_title: "🌦Kilinjada Village Weather",
        weather_village: "Kilinjada Village", weather_label: "Weather", weather_placeholder: "Weather details can be added here.",
        feedback_name_placeholder: "Name", feedback_message_placeholder: "Your message", feedback_submit: "Submit",
        about_title: "About Kilinjada Village", feedback:"💬Feedback", less:"Show Less", footercopy:"© 2025 Kilinjada Village. All rights reserved",
        show: "Show More",

        /* Bus rows (times as plain time; notes are separate keys so nested .bus-note divs are preserved) */
        from_4: "Coonoor", to_4: "Kolaikambai", time_4: "7:20 AM", at_coonoor_1: "(at Coonoor)",
        from_2: "Coonoor", to_2: "Kilinjada", time_2: "7:30 AM", at_coonoor_2: "(at Coonoor)",
        from_3a: "Coonoor", to_3a: "Thoodhurmattam", time_3a: "7:40 AM", at_coonoor_3: "(at Coonoor)",
        from_3b: "Coonoor", to_3b: "Thoodhurmattam", time_3b: "9:40 AM", at_coonoor_4: "(at Coonoor)",
        from_4b: "Coonoor", to_4b: "Kolaikambai", time_4b: "10:45 AM", at_coonoor_5: "(at Coonoor)",
        from_5a: "Coonoor", to_5a: "Kolaikambai", time_5a: "11:50 AM", at_coonoor_6: "(at Coonoor)",
        from_5b: "Coonoor", to_5b: "Thoodhurmattam", time_5b: "1:00 PM", at_coonoor_7: "(at Coonoor)",
        from_4c: "Coonoor", to_4c: "Kolaikambai", time_4c: "2:15 PM", at_coonoor_8: "(at Coonoor)",
        from_6: "Coonoor", to_6: "Kottakkal", time_6: "12:20 PM", at_coonoor_9: "(at Coonoor)",
        from_3d: "Coonoor", to_3d: "Sattan", time_3d: "4:15 PM", at_coonoor_10: "(at Coonoor)",
        from_3e: "Coonoor", to_3e: "Thoodhurmattam", time_3e: "5:00 PM", at_coonoor_11: "(at Coonoor)",
        from_3f: "Coonoor", to_3f: "Thoodhurmattam", time_3f: "7:20 PM", at_coonoor_12: "(at Coonoor)",
        from_3g: "Coonoor", to_3g: "Sattan", time_3g: "8:15 PM", at_coonoor_13: "(at Coonoor)",

        from_3h: "Thoodhurmattam", to_3h: "Coonoor", time_3h: "6:50 AM", at_kilinjada_1: "(at Kilinjada)",
        from_3i: "Sattan", to_3i: "Coonoor", time_3i: "7:00 AM", at_kilinjada_2: "(at Kilinjada)",
        from_3j: "Kottakkal", to_3j_1: "Coonoor", time_3j_1: "7:10 AM", at_kilinjada_3: "(at Kilinjada)",
        from_4j: "Palmara", to_3j_2: "Coonoor", time_3j_2: "7:15 AM", at_kilinjada_4: "(at Kilinjada)",
        from_1: "Kilinjada", to_1: "Coonoor", time_1: "8:05 AM", at_kilinjada_5: "(at Kilinjada)",
        from_3k_1: "Thoodhurmattam", to_3k_1: "Coonoor", time_3k_1: "10:40 AM", at_kilinjada_6: "(at Kilinjada)",
        from_3l_1: "Kottakkal", to_3l_1: "Coonoor", time_3l_1: "11:10 AM", at_kilinjada_7: "(at Kilinjada)",
        from_3k_2: "Thoodhurmattam", to_3k_2: "Coonoor", time_3k_2: "2:00 PM", at_kilinjada_8: "(at Kilinjada)",
        from_3l_2: "Kottakkal", to_3l_2: "Coonoor", time_3l_2: "2:20 PM", at_kilinjada_9: "(at Kilinjada)",
        from_3k_3: "Thoodhurmattam", to_3k_3: "Coonoor", time_3k_3: "4:00 PM", at_kilinjada_10: "(at Kilinjada)",
        from_3l_3: "Kottakkal", to_3l_3: "Coonoor", time_3l_3: "6:30 PM", at_kilinjada_11: "(at Kilinjada)",

        filter_kilinjiada: "Kilinjada ➝ Coonoor", filter_coonoor: "Coonoor ➝ Kilinjada", filter3: "All buses",
        Announcement: "🗞️ Announcements",
        footer: "© 2025 Kilinjada Village. All rights reserved"
      },
      ta: {
        site_title: "கிளிஞ்சடா கிராமம்", language_label: "தமிழ்", tamil_option: "தமிழ்", english_option: "English",
        menu_home: "🏠முகப்பு", menu_location: "📍இடம்", menu_gallery: "📸புகைப்படங்கள்", menu_crops: "🌾பயிர்கள்", menu_bus: "🚌பஸ் நேரங்கள்",
        menu_calendar:"📅 காலண்டர்", title: "📊கிராம புள்ளிவிவரங்கள்", name:"பெயர்", message:"உங்கள் கருத்து", menu_weather: "🌦வானிலை",
        menu_feedback: "💬கருத்துகள்", welcome_title: "🌾கிளிஞ்சடா கிராமத்திற்கு வரவேற்கிறோம்",
        welcome_description: "இது எங்கள் பாரம்பரியம் மற்றும் இயற்கை அழகின் சிறிய கிராமம்.",
        location_title: "📍கிளிஞ்சடா இடம்", location_button: "கிளிஞ்சடா செல்லுங்கள்", gallery_title: "📸கிராம புகைப்படங்கள்",
        season: "🌾பருவ பயிர்கள்", calendar:"📅 காலண்டர்", bus_title: "🚌பஸ் நேரங்கள்", bus_from: "எங்கிருந்து", bus_to: "எங்கே", bus_time: "நேரம்",
        note: "குறிப்பு", menu_home2:"📊பற்றி", exception: "மேலுள்ள அனைத்து பேருந்துகளும் கிளிஞ்சடா வழியாக செல்லும்",
        people: "மக்கள்:", houses: "வீடுகள்:", shops: "கடைகள்:", weather_title: "🌦கிளிஞ்சடா கிராமம் வானிலை",
        weather_village: "கிளிஞ்சடா கிராமம்", weather_label: "வானிலை", weather_placeholder: "இங்கு வானிலை விவரங்கள் சேர்க்கலாம்.",
        feedback_name_placeholder: "பெயர்", feedback_message_placeholder: "உங்கள் கருத்து", feedback_submit: "அனுப்பு",
        about_title: "கிளிஞ்சடா கிராமம் பற்றி", feedback:"💬 கருத்துகள்", less:"குறைவு காண்க", footercopy:"© 2025 கிளிஞ்சடா கிராமம். அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.",
        show: "மேலும் காண்க",

        /* Bus rows (Tamil strings) */
        from_4: "குன்னூர்", to_4: "கொலைகாம்பை", time_4: "7:20 AM", at_coonoor_1: "(குன்னூரில்)",
        from_2: "குன்னூர்", to_2: "கிளிஞ்சடா", time_2: "7:30 AM", at_coonoor_2: "(குன்னூரில்)",
        from_3a: "குன்னூர்", to_3a: "தூதூர்மட்டம்", time_3a: "7:40 AM", at_coonoor_3: "(குன்னூரில்)",
        from_3b: "குன்னூர்", to_3b: "தூதூர்மட்டம்", time_3b: "9:40 AM", at_coonoor_4: "(குன்னூரில்)",
        from_4b: "குன்னூர்", to_4b: "கொலைகாம்பை", time_4b: "10:45 AM", at_coonoor_5: "(குன்னூரில்)",
        from_5a: "குன்னூர்", to_5a: "கொலைகாம்பை", time_5a: "11:50 AM", at_coonoor_6: "(குன்னூரில்)",
        from_5b: "குன்னூர்", to_5b: "தூதூர்மட்டம்", time_5b: "1:00 PM", at_coonoor_7: "(குன்னூரில்)",
        from_4c: "குன்னூர்", to_4c: "கொலைகாம்பை", time_4c: "2:15 PM", at_coonoor_8: "(குன்னூரில்)",
        from_6: "குன்னூர்", to_6: "கோட்டக்கல்", time_6: "12:20 PM", at_coonoor_9: "(குன்னூரில்)",
        from_3d: "குன்னூர்", to_3d: "சட்டன்", time_3d: "4:15 PM", at_coonoor_10: "(குன்னூரில்)",
        from_3e: "குன்னூர்", to_3e: "தூதூர்மட்டம்", time_3e: "5:00 PM", at_coonoor_11: "(குன்னூரில்)",
        from_3f: "குன்னூர்", to_3f: "தூதூர்மட்டம்", time_3f: "7:20 PM", at_coonoor_12: "(குன்னூரில்)",
        from_3g: "குன்னூர்", to_3g: "சட்டன்", time_3g: "8:15 PM", at_coonoor_13: "(குன்னூரில்)",

        from_3h: "தூதூர்மட்டம்", to_3h: "குன்னூர்", time_3h: "6:50 AM", at_kilinjada_1: "(கிளிஞ்சடாவில்)",
        from_3i: "சட்டன்", to_3i: "குன்னூர்", time_3i: "7:00 AM", at_kilinjada_2: "(கிளிஞ்சடாவில்)",
        from_3j: "கோட்டக்கல்", to_3j_1: "குன்னூர்", time_3j_1: "7:10 AM", at_kilinjada_3: "(கிளிஞ்சடாவில்)",
        from_4j: "பால்மாரா", to_3j_2: "குன்னூர்", time_3j_2: "7:15 AM", at_kilinjada_4: "(கிளிஞ்சடாவில்)",
        from_1: "கிளிஞ்சடா", to_1: "குன்னூர்", time_1: "8:05 AM", at_kilinjada_5: "(கிளிஞ்சடாவில்)",
        from_3k_1: "தூதூர்மட்டம்", to_3k_1: "குன்னூர்", time_3k_1: "10:40 AM", at_kilinjada_6: "(கிளிஞ்சடாவில்)",
        from_3l_1: "கோட்டக்கல்", to_3l_1: "குன்னூர்", time_3l_1: "11:10 AM", at_kilinjada_7: "(கிளிஞ்சடாவில்)",
        from_3k_2: "தூதூர்மட்டம்", to_3k_2: "குன்னூர்", time_3k_2: "2:00 PM", at_kilinjada_8: "(கிளிஞ்சடாவில்)",
        from_3l_2: "கோட்டக்கல்", to_3l_2: "குன்னூர்", time_3l_2: "2:20 PM", at_kilinjada_9: "(கிளிஞ்சடாவில்)",
        from_3k_3: "தூதூர்மட்டம்", to_3k_3: "குன்னூர்", time_3k_3: "4:00 PM", at_kilinjada_10: "(கிளிஞ்சடாவில்)",
        from_3l_3: "கோட்டக்கல்", to_3l_3: "குன்னூர்", time_3l_3: "6:30 PM", at_kilinjada_11: "(கிளிஞ்சடாவில்)",

        filter_kilinjiada: "🚌 கிளிஞ்சடா ➝ குன்னூர்", filter_coonoor: "🚌 குன்னூர் ➝ கிளிஞ்சடா", filter3: "🔁 எல்லா பேருந்துகளும்",
        Announcement: "🗞️ அறிவிப்புகள்",
        footer: "© 2025 கிளிஞ்சடா கிராமம். அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை."
      }
    };
  
    // global language state
    window.lang = window.lang || 'ta';
  
    function applyTranslations(lang) {
      window.lang = lang;
      const dict = translations[lang];
      if (!dict) return;
  
      document.querySelectorAll('[data-key]').forEach(el => {
        const key = el.getAttribute('data-key');
        if (!key) return;
        const val = dict[key];
        if (val === undefined) return;
  
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
          el.placeholder = val;
        } else {
          el.textContent = val;
        }
      });
  
      // update lang label
      if (langLabel) langLabel.textContent = translations[lang].language_label || langLabel.textContent;
      // update document title
      document.title = dict.site_title || document.title;
  
      // update toggle button label if present
      const toggleBtn = document.getElementById("toggleStatsBtn");
      if (toggleBtn) {
        toggleBtn.textContent = getToggleLabel(expanded);
        toggleBtn.setAttribute("data-key", expanded ? "less" : "show");
      }
  
      // re-bind filter buttons (text changed)
      bindBusFilterButtons();
    }
  
    // attach language selection buttons
    document.querySelectorAll('#langDropdown button').forEach(btn => {
      btn.onclick = function() {
        const lang = this.getAttribute('data-lang') || 'ta';
        applyTranslations(lang);
        if (langDropdown) langDropdown.classList.add('hidden');
      };
    });
  
    // initial apply
    applyTranslations(window.lang);
  });
  
  /* ---------------------------
     4) Gallery / modal + scroll (single implementation)
     --------------------------- */
  (function() {
    // ensure IDs exist
    const galleryContainer = document.getElementById('galleryImages');
    if (!galleryContainer) return;
  
    const images = Array.from(galleryContainer.querySelectorAll('img'));
    const modal = document.getElementById('galleryModal');
    const modalImg = document.getElementById('modalMainImg');
    const modalThumbs = document.getElementById('modalThumbs');
    let currentIdx = 0;
  
    images.forEach((img, idx) => {
      if (!img.dataset.full) img.dataset.full = img.src;
      img.style.cursor = 'pointer';
      img.onclick = () => openGalleryModal(idx);
    });
  
    function openGalleryModal(idx) {
      currentIdx = idx;
      if (modal) modal.classList.add('open');
      renderModalImage(idx);
      renderModalThumbs();
      document.body.style.overflow = 'hidden';
    }
    function closeGalleryModal() {
      if (modal) modal.classList.remove('open');
      document.body.style.overflow = '';
    }
    function renderModalImage(idx) {
      if (!modalImg) return;
      modalImg.src = images[idx].dataset.full;
      Array.from(modalThumbs?.children || []).forEach((thumb, i) => thumb.classList.toggle('selected', i === idx));
    }
    function renderModalThumbs() {
      if (!modalThumbs) return;
      modalThumbs.innerHTML = '';
      images.forEach((img, idx) => {
        const thumb = document.createElement('img');
        thumb.src = img.dataset.full;
        thumb.onclick = () => {
          currentIdx = idx;
          renderModalImage(idx);
        };
        if (idx === currentIdx) thumb.classList.add('selected');
        modalThumbs.appendChild(thumb);
      });
    }
  
    // keyboard nav
    document.addEventListener('keydown', (e) => {
      if (!modal?.classList.contains('open')) return;
      if (e.key === 'ArrowLeft') {
        currentIdx = (currentIdx - 1 + images.length) % images.length;
        renderModalImage(currentIdx);
      } else if (e.key === 'ArrowRight') {
        currentIdx = (currentIdx + 1) % images.length;
        renderModalImage(currentIdx);
      } else if (e.key === 'Escape') {
        closeGalleryModal();
      }
    });
  
    // click outside to close
    if (modal) modal.onclick = (e) => { if (e.target === modal) closeGalleryModal(); };
  
    // Expose scrollGallery globally (your HTML calls this)
    window.scrollGallery = function(containerId, direction) {
      const container = document.getElementById(containerId);
      if (!container) return;
      const firstChild = container.querySelector(':scope > *');
      const scrollAmount = (firstChild ? firstChild.offsetWidth : 300) + 24;
      container.scrollBy({ left: direction * scrollAmount, behavior: 'smooth' });
    };
  
    // ensure global close function exists for HTML button
    window.closeGalleryModal = function() { closeGalleryModal(); };
  })();
  
  /* ---------------------------
     5) Weather fetch
     --------------------------- */
  const weatherApiKey = 'b10632c504034b9ab9a171528250506'; // keep or replace
  const locationName = "Coimbatore";
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
  
      safeText(document.getElementById("weather_temp"), `${temp} °C`);
      safeText(document.getElementById("weather_humidity"), `ஈரப்பதம்: ${humidity}%`);
      safeText(document.getElementById("weather_condition"), condition);
      const iconEl = document.getElementById("weather_icon");
      if (iconEl) {
        iconEl.src = iconUrl;
        iconEl.alt = condition;
      }
    } catch (err) {
      safeText(document.getElementById("weather_placeholder"), "வானிலை பெற முடியவில்லை.");
      console.error("Weather error:", err);
    }
  }
  fetchWeather();
  
  /* ---------------------------
     6) Firebase Initialization (compat)
     --------------------------- */
  let db = null;
  (function initFirebase() {
    // Your current config (kept from your file)
    const firebaseConfig = {
      apiKey: "AIzaSyAMTU5SxQ6H6umBSvCtNyIHKRCjFdvP1yc",
      authDomain: "kilinjadavillage-38714.firebaseapp.com",
      projectId: "kilinjadavillage-38714",
      storageBucket: "kilinjadavillage-38714.firebasestorage.app",
      messagingSenderId: "877550852163",
      appId: "1:877550852163:web:87fb5a9081f346f92d5cf6",
      measurementId: "G-DR8RPBLV5Z"
    };
  
    if (typeof firebase !== 'undefined') {
      try {
        if (!firebase.apps.length) {
          firebase.initializeApp(firebaseConfig);
        }
        db = firebase.firestore();
        console.log("Firebase initialized (compat).");
      } catch (err) {
        console.error("Firebase init error:", err);
      }
    } else {
      console.error("Firebase SDK not loaded - include firebase-app-compat + firestore-compat before main.js");
    }
  })();
  
  /* Helper: wait for db ready (with timeout) */
  async function waitForDb(timeoutMs = 5000) {
    const start = Date.now();
    while (!db && Date.now() - start < timeoutMs) {
      await new Promise(r => setTimeout(r, 150));
    }
    return !!db;
  }
  
  /* ---------------------------
     7) Live listeners (announcements, calendar, villageStats, contactInfo)
     --------------------------- */
  async function attachAnnouncementsListener() {
    const el = document.getElementById('latestAnnouncement');
    if (!el) return;
    if (!await waitForDb()) {
      el.textContent = "அறிவிப்பை பெற முடியவில்லை.";
      return;
    }
  
    // Listen for latest announcement(s)
    try {
      db.collection('announcements')
        
        .limit(1)
        .onSnapshot(snapshot => {
          if (snapshot.empty) {
            el.textContent = window.lang === 'en' ? "No announcements." : "இப்போது அறிவிப்பு இல்லை.";
            return;
          }
          // show latest doc's message
          const doc = snapshot.docs[0];
          const data = doc.data();
          el.textContent = data?.message || data?.text || (window.lang === 'en' ? "No announcements." : "இப்போது அறிவிப்பு இல்லை.");
        }, err => {
          console.error("Announcements listener error:", err);
          el.textContent = "அறிவிப்பை பெற முடியவில்லை.";
        });
    } catch (err) {
      console.error("Announcements setup error:", err);
    }
  }
  
  async function attachContactInfoListener() {
    const footerEl = document.getElementById('footerContactInfo');
    if (!footerEl) return;
    if (!await waitForDb()) {
      footerEl.innerHTML = `<div class="w-full text-center">தகவல் இல்லை</div>`;
      return;
    }
  
    try {
      db.collection('contactInfo')
        
        .limit(1)
        .onSnapshot(snapshot => {
          if (snapshot.empty) {
            footerEl.innerHTML = `<div class="w-full text-center">தகவல் இல்லை</div>`;
            return;
          }
          const data = snapshot.docs[0].data();
          const email = data.email || "மின்னஞ்சல் இல்லை";
          const phone = data.phone || data.phoneNumber || "";
          const address = data.address || "";
  
          let html = '';
          if (email) html += `<div class="flex-1 min-w-[50%] text-center truncate">📧 ${email}</div>`;
          if (phone) html += `<div class="flex-1 min-w-[50%] text-center truncate">📞 ${phone}</div>`;
          if (address) html += `<div class="flex-1 min-w-[50%] text-center truncate">📍 ${address}</div>`;
          footerEl.innerHTML = html || `<div class="w-full text-center">தகவல் இல்லை</div>`;
        }, err => {
          console.error("ContactInfo listener error:", err);
          footerEl.innerHTML = `<div class="w-full text-center">தகவல் இல்லை</div>`;
        });
    } catch (err) {
      console.error("ContactInfo setup error:", err);
    }
  }
  
  /* Calendar: keep a local months array and render with prev/next */
  let calendarMonths = [];
  let calendarIndex = 0;
  function renderCalendarMonth() {
    if (calendarMonths.length === 0) {
      safeText(document.getElementById('calendarMonth'), window.lang === 'en' ? "No data" : "No data");
      safeText(document.getElementById('calendarEvents'), window.lang === 'en' ? "No events" : "🎉 நிகழ்வுகள் இங்கே காணப்படும்...");
      return;
    }
    const m = calendarMonths[calendarIndex];
    safeText(document.getElementById('calendarMonth'), m.month || m.name || m.id || "—");
    safeText(document.getElementById('calendarEvents'), m.events || m.event || m.description || "No events");
  }
  
  async function attachCalendarListener() {
    if (!await waitForDb()) {
      safeText(document.getElementById('calendarMonth'), "No data");
      safeText(document.getElementById('calendarEvents'), "");
      return;
    }
    try {
      db.collection('calendar')
        // prefer created timestamp; fallback depends on your data
        .onSnapshot(snapshot => {
          calendarMonths = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          calendarMonths.reverse(); // newest first -> show oldest to newest or adjust as you want
          calendarIndex = 0;
          renderCalendarMonth();
        }, err => {
          console.error("Calendar listener error:", err);
        });
    } catch (err) {
      console.error("Calendar setup error:", err);
    }
  
    // prev/next buttons
    const prev = document.getElementById('prevMonth');
    const next = document.getElementById('nextMonth');
    if (prev) prev.onclick = () => {
      if (!calendarMonths.length) return;
      calendarIndex = (calendarIndex - 1 + calendarMonths.length) % calendarMonths.length;
      renderCalendarMonth();
    };
    if (next) next.onclick = () => {
      if (!calendarMonths.length) return;
      calendarIndex = (calendarIndex + 1) % calendarMonths.length;
      renderCalendarMonth();
    };
  }
  
  /* Village Stats (single doc expected) */
  async function attachVillageStatsListener() {
    if (!await waitForDb()) {
      console.error("Firebase not ready for villageStats");
      return;
    }
    try {
      db.collection('villageStats')
        .limit(1)
        .onSnapshot(snapshot => {
          if (snapshot.empty) {
            // leave defaults
            return;
          }
          const stats = snapshot.docs[0].data();
          safeText(document.getElementById("statPeople"), stats.people ?? '--');
          safeText(document.getElementById("statHouses"), stats.houses ?? '--');
          safeText(document.getElementById("statShops"), stats.shops ?? '--');
          safeText(document.getElementById("statSchools"), stats.schools ?? '--');
          safeText(document.getElementById("statChurches"), stats.churches ?? '--');
          safeText(document.getElementById("statTemples"), stats.temples ?? '--');
        }, err => {
          console.error("villageStats listener error:", err);
        });
    } catch (err) {
      console.error("villageStats setup error:", err);
    }
  }
  
  /* ---------------------------
     8) Bus filter buttons
     --------------------------- */
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
    document.querySelectorAll('.bus-btn').forEach(btn => btn.classList.remove('active'));
    if (direction === 'all') {
      document.getElementById("btnAll")?.classList.add("active");
    } else if (direction === 'coonoorToKilinjada') {
      document.getElementById("btnCoonoor")?.classList.add("active");
    } else if (direction === 'kilinjadaToCoonoor') {
      document.getElementById("btnKilinjada")?.classList.add("active");
    }
  }
  
  function bindBusFilterButtons() {
    const btnKil = document.getElementById("btnKilinjada");
    const btnCoon = document.getElementById("btnCoonoor");
    const btnAll = document.getElementById("btnAll");
    if (btnKil) btnKil.onclick = () => filterBus("kilinjadaToCoonoor");
    if (btnCoon) btnCoon.onclick = () => filterBus("coonoorToKilinjada");
    if (btnAll) btnAll.onclick = () => filterBus("all");
  }
  
  /* ---------------------------
     9) Toggle extra stats
     --------------------------- */
  const TOGGLE_LABELS = { ta: { show: "மேலும் காண்க", less: "குறைவு காண்க" }, en: { show: "Show More", less: "Show Less" } };
  window.lang = window.lang || 'ta';
  let expanded = false;
  function getToggleLabel(expandedState) {
    return TOGGLE_LABELS[window.lang]?.[expandedState ? "less" : "show"] || (expandedState ? "Less" : "Show");
  }
  
  /* ---------------------------
     10) Feedback form handling (keeps your approach)
     --------------------------- */
  document.addEventListener("DOMContentLoaded", function () {
    bindBusFilterButtons();
  
    // toggle button label
    const toggleBtn = document.getElementById("toggleStatsBtn");
    const extraStats = document.querySelectorAll(".extra-stat");
    if (toggleBtn) {
      toggleBtn.textContent = getToggleLabel(expanded);
      toggleBtn.addEventListener("click", () => {
        expanded = !expanded;
        extraStats.forEach(stat => stat.classList.toggle("show", expanded));
        toggleBtn.textContent = getToggleLabel(expanded);
        toggleBtn.setAttribute("data-key", expanded ? "less" : "show");
      });
    }
  
    // Feedback form
    const form = document.getElementById("feedbackForm");
    if (form) {
      const status = document.getElementById("feedbackStatus");
      const submitBtn = form.querySelector("button[type='submit']") || form.querySelector("button");
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        if (!status || !submitBtn) return;
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
          // many Google Apps Script endpoints return different responses; we check string
          if (data && data.toString().toLowerCase().includes("success")) {
            status.textContent = "🙏 உங்கள் கருத்துக்கு நன்றி! அது வெற்றிகரமாக அனுப்பப்பட்டது.";
            form.reset();
          } else {
            status.textContent = "❌ அனுப்ப முடியவில்லை. பின்னர் முயற்சிக்கவும்.";
          }
        })
        .catch((err) => {
          console.error("Feedback submit error:", err);
          status.textContent = "⚠️ பிழை ஏற்பட்டது!";
        })
        .finally(() => {
          submitBtn.disabled = false;
          submitBtn.textContent = (window.lang === 'en' ? "Submit" : "அனுப்பு");
        });
      });
    }
  });
  
  /* ---------------------------
     11) Attach Firestore listeners after DOM loaded
     --------------------------- */
  document.addEventListener("DOMContentLoaded", async () => {
    // give a small delay to ensure Firebase SDKs loaded
    await new Promise(r => setTimeout(r, 400));
    // Attach listeners (they internally wait for db readiness)
    attachAnnouncementsListener();
    attachContactInfoListener();
    attachCalendarListener();
    attachVillageStatsListener();
  });
  