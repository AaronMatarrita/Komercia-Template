$(function () {

   /* ===============================
      IMAGEN DESTACADA DEL COMERCIO
   ================================ */
   const $fInput = $("#featuredInput");
   const $fThumb = $("#featuredThumb");

   $fInput.on("change", function (e) {
      const file = e.target.files?.[0];
      if (!file) return;
      const url = URL.createObjectURL(file);
      $fThumb.html(`<img src="${url}" alt="preview">`);
   });

   /* ===============================
      CATEGORÍAS (modal + chips)
   ================================ */
   CategoriesModule.init();

   /* ===============================
      TAG INPUTS (teléfonos / emails)
   ================================ */
   TagsModule.create($("#phonesTags"), {
      name: $("#phonesTags").data("name"),
      type: $("#phonesTags").data("type"),
      max: $("#phonesTags").data("max")
   });

   TagsModule.create($("#emailsTags"), {
      name: $("#emailsTags").data("name"),
      type: $("#emailsTags").data("type"),
      max: $("#emailsTags").data("max")
   });

   /* ===============================
      MAPA (Leaflet + Geocoding)
   ================================ */
   MapModule.init("map", "#latInput", "#lngInput");

   /* ===============================
      DETECCIÓN DE MODO EDITAR
      (para mostrar botones extra)
   ================================ */
   const params = new URLSearchParams(window.location.search);
   const comercioId = params.get("id");

   if (comercioId) {
      $("#formTitle").text("Editar Comercio");
      $("#extraActions").removeClass("d-none");

      $("#btnGestionGaleria").attr("href", `/admin/comercios/galeria.html?id=${comercioId}`);
      $("#btnGestionProductos").attr("href", `/admin/comercios/productos.html?id=${comercioId}`);
   }

   /* ===============================
      SUBMIT (demo)
   ================================ */
   $("#comercioForm").on("submit", function (e) {
      e.preventDefault();
      alert("Formulario listo para enviar (demo).");
   });

});
