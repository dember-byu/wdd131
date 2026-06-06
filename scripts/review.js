document.addEventListener("DOMContentLoaded", () => {
    
    const lastModSpan = document.getElementById("last-mod-date");
if (lastModSpan) {
    // Toma la fecha de última modificación del archivo de forma automática
    lastModSpan.textContent = document.lastModified; 
}
    
    // Attempt to pull existing total value from local browser storage
    let currentCount = localStorage.getItem("reviewsCompleted");
    
    // Fall back to zero if no session counter has been established yet
    if (currentCount === null) {
        currentCount = 0;
    } else {
        currentCount = parseInt(currentCount);
    }

    // Advance the ongoing submission total counter by one step
    currentCount += 1;

    // Push the updated numerical sum back into safe local memory storage
    localStorage.setItem("reviewsCompleted", currentCount);

    // Inject the final display result directly into the placeholder element text
    document.getElementById("review-count").textContent = currentCount;
});
