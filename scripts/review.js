document.addEventListener("DOMContentLoaded", () => {
    
    const lastModSpan = document.getElementById("last-mod-date");
if (lastModSpan) {

    lastModSpan.textContent = document.lastModified; 
}
    

    let currentCount = localStorage.getItem("reviewsCompleted");
    

    if (currentCount === null) {
        currentCount = 0;
    } else {
        currentCount = parseInt(currentCount);
    }


    currentCount += 1;

    localStorage.setItem("reviewsCompleted", currentCount);


    document.getElementById("review-count").textContent = currentCount;
});
