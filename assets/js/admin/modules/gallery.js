// Módulo: Galería (drag & drop + preview)
const GalleryModule = (() => {

    function addThumb(file, $container, onChange) {
        const url = URL.createObjectURL(file);
        const $item = $(`
            <div class="thumb-item">
                <img src="${url}" alt="img">
                <button type="button" class="thumb-remove">
                    <i class="bi bi-x-lg"></i>
                </button>
            </div>
        `);

        // eliminar
        $item.find(".thumb-remove").on("click", function () {
            $item.remove();
            if (typeof onChange === "function") onChange();
        });

        $container.append($item);

        // notificar que hay al menos una imagen
        if (typeof onChange === "function") onChange();
    }

    function handleFiles(files, $container, onChange) {
        [...files].forEach(file => addThumb(file, $container, onChange));
    }

    function bind($drop, $grid, $input, $btnPick, onChange) {

        ["dragenter", "dragover"].forEach(evt => {
            $drop.on(evt, function (e) {
                e.preventDefault();
                e.stopPropagation();
                $drop.addClass("is-dragover");
            });
        });

        ["dragleave", "drop"].forEach(evt => {
            $drop.on(evt, function (e) {
                e.preventDefault();
                e.stopPropagation();
                if (evt === "drop") {
                    handleFiles(e.originalEvent.dataTransfer.files, $grid, onChange);
                }
                $drop.removeClass("is-dragover");
            });
        });

        $drop.on("click", function (e) {
            if ($(e.target).is("button, i, input")) return;
            $input.trigger("click");
        });

        $btnPick.on("click", function () {
            $input.trigger("click");
        });

        $input.on("change", function (e) {
            handleFiles(e.target.files, $grid, onChange);
        });
    }

    return { bind };

})();
