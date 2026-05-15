document.addEventListener("DOMContentLoaded", () => {
    // Inject current year dynamically
    const currentYearSpan = document.getElementById("currentyear");
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // Inject document last modified date dynamically
    const lastModifiedSpan = document.getElementById("lastModified");
    if (lastModifiedSpan) {
        lastModifiedSpan.textContent = document.lastModified;
    }

    // Handle responsive hamburger menu interactions
    const menuToggle = document.getElementById("menu-toggle");
    const primaryNav = document.getElementById("primary-nav");

    if (menuToggle && primaryNav) {
        menuToggle.addEventListener("click", () => {
            primaryNav.classList.toggle("open");

            // Toggle hamburger icon appearance between ☰ and ✕
            if (primaryNav.classList.contains("open")) {
                menuToggle.innerHTML = "&#10006;"; // 'X' close symbol
            } else {
                menuToggle.innerHTML = "&#9776;"; // Hamburger symbol
            }
        });
    }
});
