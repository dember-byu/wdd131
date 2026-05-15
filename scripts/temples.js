// Footer year and last modified
document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;

// Hamburger menu toggle
const hamburger = document.getElementById("hamburger");
const nav = document.querySelector("nav");

hamburger.addEventListener("click", () => {
    if (nav.style.display === "flex") {
        nav.style.display = "none";
        hamburger.textContent = "☰";
    } else {
        nav.style.display = "flex";
        hamburger.textContent = "✖";
    }
});
