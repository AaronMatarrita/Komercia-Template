// Módulo: Categorías (modal + chips)
const CategoriesModule = (() => {

    const CATEGORIES = [
        { id: 1, name: "Gastronomía" },
        { id: 2, name: "Cafetería" },
        { id: 3, name: "Panadería" },
        { id: 4, name: "Restaurante" },
        { id: 5, name: "Pizzería" },
        { id: 6, name: "Farmacia" },
        { id: 7, name: "Ropa" },
        { id: 8, name: "Tecnología" },
        { id: 9, name: "Supermercado" },
        { id: 10, name: "Ferretería" },
        { id: 11, name: "Servicios profesionales" },
        { id: 12, name: "Belleza y cuidado personal" }
    ];

    let selectedCatIds = new Set();
    let $chips, $hiddenCats, $list, $search, $modal, modalInstance;

    function renderCategoryList(filter = "") {
        const f = filter.trim().toLowerCase();
        const items = CATEGORIES
            .filter(c => c.name.toLowerCase().includes(f))
            .map(c => {
                const checked = selectedCatIds.has(c.id) ? "checked" : "";
                return `
                <label class="category-item">
                    <input type="checkbox" class="cat-check" value="${c.id}" ${checked}>
                    <span>${c.name}</span>
                </label>`;
            })
            .join("");

        $list.html(items || `<div class="text-secondary">Sin resultados para “${filter}”.</div>`);
    }

    function syncChipsAndHidden() {
        const chips = [...selectedCatIds].map(id => {
            const obj = CATEGORIES.find(c => c.id === id);
            if (!obj) return "";
            return `
                <span class="chip" data-id="${obj.id}">
                    <i class="bi bi-tag"></i>${obj.name}
                    <button type="button" class="chip-remove" aria-label="Quitar"><i class="bi bi-x"></i></button>
                </span>`;
        }).join("");

        $chips.html(chips);

        const hidden = [...selectedCatIds]
            .map(id => `<input type="hidden" name="categorias[]" value="${id}">`)
            .join("");
        $hiddenCats.html(hidden);
    }

    function initEvents() {
        $("#btnOpenCategories").on("click", function () {
            renderCategoryList();
            modalInstance.show();
            setTimeout(() => $search.trigger("focus"), 200);
        });

        $("#btnClearCategories").on("click", function () {
            selectedCatIds.clear();
            syncChipsAndHidden();
        });

        $search.on("input", function () {
            renderCategoryList($(this).val());
        });

        $list.on("change", ".cat-check", function () {
            const id = Number($(this).val());
            if (this.checked) selectedCatIds.add(id);
            else selectedCatIds.delete(id);
        });

        $("#btnSaveCategories").on("click", function () {
            syncChipsAndHidden();
            modalInstance.hide();
        });

        $chips.on("click", ".chip-remove", function () {
            const id = Number($(this).closest(".chip").data("id"));
            selectedCatIds.delete(id);
            syncChipsAndHidden();
        });
    }

    function init() {
        $modal = $("#categoriesModal");
        if ($modal.length === 0) return;

        modalInstance = new bootstrap.Modal($modal[0]);
        $chips = $("#selectedCategories");
        $hiddenCats = $("#categoriesHidden");
        $list = $("#categoriesList");
        $search = $("#categoriesSearch");

        initEvents();
    }

    return { init };

})();