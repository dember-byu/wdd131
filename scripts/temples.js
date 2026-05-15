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
    const hamburger = document.getElementById("hamburger");
    const nav = document.querySelector("nav");

    hamburger.addEventListener("click", () => {
        if (nav.style.display === "flex") {
            nav.style.display = "none";
            hamburger.textContent = "☰"; // vuelve al ícono hamburguesa
        } else {
            nav.style.display = "flex";
            hamburger.textContent = "✖"; // cambia a ícono de cerrar
        }
    });
    
});
