// 1. Referencias a los elementos de la interfaz del DOM
const input = document.querySelector('#favchap');
const button = document.querySelector('button');
const list = document.querySelector('#list');

// 2. Inicialización del arreglo cargando datos previos o creando uno vacío
let chaptersArray = getChapterList() || [];

// 3. Poblado inicial: dibuja cada capítulo almacenado al cargar la página
chaptersArray.forEach(chapter => {
  displayList(chapter);
});

// 4. Escuchador de eventos para el botón de añadir elemento
button.addEventListener('click', () => {
  if (input.value !== '') {  
    displayList(input.value); 
    chaptersArray.push(input.value);  
    setChapterList(); 
    input.value = ''; 
    input.focus(); 
  }
});

// 5. Función unificada para renderizar elementos en la lista visual
function displayList(item) {
  let li = document.createElement('li');
  let deletebutton = document.createElement('button');
  
  li.textContent = item; 
  deletebutton.textContent = '❌';
  deletebutton.classList.add('delete'); 
  
  li.append(deletebutton);
  list.append(li);
  
  // Evento de eliminación física y lógica
  deletebutton.addEventListener('click', function () {
    list.removeChild(li);
    deleteChapter(li.textContent); 
    input.focus(); 
  });
}

// 6. Función para codificar y guardar el arreglo actual en localStorage
function setChapterList() {
  localStorage.setItem('myFavBOMList', JSON.stringify(chaptersArray));
}

// 7. Función para recuperar e interpretar el arreglo desde localStorage
function getChapterList() {
  return JSON.parse(localStorage.getItem('myFavBOMList'));
}

// 8. Función para remover selectivamente un capítulo del almacenamiento
function deleteChapter(chapter) {
  // Elimina el carácter del emoji '❌' del final de la cadena de texto
  chapter = chapter.slice(0, chapter.length - 1);
  // Conserva en el arreglo todos los elementos excepto el que se va a eliminar
  chaptersArray = chaptersArray.filter(item => item !== chapter);
  // Actualiza los cambios directamente en el almacenamiento del navegador
  setChapterList();
}
