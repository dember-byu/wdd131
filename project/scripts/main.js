const trailsData = [
  { 
    name: "Chejta Rumi Trail", 
    difficulty: "Easy", 
    distance: "2 km", 
    images: [
      "images/chejta_rumi.jpg",
      "images/trail2.jpg",
      "images/trail.jpg"
    ]
  },
  { 
    name: "Qomer Khocha Trail", 
    difficulty: "Moderate", 
    distance: "6 km", 
    images: [
      "images/lak3.png", 
      "images/route_media2.png",
      "images/paisaje.jpg"
    ]
  },
  { 
    name: "Infiernillos Lake Trail", 
    difficulty: "Hard", 
    distance: "12 km", 
    images: [
      "images/route_hard.png", 
      "images/route_hard2.png",
      "images/family_trail.jpg"
    ]
  }
];


const baselineGear = ["Insulated Winter Jacket", "Hydration Pack", "Rain Poncho", "First Aid Kit"];


document.addEventListener("DOMContentLoaded", () => {

  if (document.getElementById("alert-banner")) {
    displayDynamicAlertBanner();
    processUserVisits();
  }


  if (document.getElementById("trails-grid")) {
    renderTrailCatalog(trailsData);
  }


  if (document.getElementById("checklist-items")) {
    initializePreparationEngine();
  }
});


function displayDynamicAlertBanner() {
  const containerNode = document.getElementById("alert-banner");
  const timeInstanceHour = new Date().getHours();
  let situationalAdvice = "Ensure consistent hydration intervals and follow pacing metrics carefully to avoid acute altitude issues.";
  
  if (timeInstanceHour > 17 || timeInstanceHour < 6) {
    situationalAdvice = "High alpine night currents cause rapid temperature drops. Pack structural winter layers before departing.";
  }
  
  containerNode.innerHTML = `⚠️ High-Altitude Condition Report: Tiraque sits above 3,200m elevation. ${situationalAdvice}`;
}

function processUserVisits() {
  let counterStateValue = localStorage.getItem("tiraqueSiteCounter") || 0;
  counterStateValue = parseInt(counterStateValue) + 1;
  localStorage.setItem("tiraqueSiteCounter", counterStateValue);
  
  document.getElementById("visit-counter").innerHTML = `You have opened this regional trail advisor platform ${counterStateValue} times!`;
}


function renderTrailCatalog(arrayDataset) {
  const layoutGridContainer = document.getElementById("trails-grid");
  layoutGridContainer.innerHTML = ""; 
  
  arrayDataset.forEach(route => {

    let galleryHTML = "";
    route.images.forEach(imgUrl => {
      galleryHTML += `<img src="${imgUrl}" alt="${route.name} gallery view" loading="lazy" onclick="openModal('${imgUrl}')">`;
    });


    const renderedCardTemplate = `
      <div class="card">
        <div class="trail-gallery">
          ${galleryHTML}
        </div>
        <div class="card-content">
          <h3>${route.name}</h3>
          <p><strong>Difficulty Level:</strong> ${route.difficulty}</p>
          <p><strong>Total Course Distance:</strong> ${route.distance}</p>
        </div>
      </div>
    `;
    layoutGridContainer.innerHTML += renderedCardTemplate;
  });
}


function filterTrails(difficultyParameterKey) {
  // Selecciona el contenedor del HTML
  const layoutGridContainer = document.getElementById("trails-grid");
  if (!layoutGridContainer) return;

  if (difficultyParameterKey === "all") {

    renderTrailCatalog(trailsData);
  } else {

    const filteredResults = trailsData.filter(route => route.difficulty === difficultyParameterKey);
    renderTrailCatalog(filteredResults);
  }
}


function openModal(imageSrc) {
  const modal = document.getElementById("image-modal");
  const modalImg = document.getElementById("modal-img");
  
  if (modal && modalImg) {
    modalImg.src = imageSrc;
    modal.style.display = "flex"; 
  }
}

function closeModal() {
  const modal = document.getElementById("image-modal");
  if (modal) {
    modal.style.display = "none"; 
  }
}


function initializePreparationEngine() {
  let persistentGearData = JSON.parse(localStorage.getItem("activeTiraqueGearList"));
  
  if (!persistentGearData) {
    persistentGearData = baselineGear.map(gearItem => ({ name: gearItem, packed: false }));
    localStorage.setItem("activeTiraqueGearList", JSON.stringify(persistentGearData));
  }

  renderInteractiveChecklist(persistentGearData);

  const structuralFormNode = document.getElementById("gear-form");
  if (structuralFormNode) {
    structuralFormNode.addEventListener("submit", (eventInstance) => {
      eventInstance.preventDefault();
      const descriptiveInputNode = document.getElementById("gear-input");
      const sanitizedInputValue = descriptiveInputNode.value.trim();

      if (sanitizedInputValue) {
        let memoryStateCollection = JSON.parse(localStorage.getItem("activeTiraqueGearList"));
        memoryStateCollection.push({ name: sanitizedInputValue, packed: false });
        localStorage.setItem("activeTiraqueGearList", JSON.stringify(memoryStateCollection));
        
        descriptiveInputNode.value = ""; 
        renderInteractiveChecklist(memoryStateCollection);
      }
    });
  }
}

function renderInteractiveChecklist(itemsCollection) {
  const listingsUnorderedContainer = document.getElementById("checklist-items");
  if (!listingsUnorderedContainer) return;
  
  listingsUnorderedContainer.innerHTML = ""; 
  let targetedPackedCountValue = 0;

  itemsCollection.forEach((individualItem, keyIndexValue) => {
    if (individualItem.packed) targetedPackedCountValue++;

    const rowListItemTemplate = `
      <li>
        <input type="checkbox" id="gear-element-${keyIndexValue}" ${individualItem.packed ? "checked" : ""} onchange="switchItemPackStatus(${keyIndexValue})">
        <label for="gear-element-${keyIndexValue}">${individualItem.name}</label>
      </li>
    `;
    listingsUnorderedContainer.innerHTML += rowListItemTemplate;
  });

  const progressRatioCalculation = itemsCollection.length > 0 ? Math.round((targetedPackedCountValue / itemsCollection.length) * 100) : 0;
  const layoutProgressBarNode = document.getElementById("progress-bar");
  
  if (layoutProgressBarNode) {
    layoutProgressBarNode.style.width = `${progressRatioCalculation}%`;
    layoutProgressBarNode.innerHTML = `${progressRatioCalculation}%`;
  }
}

function switchItemPackStatus(targetItemIndexKey) {
  let currentActiveMemoryState = JSON.parse(localStorage.getItem("activeTiraqueGearList"));
  currentActiveMemoryState[targetItemIndexKey].packed = !currentActiveMemoryState[targetItemIndexKey].packed;
  
  localStorage.setItem("activeTiraqueGearList", JSON.stringify(currentActiveMemoryState));
  renderInteractiveChecklist(currentActiveMemoryState);
}
