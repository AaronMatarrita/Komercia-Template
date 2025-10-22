$(function () {

    const $sidebar = $(".sidebar");
    const $main = $(".main");
    const $overlay = $("#sidebarOverlay");

    // detectar si es móvil
    const isMobile = () => window.innerWidth <= 575.98;

    // Toggle sidebar (abrir/cerrar)
    $("#sidebarToggle").on("click", function () {
        const isCollapsed = $sidebar.toggleClass("collapsed").hasClass("collapsed");
        $main.toggleClass("expanded");

        if (isMobile()) {
            $overlay.toggleClass("active", isCollapsed);
        }
    });

    // Cerrar en botón X o overlay
    $("#closeSidebar, #sidebarOverlay").on("click", function () {
        $sidebar.removeClass("collapsed");
        $main.removeClass("expanded");
        $overlay.removeClass("active");
    });

    // Inicializar usuario
    const userName = "Aaron Matarrita"; // luego vendrá desde backend
    const initials = $.trim(userName)
        .split(/\s+/)
        .map(n => n[0] || "")
        .join("")
        .toUpperCase()
        .slice(0, 3);

    $("#userInitials").text(initials || "AD");
});
