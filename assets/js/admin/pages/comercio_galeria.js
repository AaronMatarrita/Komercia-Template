$(function () {

    const $grid = $("#galleryGrid");
    const $empty = $("#galleryEmpty");

    // Helper: mostrar u ocultar placeholder
    function togglePlaceholder() {
        if ($grid.children().length === 0) console.log("Empty");
        else $empty.hide();
    }

    // Inicialización de la galería
    GalleryModule.bind($("#galleryDrop"), $grid, $("#galleryInput"), $("#btnPickGallery"), togglePlaceholder);

    // Confirmación antes de eliminar (interceptamos llamada del módulo)
    $(document).on("click", ".thumb-remove", function (e) {
        e.stopPropagation();
        if (confirm("¿Deseas eliminar esta imagen?")) {
            $(this).closest(".thumb-item").remove();
            togglePlaceholder();
        }
    });

    // Botón Guardar (solo UI por ahora)
    $("#btnSaveGallery").on("click", function () {
        alert("Cambios guardados (UI). Integración backend pendiente.");
    });

    // Mostrar estado inicial
    togglePlaceholder();
});
