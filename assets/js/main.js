$(document).ready(function () {

    // Scroll Header
    $(window).scroll(function () {
        if ($(this).scrollTop() > 50) {
            $('body').addClass('scrolled');
            $('.header').addClass('scrolled');
        } else {
            $('body').removeClass('scrolled');
            $('.header').removeClass('scrolled');
        }
    });

    // AOS Init
    AOS.init({
        duration: 600,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });

    // DATA DEL SLIDER
    const heroSlidesData = [
        {
            imagen: "https://picsum.photos/1600/800?random=1",
            titulo: "Directorio de Comercios",
            subtitulo: "Encuentra lo mejor de tu ciudad",
            enlace: "#"
        },
        {
            imagen: "https://picsum.photos/1600/800?random=2",
            titulo: "Descubre negocios destacados",
            subtitulo: "Explora nuestro directorio actualizado",
            enlace: "#"
        },
        {
            imagen: "https://picsum.photos/1600/800?random=3",
            titulo: "Tu guía comercial confiable",
            subtitulo: "Negocios, productos y servicios cerca de ti",
            enlace: "#"
        }
    ];

    heroSlidesData.forEach(slide => {
        const img = new Image();
        img.src = slide.imagen;
    });

    // AGREGAR SLIDES (solo como contenedores)
    heroSlidesData.forEach(function (slide) {
        $('.hero-slick').append(`<div class="hero-slide"></div>`);
    });

    // INICIALIZAR SLICK
    $('.hero-slick').slick({
        dots: true,
        infinite: true,
        speed: 1200,
        fade: true,
        cssEase: 'ease-in-out',
        autoplay: true,
        autoplaySpeed: 5000,
        pauseOnHover: false,
        pauseOnFocus: false,
        prevArrow: $('.hero-arrow.left'),
        nextArrow: $('.hero-arrow.right')
    });

    // ACTUALIZAR FONDO Y TEXTO EN CADA SLIDE
    function updateHeroContent(index) {
        const slide = heroSlidesData[index];

        // Fondo
        $('.hero-section').css({
            backgroundImage: `url(${slide.imagen})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
        });

        // Remover estado anterior
        $('.hero-content').removeClass('show');

        // Texto
        setTimeout(() => {
            $('.hero-title').text(slide.titulo);
            $('.hero-subtitle').text(slide.subtitulo);
            $('.btn-slider').attr('href', slide.enlace);
            $('.hero-content').addClass('show');
        }, 300); // pequeño delay 
    }

    // PRIMER SLIDE
    updateHeroContent(0);

    // En el afterChange
    $('.hero-slick').on('afterChange', function (event, slick, currentSlide) {
        updateHeroContent(currentSlide);
    });

    // Inicializar fancybox
    if (window.Fancybox) {
        Fancybox.bind('[data-fancybox="galeria"]', {
            Thumbs: { autoStart: true },
            Toolbar: { display: ["close"] },
            animated: true,
            dragToClose: true
        });
    }

});
