const TableModule = (() => {

    function bindImgPreview(selector = ".table-img-thumb") {
        let $preview = $('<img class="thumb-preview" />').appendTo("body").hide();

        $(document).on("mouseenter", selector, function (e) {
            const src = $(this).attr("src");
            $preview.attr("src", src).fadeIn(120);
        });

        $(document).on("mousemove", selector, function (e) {
            $preview.css({
                top: e.pageY + 10,
                left: e.pageX + 10
            });
        });

        $(document).on("mouseleave", selector, function () {
            $preview.fadeOut(120);
        });
    }

    function bindDelete(callback) {
        $(document).on("click", ".btn-action.delete", function () {
            const row = $(this).closest("tr");
            const id = row.data("id");
            if (confirm("¿Eliminar este registro?")) callback(id, row);
        });
    }

    return { bindImgPreview, bindDelete };

})();