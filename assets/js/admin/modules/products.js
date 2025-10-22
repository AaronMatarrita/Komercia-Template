// Módulo: Productos dinámicos
const ProductsModule = (() => {

    let $wrapper, $template;

    function reindex() {
        $wrapper.find(".product-card").each(function (idx) {
            const $card = $(this);
            $card.find(".prod-index").text(idx + 1);

            $card.find('input[type="text"]').attr("name", `products[${idx}][dsc_nombre]`);
            $card.find('input[type="number"]').attr("name", `products[${idx}][precio]`);
            $card.find("textarea").attr("name", `products[${idx}][dsc_descripcion]`);
            $card.find(".prod-featured").attr("name", `products[${idx}][imagen_destacada]`);
            $card.find(".fileInput").attr("name", `products[${idx}][galeria][]`);
        });
    }

    function bindCard($card) {
        // Eliminar
        $card.find(".btnRemoveProduct").on("click", function () {
            $card.remove();
            reindex();
        });

        // Imagen destacada
        const $featured = $card.find(".prod-featured");
        const $thumb = $card.find(".featured-thumb");

        $featured.on("change", function (e) {
            const file = e.target.files?.[0];
            if (!file) return;
            const url = URL.createObjectURL(file);
            $thumb.html(`<img src="${url}" alt="preview">`);
        });

        // Galería dentro del producto (usa GalleryModule)
        const $drop = $card.find(".prod-drop");
        const $grid = $card.find(".prod-grid");
        const $input = $card.find(".fileInput");
        const $btnPick = $card.find(".btnPick");

        GalleryModule.bind($drop, $grid, $input, $btnPick);
    }

    function add() {
        const node = $template[0].content.cloneNode(true);
        const $card = $(node).find(".product-card");
        $wrapper.append($card);
        bindCard($card);
        reindex();
    }

    function init($container, $tpl) {
        $wrapper = $container;
        $template = $tpl;

        // Agregar producto inicial por defecto
        add();

        // Botón "Agregar producto"
        $("#btnAddProduct").on("click", function () {
            add();
        });
    }

    return { init };

})();