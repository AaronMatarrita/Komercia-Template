$(document).ready(function () {

    /* ========= Iniciales demo ========= */
    const userName = "Aaron Matarrita";
    const initials = $.trim(userName).split(/\s+/).map(n => n[0]).join("").slice(0, 3).toUpperCase();
    $("#userInitials").text(initials || "AD");

    /* ========= Sidebar ========= */
    const $sidebar = $(".sidebar");
    const $main = $(".main");
    $("#sidebarToggle").on("click", function () {
        $sidebar.toggleClass("collapsed");
        $main.toggleClass("expanded");
    });

    /* ========= Imagen destacada comercio ========= */
    const $fInput = $("#featuredInput");
    const $fThumb = $("#featuredThumb");
    $fInput.on("change", function (e) {
        const file = e.target.files?.[0];
        if (!file) return;
        const url = URL.createObjectURL(file);
        $fThumb.html(`<img src="${url}" alt="preview">`);
    });

    /* =========================================================================
       CATEGORÍAS (PLANA) — modal con buscador + checkboxes + chips + hidden
       ========================================================================= */
    // Fuente hardcodeada temporal (puedes reemplazar por backend cuando quieras)
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

    const selectedCatIds = new Set();
    const $chips = $("#selectedCategories");
    const $hiddenCats = $("#categoriesHidden");
    const $modal = new bootstrap.Modal(document.getElementById("categoriesModal"));
    const $list = $("#categoriesList");
    const $search = $("#categoriesSearch");

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
            }).join("");

        $list.html(items || `<div class="text-secondary">Sin resultados para “${filter}”.</div>`);
    }

    function syncChipsAndHidden() {
        // Chips visibles
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

        // Hidden inputs
        const hidden = [...selectedCatIds].map(id => `<input type="hidden" name="categorias[]" value="${id}">`).join("");
        $hiddenCats.html(hidden);
    }

    // Eventos
    $("#btnOpenCategories").on("click", function () {
        renderCategoryList();
        $modal.show();
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
        $modal.hide();
    });

    $chips.on("click", ".chip-remove", function () {
        const id = Number($(this).closest(".chip").data("id"));
        selectedCatIds.delete(id);
        syncChipsAndHidden();
    });

    /* =========================================================================
       TAG INPUTS (Teléfonos / Emails) — tags con Enter, máx 5, validación
       ========================================================================= */
    function createTagInput($wrapper, opts) {
        const name = opts.name;          // ej: telefonos[] / emails[]
        const type = opts.type;          // 'phone' | 'email'
        const max = Number(opts.max) || 5;

        const $input = $('<input type="text" autocomplete="off">');
        const $hint = $('<div class="hint d-none"></div>');
        $wrapper.append($input, $hint);

        const values = [];

        const validators = {
            phone: (v) => /^[+\d][\d\s().-]{6,20}$/.test(v),
            email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)
        };

        function showError(msg) {
            $wrapper.addClass("is-invalid");
            $hint.text(msg).removeClass("d-none");
            setTimeout(() => { $wrapper.removeClass("is-invalid"); $hint.addClass("d-none"); }, 1800);
        }

        function addTag(raw) {
            const v = String(raw || "").trim();
            if (!v) return;

            if (values.includes(v.toLowerCase())) { showError("Ya existe."); return; }
            if (values.length >= max) { showError(`Máximo ${max}.`); return; }

            const isValid = validators[type] ? validators[type](v) : true;
            if (!isValid) { showError(type === 'phone' ? "Teléfono inválido." : "Email inválido."); return; }

            values.push(v.toLowerCase());

            const $tag = $(`
        <span class="tag" data-value="${v}">
          <i class="bi ${type === 'email' ? 'bi-envelope' : 'bi-telephone'}"></i>${v}
          <button type="button" class="remove" aria-label="Quitar"><i class="bi bi-x"></i></button>
          <input type="hidden" name="${name}" value="${v}">
        </span>
      `);
            $tag.insertBefore($input);
            $input.val("");
        }

        $wrapper.on("click", () => $input.trigger("focus"));

        $input.on("keydown", function (e) {
            if (e.key === "Enter") {
                e.preventDefault();
                addTag($input.val());
            } else if (e.key === "Backspace" && !$input.val() && $wrapper.find(".tag").length) {
                // borrar el último
                $wrapper.find(".tag").last().find(".remove").trigger("click");
            }
        });

        $wrapper.on("click", ".remove", function () {
            const $tag = $(this).closest(".tag");
            const val = $tag.data("value").toLowerCase();
            const idx = values.indexOf(val);
            if (idx >= 0) values.splice(idx, 1);
            $tag.remove();
        });

        return { add: addTag, getAll: () => [...values] };
    }

    // Instanciar teléfonos y emails
    const phonesTI = createTagInput($("#phonesTags"), {
        name: $("#phonesTags").data("name"),
        type: $("#phonesTags").data("type"),
        max: $("#phonesTags").data("max")
    });
    const emailsTI = createTagInput($("#emailsTags"), {
        name: $("#emailsTags").data("name"),
        type: $("#emailsTags").data("type"),
        max: $("#emailsTags").data("max")
    });

    /* =========================================================================
       GALERÍA COMERCIO (drag & drop)
       ========================================================================= */
    const $galleryDrop = $("#galleryDrop");
    const $galleryGrid = $("#galleryGrid");
    const $galleryInput = $("#galleryInput");
    const $btnPickGallery = $("#btnPickGallery");

    const addThumb = (file, $container) => {
        const url = URL.createObjectURL(file);
        const $item = $(`
      <div class="thumb-item">
        <img src="${url}" alt="img">
        <button type="button" class="thumb-remove"><i class="bi bi-x-lg"></i></button>
      </div>
    `);
        $item.find(".thumb-remove").on("click", () => $item.remove());
        $container.append($item);
    };

    const handleFiles = (files, $grid) => {
        [...files].forEach(file => addThumb(file, $grid));
    };

    ["dragenter", "dragover"].forEach(evt => {
        $galleryDrop.on(evt, function (e) {
            e.preventDefault(); e.stopPropagation();
            $galleryDrop.addClass("is-dragover");
        });
    });
    ["dragleave", "drop"].forEach(evt => {
        $galleryDrop.on(evt, function (e) {
            e.preventDefault(); e.stopPropagation();
            if (evt === "drop") {
                handleFiles(e.originalEvent.dataTransfer.files, $galleryGrid);
            }
            $galleryDrop.removeClass("is-dragover");
        });
    });

    $galleryDrop.on("click", () => $galleryInput[0].click());
    $btnPickGallery.on("click", () => $galleryInput[0].click());
    $galleryInput.on("change", e => handleFiles(e.target.files, $galleryGrid));

    /* =========================================================================
       PRODUCTOS dinámicos
       ========================================================================= */
    const $productsWrapper = $("#productsWrapper");
    const $productTemplate = $("#productTemplate");

    function reindexProducts() {
        $productsWrapper.find(".product-card").each(function (idx) {
            const $card = $(this);
            $card.find(".prod-index").text(idx + 1);
            $card.find('input[type="text"]').attr("name", `products[${idx}][dsc_nombre]`);
            $card.find('input[type="number"]').attr("name", `products[${idx}][precio]`);
            $card.find("textarea").attr("name", `products[${idx}][dsc_descripcion]`);
            $card.find(".prod-featured").attr("name", `products[${idx}][imagen_destacada]`);
            $card.find(".fileInput").attr("name", `products[${idx}][galeria][]`);
        });
    }

    function bindProduct($card) {
        // eliminar
        $card.find(".btnRemoveProduct").on("click", function () {
            $card.remove();
            reindexProducts();
        });

        // destacada
        const $featured = $card.find(".prod-featured");
        const $thumb = $card.find(".featured-thumb");
        $featured.on("change", function (e) {
            const file = e.target.files?.[0];
            if (!file) return;
            const url = URL.createObjectURL(file);
            $thumb.html(`<img src="${url}" alt="preview">`);
        });

        // galería
        const $drop = $card.find(".prod-drop");
        const $grid = $card.find(".prod-grid");
        const $input = $card.find(".fileInput");
        const $btnPick = $card.find(".btnPick");

        ["dragenter", "dragover"].forEach(evt => {
            $drop.on(evt, function (e) {
                e.preventDefault(); e.stopPropagation();
                $drop.addClass("is-dragover");
            });
        });
        ["dragleave", "drop"].forEach(evt => {
            $drop.on(evt, function (e) {
                e.preventDefault(); e.stopPropagation();
                if (evt === "drop") handleFiles(e.originalEvent.dataTransfer.files, $grid);
                $drop.removeClass("is-dragover");
            });
        });

        $drop.on("click", function (e) {
            if ($(e.target).is(".btnPick, .fileInput, input, button, i")) return;
            e.stopPropagation();
            $input[0].click(); // click nativo evita loop
        });

        $btnPick.on("click", () => $input[0].click());
        $input.on("change", e => handleFiles(e.target.files, $grid));
    }

    $("#btnAddProduct").on("click", function () {
        const node = $productTemplate[0].content.cloneNode(true);
        const $card = $(node).find(".product-card");
        $productsWrapper.append($card);
        reindexProducts();
        bindProduct($card);
    });

    // crea uno por defecto
    $("#btnAddProduct").trigger("click");

    /* =========================================================================
       MAPA Leaflet + Geocoding Nominatim
       ========================================================================= */
    const map = L.map("map", { zoomControl: true }).setView([9.9281, -84.0907], 13);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap"
    }).addTo(map);

    const $latInput = $("#latInput");
    const $lngInput = $("#lngInput");
    const marker = L.marker(map.getCenter(), { draggable: true }).addTo(map);

    function setLatLng(latlng) {
        marker.setLatLng(latlng);
        map.panTo(latlng);
        $latInput.val(Number(latlng.lat).toFixed(6));
        $lngInput.val(Number(latlng.lng).toFixed(6));
    }
    setLatLng(map.getCenter());
    marker.on("dragend", e => setLatLng(e.target.getLatLng()));

    $("#btnMyLocation").on("click", function () {
        if (!navigator.geolocation) return alert("Geolocalización no soportada.");
        navigator.geolocation.getCurrentPosition(
            pos => setLatLng({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
            () => alert("No se pudo obtener tu ubicación.")
        );
    });

    async function geocode(q) {
        const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(q)}&limit=1`;
        const res = await fetch(url, { headers: { "Accept-Language": "es" } });
        const data = await res.json();
        if (!data?.length) return null;
        return { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) };
    }

    $("#btnGeocode").on("click", async function () {
        const q = $("#geocodeQuery").val().trim() || $("#addressInput").val().trim();
        if (!q) return;
        const ll = await geocode(q);
        if (!ll) return alert("Dirección no encontrada.");
        setLatLng(ll);
    });

    /* =========================================================================
       Submit demo
       ========================================================================= */
    $("#comercioForm").on("submit", function (e) {
        e.preventDefault();
        alert("Formulario listo para enviar (demo).");
    });
});
