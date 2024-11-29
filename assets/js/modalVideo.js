// Obtener el modal
var modal = document.getElementById("myModal");

// Obtener el botón que abre el modal
var btn = document.getElementById("openModal");

// Obtener el elemento <span> que cierra el modal
var span = document.getElementsByClassName("close")[0];

// Guardar el último elemento enfocado antes de abrir el modal
var lastFocusedElement;

// Cuando el usuario hace clic en el botón, se abre el modal
btn.onclick = function() {
  modal.style.display = "block";

  // Guardar el último elemento enfocado
  lastFocusedElement = document.activeElement;

  var videoContainer = document.getElementById("videoContainer");

  // Crear el iframe y agregarlo al contenedor del video
  var iframe = document.createElement("iframe");
  iframe.width = "560";
  iframe.height = "315";
  iframe.src = "https://www.youtube.com/embed/Py-S5I00kfM?si=J60Dx0pT42E7EsOj";
  iframe.frameborder = "0";
  iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
  iframe.referrerpolicy = "strict-origin-when-cross-origin";
  iframe.allowfullscreen = true;

  // Agregar el iframe al contenedor
  videoContainer.appendChild(iframe);

  // Mover el foco al botón de cerrar dentro del modal
  span.focus();

  // Prevenir que el foco salga del modal con Tab
  trapFocus();
}

// Cuando el usuario hace clic en <span> (x), se cierra el modal y se detiene el video
span.onclick = function() {
  closeModal();
}

// Cuando el usuario hace clic en cualquier parte fuera del modal, se cierra el modal y se detiene el video
window.onclick = function(event) {
  if (event.target == modal) {
    closeModal();
  }
}

// Función para cerrar el modal
function closeModal() {
  modal.style.display = "none";
  var videoContainer = document.getElementById("videoContainer");

  // Eliminar el iframe para detener el video
  videoContainer.innerHTML = "";

  // Regresar el foco al último elemento enfocado
  lastFocusedElement.focus();
}

// Restringir el enfoque dentro del modal cuando está abierto
function trapFocus() {
  const focusableElements = modal.querySelectorAll('button, a, input, select, textarea, [tabindex]:not([tabindex="-1"])');
  const firstFocusableElement = focusableElements[0];
  const lastFocusableElement = focusableElements[focusableElements.length - 1];

  modal.addEventListener('keydown', function(event) {
    if (event.key === "Tab") {
      if (event.shiftKey) { // Shift + Tab
        if (document.activeElement === firstFocusableElement) {
          lastFocusableElement.focus(); // Redirigir al último elemento
          event.preventDefault(); // Evitar que el foco salga
        }
      } else { // Tab
        if (document.activeElement === lastFocusableElement) {
          firstFocusableElement.focus(); // Redirigir al primer elemento
          event.preventDefault(); // Evitar que el foco salga
        }
      }
    }

    // Cerrar el modal si se presiona la tecla Escape
    if (event.key === "Escape") {
      closeModal();
    }
  });
}

// Añadir un escuchador global para la tecla Escape fuera del modal también
document.addEventListener('keydown', function(event) {
  if (event.key === "Escape" && modal.style.display === "block") {
    closeModal();
  }
});


// JavaScript para manejar el modal accesible
document.addEventListener('DOMContentLoaded', function () {
  const modal = document.getElementById('myModal');
  const openModalButton = document.querySelector('.button[href="/ExtraPags/videoColima.html"]');
  const closeModalButton = modal.querySelector('.close');
  const focusableElementsString = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]';
  let focusableElements;
  let firstFocusableElement;
  let lastFocusableElement;

  // Función para abrir el modal
  function openModal(event) {
      event.preventDefault();
      modal.removeAttribute('hidden');
      modal.setAttribute('aria-hidden', 'false');

      focusableElements = modal.querySelectorAll(focusableElementsString);
      firstFocusableElement = focusableElements[0];
      lastFocusableElement = focusableElements[focusableElements.length - 1];

      firstFocusableElement.focus();

      document.addEventListener('keydown', trapTabKey);
      document.body.style.overflow = 'hidden'; // Evitar el scroll de fondo
  }

  // Función para cerrar el modal
  function closeModal() {
      modal.setAttribute('hidden', '');
      modal.setAttribute('aria-hidden', 'true');
      openModalButton.focus();

      document.removeEventListener('keydown', trapTabKey);
      document.body.style.overflow = 'auto'; // Restaurar el scroll
  }

  // Función para trapear el focus dentro del modal
  function trapTabKey(e) {
      if (e.key === 'Tab') {
          if (e.shiftKey) { // Shift + Tab
              if (document.activeElement === firstFocusableElement) {
                  e.preventDefault();
                  lastFocusableElement.focus();
              }
          } else { // Tab
              if (document.activeElement === lastFocusableElement) {
                  e.preventDefault();
                  firstFocusableElement.focus();
              }
          }
      }

      if (e.key === 'Escape') {
          closeModal();
      }
  }

  // Event Listeners
  openModalButton.addEventListener('click', openModal);
  closeModalButton.addEventListener('click', closeModal);

  // Cerrar el modal al hacer clic fuera del contenido
  modal.addEventListener('click', function (e) {
      if (e.target === modal) {
          closeModal();
      }
  });
});
