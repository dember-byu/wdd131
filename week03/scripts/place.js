// 1. Definición de variables estáticas para temperatura y velocidad de viento (unidades métricas)
const temperature = 18; 
const windSpeed = 8;    

// 2. Función de flecha de una sola línea para calcular el Wind Chill en °C
const calculateWindChill = (t, v) => (13.12 + (0.6215 * t) - (11.37 * Math.pow(v, 0.16)) + (0.3965 * t * Math.pow(v, 0.16))).toFixed(1);

// 3. Ejecución al cargar el DOM de la página
window.addEventListener("DOMContentLoaded", () => {
    const windChillDisplay = document.getElementById("wind-chill");

    // Requisito: Evaluar condiciones métricas (Temperatura <= 10 °C y Viento > 4.8 km/h)
    if (temperature <= 10 && windSpeed > 4.8) {
        windChillDisplay.textContent = `${calculateWindChill(temperature, windSpeed)} °C`;
    } else {
        windChillDisplay.textContent = "N/A";
    }

    // 4. Modificación dinámica del Footer
    document.getElementById("current-year").textContent = new Date().getFullYear();
    document.getElementById("last-modified").textContent = document.lastModified;
});
