$(function () {

    // Validación
    ValidationModule.init();

    // Preview imagen categoría
    ImagePreviewModule.bind($("#catImage"), $("#catThumb"));

});
