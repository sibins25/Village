// 🍔 Toggle Side Menu Open/Close
const menuToggle = document.getElementById("menuToggle");
const menuClose = document.getElementById("menuClose");
const sideMenu = document.getElementById("sideMenu");

menuToggle.addEventListener("click", () => {
  sideMenu.classList.toggle("-translate-x-full");
});

menuClose.addEventListener("click", () => {
  sideMenu.classList.add("-translate-x-full");
});

// 🖱️ Close Menu When Clicking Outside
document.addEventListener("click", (e) => {
  if (
    !sideMenu.contains(e.target) &&
    !menuToggle.contains(e.target) &&
    !sideMenu.classList.contains("-translate-x-full")
  ) {
    sideMenu.classList.add("-translate-x-full");
  }
});


const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animate");
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll("section").forEach(section => {
  section.classList.add("opacity-0", "translate-y-10");
  observer.observe(section);
});