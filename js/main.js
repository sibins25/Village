const apiKey = 'b10632c504034b9ab9a171528250506'; // Replace with your API key

const location = "Coimbatore"; // Or use "Kilinjada" if recognized, or lat/lon

async function fetchWeather() {
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(location)}&lang=ta`
    );
    if (!response.ok) throw new Error("Weather data not available");
    const data = await response.json();

    // Extract data
    const temp = data.current.temp_c;
    const humidity = data.current.humidity;
    const condition = data.current.condition.text;
    const iconUrl = "https:" + data.current.condition.icon;

    // Update your HTML
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
    // Side menu logic
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
    // Close menu when clicking menu links
    document.querySelectorAll('.menu-link').forEach(link => {
      link.onclick = () => {
        closeMenuAndOverlay();
      };
    });

    // Language switcher logic (basic structure)
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

    // Example: Language switching logic (implement your own translation data)
    const translations = {
      en: {
        site_title: "Kilinjada Village",
        menu_button: "",
        language_label: "English",
        tamil_option: "Tamil",
        english_option: "English",
        menu_title: "",
        close_menu: "",
        menu_home: "Home",
        menu_location: "Location",
        menu_gallery: "Gallery",
        menu_crops: "Crops",
        menu_bus: "Bus Timings",
        title: "Village Stats",
        menu_weather: "Weather",
        menu_feedback: "Feedback",
        welcome_title: "Welcome to Kilinjada Village",
        welcome_description: "A small village blending tradition and natural beauty.",
        location_title: "Kilinjada Location",
        location_button: "Go to Kilinjada",
        gallery_title: "Village Photos",
        season: "Seasonal Crops",
        bus_title: "Bus Timings",
        bus_from: "From",
        bus_to: "To",
        bus_time: "Time",
        bus_route: "Route",
        bus_from1: "Kilinjada",
        bus_to1: "Ooty",
        bus_time1: "07:15 AM",
        bus_route1: "Mooligai",
        bus_from2: "Ooty",
        bus_to2: "Kilinjada",
        bus_time2: "06:10 PM",
        bus_route2: "Mooligai",
        announcement_ticker: "Chance of rain in the village today.",
        people: "People: <span>400</span>",
        houses: "Houses: <span>100</span>",
        shops: "Shops: <span>5</span>",
        weather_title: "Kilinjada Village Weather",
        weather_village: "Kilinjada Village",
        weather_label: "Weather",
        weather_placeholder: "Weather details can be added here.",
        feedback_title: "Share your feedback",
        feedback_name_placeholder: "Name",
        feedback_message_placeholder: "Your message",
        feedback_submit: "Submit",
        fruit_name1: "Chayote",
        fruit_name2: "Guava",
        fruit_name3: "Carrot",
        fruit_name4: "Cabbage",
        fruit_name5: "Cauliflower",
        fruit_name6: "Beans",
        fruit_name7: "Plums",
        fruit_name8: "Potato",
            from_1: "Kilinjada",
    to_1: "Coonoor",
    time_1: "8:05 AM",
    route_1: "Kilinjada",
    from_2: "Coonoor",
    to_2: "Kilinjada",
    time_2: "7:30 AM",
    route_2: "Kilinjada",
    from_3: "Coonoor",
    to_3: "Kolaikambai",
    time_3: "07:20 PM",
    route_3: "Kilinjada",
    from_4: "Coonoor",
    to_4: "Kolaikambai",
    time_4: "10:45 PM",
    route_4: "Kilinjada",
    from_5: "Coonoor",
    to_5: "Kolaikambai",
    time_5: "11:50 PM",
    route_5: "Kilinjada",
    from_6: "Coonoor",
    to_6: "Kottakkal",
    time_6: "12:20 AM",
    route_6: "Kilinjada",
    from_7: "Coonoor",
    to_7: "Kottakkal",
    time_7: "9:00 AM",
    route_7: "Kilinjada",
    from_8: "Coonoor",
    to_8: "Sutton",
    time_8: "05:00 PM",
    route_8: "Kilinjada",
    from_9: "Kottakkal",
    to_9: "Coonoor",
    time_9: "07:10 AM",
    route_9: "Kilinjada",
    from_10: "Kolaikambai",
    to_10: "Coonoor",
    time_10: "9:30AM",
    route_10: "Kilinjada",
    from_11: "Sutton",
    to_11: "Coonoor",
    time_11: "08:45 AM",
    route_11: "Kilinjada",
    from_12: "Thuthur Mattam",
    to_12: "Coonoor",
    time_12: "10:40 PM",
    route_12: "Kilinjada",
    feedback_name_placeholder: "Name",
    feedback_message_placeholder: "Your message",
    feedback_submit: "Submit"
    
      },
      ta: {
    feedback_name_placeholder: "பெயர்",
    feedback_message_placeholder: "உங்கள் கருத்து",
    feedback_submit: "அனுப்பு",     
  site_title: "கிளிஞ்சடா கிராமம்",
  menu_button: "",
  language_label: "தமிழ்",
  tamil_option: "தமிழ்",
  english_option: "English",
  menu_title: "",
  close_menu: "",
  menu_home: "முகப்பு",
  menu_location: "இடம்",
  menu_gallery: "புகைப்படங்கள்",
  menu_crops: "பயிர்கள்",
  menu_bus: "பஸ் நேரங்கள்",
  title: "கிராம புள்ளிவிவரங்கள்",
  menu_weather: "வானிலை",
  menu_feedback: "கருத்துகள்",
  welcome_title: "கிளிஞ்சடா கிராமத்திற்கு வரவேற்கிறோம்",
  welcome_description: "இது எங்கள் பாரம்பரியமும், இயற்கை அழகும் இணைந்த சிறிய கிராமம்.",
  location_title: "கிளிஞ்சடா இடம்",
  location_button: "கிளிஞ்சடா செல்லுங்கள்",
  gallery_title: "கிராமத்துப் புகைப்படங்கள்",
  season: "பருவ பயிர்கள்",
  bus_title: "பஸ் நேரங்கள்",
  bus_from: "எங்கிருந்து",
  bus_to: "எங்கே",
  bus_time: "நேரம்",
  bus_route: "வழி",
  announcement_ticker: "இன்று கிராமத்தில் மழை பெய்யும் வாய்ப்பு உள்ளது.",
  people: "மக்கள்: <span>400</span>",
  houses: "வீடுகள்: <span>100</span>",
  shops: "கடைகள்: <span>5</span>",
  weather_title: "கிளிஞ்சடா கிராமம் வானிலை",
  weather_village: "கிளிஞ்சடா கிராமம்",
  weather_label: "வானிலை",
  weather_placeholder: "இங்கு வானிலை விவரங்கள் சேர்க்கலாம்.",
  feedback_title: "உங்கள் கருத்தை தெரிவியுங்கள்",
  feedback_name_placeholder: "பெயர்",
  feedback_message_placeholder: "உங்கள் கருத்து",
  feedback_submit: "அனுப்பு",
  fruit_name1: "சௌ சௌ",
  fruit_name2: "கொய்யா",
  fruit_name3: "கேரட்",
  fruit_name4: "முட்டைக்கோஸ்",
  fruit_name5: "பூக்கோஸ்",
  fruit_name6: "பீன்ஸ்",
  fruit_name7: "பிளம்ஸ்",
  fruit_name8: "உருளைக்கிழங்கு",
  from_1: "கிளிஞ்சடா",
  to_1: "குன்னூர்",
  time_1: "8:05 AM",
  route_1: "கிளிஞ்சடா",
  from_2: "குன்னூர்",
  to_2: "கிளிஞ்சடா",
  time_2: "7:30 AM",
  route_2: "கிளிஞ்சடா",
  from_3: "குன்னூர்",
  to_3: "கொலைகாம்பை",
  time_3: "07:20 PM",
  route_3: "கிளிஞ்சடா",
  from_4: "குன்னூர்",
  to_4: "கொலைகாம்பை",
  time_4: "10:45 PM",
  route_4: "கிளிஞ்சடா",
  from_5: "குன்னூர்",
  to_5: "கொலைகாம்பை",
  time_5: "11:50 PM",
  route_5: "கிளிஞ்சடா",
  from_6: "குன்னூர்",
  to_6: "கோட்டக்கல்",
  time_6: "12:20 AM",
  route_6: "கிளிஞ்சடா",
  from_7: "குன்னூர்",
  to_7: "கோட்டக்கல்",
  time_7: "9:00 AM",
  route_7: "கிளிஞ்சடா",
  from_8: "குன்னூர்",
  to_8: "சட்டன்",
  time_8: "05:00 PM",
  route_8: "கிளிஞ்சடா",
  from_9: "கோட்டக்கல்",
  to_9: "குன்னூர்",
  time_9: "07:10 AM",
  route_9: "கிளிஞ்சடா",
  from_10: "கொலைகாம்பை",
  to_10: "குன்னூர்",
  time_10: "9:30AM",
  route_10: "கிளிஞ்சடா",
  from_11: "சட்டன்",
  to_11: "குன்னூர்",
  time_11: "08:45 AM",
  route_11: "கிளிஞ்சடா",
  from_12: "துத்துர்மட்டம்",
  to_12: "குன்னூர்",
  time_12: "10:40 PM",
  route_12: "கிளிஞ்சடா"

        // Tamil keys are already in HTML, so you can fill as needed
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

    // Gallery/Crops Scroll Buttons
    


    // Feedback Form
const APP_ID = "F8719370-DAAD-4155-89F8-F6E789F540B4";
const API_KEY = "99384368-B200-4E07-9314-51301C9EA974";
const TABLE_NAME = "feedback";

document.getElementById('feedbackForm').addEventListener('submit', async function(e) {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const message = document.getElementById('message').value.trim();
  const statusEl = document.getElementById('feedbackStatus');

  if (!name || !message) {
    statusEl.textContent = "Fill all fields.";
    return;
  }

  const feedbackData = { name, message };

  try {
    const response = await fetch(
      `https://api.backendless.com/${APP_ID}/${API_KEY}/data/${TABLE_NAME}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(feedbackData)
      }
    );

    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.message || "Failed to submit feedback");
    }

    statusEl.textContent = "Thank you! Feedback submitted.";
    this.reset();
  } catch (error) {
    statusEl.textContent = "Sorry, could not submit feedback. Try again.";
    console.error(error);
  }
});
