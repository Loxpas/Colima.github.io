
    // Esperar a que el documento esté listo
    document.addEventListener("DOMContentLoaded", function() {
        // Seleccionar el enlace de "Colima - Mexico"
        const titleLink = document.querySelector("h1 a");

        // Añadir evento de clic
        titleLink.addEventListener("click", function(e) {
            // Prevenir el comportamiento por defecto del enlace (recargar la página)
            e.preventDefault();

            // Hacer scroll hacia la parte superior
            window.scrollTo({
                top: 0,
                behavior: "smooth"  // Desplazamiento suave
            });
        });
    });

