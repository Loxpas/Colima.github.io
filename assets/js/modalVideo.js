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
