// 🔁 Section Fade-In on Scroll
document.querySelectorAll("section").forEach((section) => {
  section.classList.add("opacity-0", "translate-y-10", "transition-all", "duration-700");
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("opacity-100", "translate-y-0");
      entry.target.classList.remove("opacity-0", "translate-y-10");
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll("section").forEach((section) => observer.observe(section));

// 🌐 Language Switcher: English ↔ Tamil
document.addEventListener("DOMContentLoaded", () => {
  const translations = {
    ta: {
      home: "முகப்பு",
      about: "எங்களை பற்றி",
      location: "இடம்",
      weather: "வானிலை",
      visitors: "வருகையாளர்",
      welcomeTitle: "கிளிஞ்சாடாவிற்கு வருக",
      welcomeDesc: "எங்கள் சிற்றூரின் வண்ணமயமான வாழ்க்கையை நிமிடமாய் காணுங்கள்.",
      aboutText: "கிளிஞ்சடா என்பது இயற்கை அழகு மற்றும் மக்களின் பரிவால் பிரபலமான ஒரு அமைதியான கிராமமாகும்...",
      seasonalTitle: "முச்சூழல் விளைச்சல்கள்",
      feedbackTitle: "உங்கள் கருத்துகளை பகிரவும்",
      feedbackBtn: "அனுப்பு",
      weatherTitle: "தற்போதைய வானிலை",
      locationTitle: "எங்கள் கிராமத்தின் இடம்",
      busTitle: "கிராம பஸ் நேரம்",
      numbersTitle: "எங்கள் கிராமத்தின் எண்ணிக்கை",
      people: "மக்கள் எண்ணிக்கை",
      houses: "வீடுகள்",
      shops: "கடைகள்",
    },
    en: {
      home: "Home",
      about: "About",
      location: "Location",
      weather: "Weather",
      visitors: "Visitors",
      welcomeTitle: "Welcome to Kilinjada",
      welcomeDesc: "A colorful glimpse into our vibrant village life.",
      aboutText: "Kilinjada is a peaceful and picturesque village known for its lush fields...",
      seasonalTitle: "🌽 Seasonal Produce",
      feedbackTitle: "💬 Send Your Feedback",
      feedbackBtn: "Submit",
      weatherTitle: "🌤 Current Weather",
      locationTitle: "📍 Our Village Location",
      busTitle: "🚌 Village Bus Timings",
      numbersTitle: "Our Village in Numbers",
      people: "Total People",
      houses: "Total Houses",
      shops: "Total Shops",
    }
  };

  const switcher = document.getElementById("languageSwitcher");
  if (!switcher) return;

  switcher.addEventListener("change", (e) => {
    const lang = e.target.value;
    const t = translations[lang];

    // Top nav
    const navLinks = {
      '#welcome': t.home,
      '#about': t.about,
      '#location': t.location,
      '#weather': t.weather
    };
    for (const [selector, text] of Object.entries(navLinks)) {
      const el = document.querySelector(`a[href="${selector}"]`);
      if (el) el.innerText = text;
    }

    const number = document.getElementById("number");
    if (number) number.innerText = `👥 ${t.visitors}: 1321`;

    const welcomeTitle = document.querySelector("#welcome h2");
    if (welcomeTitle) welcomeTitle.innerText = t.welcomeTitle;

    const welcomeDesc = document.querySelector("#welcome p");
    if (welcomeDesc) welcomeDesc.innerText = t.welcomeDesc;

    const aboutText = document.querySelector("#about p");
    if (aboutText) aboutText.innerText = t.aboutText;

    const fruitsTitle = document.querySelector("#fruits h3");
    if (fruitsTitle) fruitsTitle.innerText = t.seasonalTitle;

    const feedbackTitle = document.querySelector("#feedbackForm")?.previousElementSibling;
    if (feedbackTitle) feedbackTitle.innerText = t.feedbackTitle;

    const feedbackBtn = document.querySelector("#feedbackForm button");
    if (feedbackBtn) feedbackBtn.innerText = t.feedbackBtn;

    const weatherTitle = document.querySelector("#weather h3");
    if (weatherTitle) weatherTitle.innerText = t.weatherTitle;

    const locationTitle = document.querySelector("#location h3");
    if (locationTitle) locationTitle.innerText = t.locationTitle;

    const busTitle = document.querySelector("section.bg-blue-50 h3");
    if (busTitle) busTitle.innerText = t.busTitle;

    const numbersTitle = document.querySelector("section.bg-white h3");
    if (numbersTitle) numbersTitle.innerText = t.numbersTitle;

    const peopleLabel = document.getElementById("countPeople")?.nextElementSibling;
    if (peopleLabel) peopleLabel.innerText = t.people;

    const housesLabel = document.getElementById("countHouses")?.nextElementSibling;
    if (housesLabel) housesLabel.innerText = t.houses;

    const shopsLabel = document.getElementById("countShops")?.nextElementSibling;
    if (shopsLabel) shopsLabel.innerText = t.shops;
  });
});