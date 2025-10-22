$(function () {

    /* ===============================
       PREVIEW IMAGEN DESTACADA
    ================================ */
    const $fileInput = $("#productImage");
    const $thumb = $("#productThumb");

    $fileInput.on("change", function (e) {
        const file = e.target.files?.[0];
        if (!file) return;

        const url = URL.createObjectURL(file);
        $thumb.html(`<img src="${url}" alt="preview">`);
    });

    /* ===============================
       SUBMIT (demo)
       -> Luego / Laravel
    ================================ */
    $("#productoForm").on("submit", function (e) {
        e.preventDefault();

        // Simple validación manual: imagen obligatoria
        if (!$fileInput[0].files.length) {
            $fileInput.addClass("is-invalid");
            return;
        }

        alert("Producto listo para enviar (demo).");
    });

});
