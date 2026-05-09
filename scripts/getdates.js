// Obtener el año actual para el copyright
const currentYear = new Date().getFullYear();
document.getElementById("currentyear").textContent = currentYear;

// Obtener la fecha de última modificación
document.getElementById("lastModified").textContent = `Last Modification: ${document.lastModified}`;
