// /assets/js/admin/pages/comercio_productos.js
$(function () {

    // ==============================
    // Datos fake (simulación)
    // ==============================
    const productos = [
        {
            id: 1,
            nombre: "Hamburguesa Clásica",
            precio: 5.99,
            imagen: "https://images.unsplash.com/photo-1594007654729-407eedc4be65?auto=format&fit=crop&w=400&q=80"
        },
        {
            id: 2,
            nombre: "Pizza Doble Queso",
            precio: 8.50,
            imagen: "https://images.unsplash.com/photo-1594007654729-407eedc4be65?auto=format&fit=crop&w=400&q=80"
        },
        {
            id: 3,
            nombre: "Café Capuchino",
            precio: 2.50,
            imagen: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=400&q=80"
        }
    ];

    const $tbody = $("table.table-custom tbody");
    $tbody.empty();

    // ==============================
    // Render de filas
    // ==============================
    productos.forEach(prod => {
        const row = `
            <tr>
                <td data-label="Nombre">${prod.nombre}</td>
                <td data-label="Precio">$${prod.precio.toFixed(2)}</td>
                <td data-label="Imagen">
                    <img src="${prod.imagen}" class="table-img-thumb" alt="${prod.nombre}">
                </td>
                <td data-label="Acciones" class="text-end">
                    <div class="table-actions">
                        <a href="form.html" class="btn-action edit" title="Editar">
                            <i class="bi bi-pencil"></i>
                        </a>
                        <a href="galeria.html" class="btn-action gallery" title="Galería">
                            <i class="bi bi-images"></i>
                        </a>
                        <button class="btn-action delete" title="Eliminar">
                            <i class="bi bi-trash"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `;
        $tbody.append(row);
    });

    // ==============================
    // Bind botones de eliminar
    // ==============================
    $tbody.on("click", ".btn-action.delete", function () {
        const id = $(this).data("id");
        if (confirm("¿Seguro que deseas eliminar este producto?")) {
            alert("Producto eliminado (demo). ID: " + id);
            // Aquí luego se hará AJAX DELETE en Laravel
        }
    });

    // ==============================
    // Inicializar DataTable (módulo)
    // ==============================
    if (typeof TableModule !== "undefined") {
        TableModule.init(".table-custom");
    }

});
