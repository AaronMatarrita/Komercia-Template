$(function () {

    const $drop = $("#productGalleryDrop");
    const $grid = $("#galleryGrid");
    const $input = $("#productGalleryInput");
    const $btnPick = $("#btnPickProductGallery");
    const $placeholder = $("#galleryEmpty");

    // Mostrar / ocultar placeholder
    function togglePlaceholder() {
        if ($grid.children(".thumb-item").length === 0) {
            $placeholder.removeClass("d-none");
        } else {
            $placeholder.addClass("d-none");
        }
    }

    // Vincular módulo de galería 
    if (typeof GalleryModule !== "undefined") {
        GalleryModule.bind($drop, $grid, $input, $btnPick);
    }

    // Confirmación antes de eliminar
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

    // Inicial
    togglePlaceholder();
});
