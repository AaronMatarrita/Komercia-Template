$(function () {

    // Preview Imagen Slider
    ImagePreviewModule.bind($("#sliderImage"), $("#sliderThumb"));

    // Validación general de formularios (si aplica en esta página)
    if ($(".needs-validation").length) {
        ValidationModule.init();
    }

});
