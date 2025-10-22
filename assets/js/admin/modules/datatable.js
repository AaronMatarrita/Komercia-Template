$(document).ready(function () {
    $('table.table-custom').each(function () {
        initDataTable(this);
    });
});

function initDataTable(selector) {
    const isMobile = $(window).width() < 768;

    if (isMobile) return;

    const $table = $(selector);

    if (!$table.length) return; // evitar error si no existe

    const dt = $table.DataTable({
        paging: true,
        searching: true,
        info: false,
        lengthChange: false,
        language: {
            search: "Buscar:",
            zeroRecords: "No se encontraron resultados",
            emptyTable: "No hay registros disponibles",
            paginate: {
                first: "«",
                last: "»",
                next: "›",
                previous: "‹"
            }
        }
    });

    const wrapper = $table.closest('.dt-container');
    wrapper.find('.dt-search input[type="search"]').attr('placeholder', 'Buscar...');

    wrapper.find('.row.mt-2.justify-content-between > .col-md-auto.ms-auto')
        .addClass('col-12');

    return dt;
}
