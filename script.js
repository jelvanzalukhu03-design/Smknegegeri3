document.addEventListener('DOMContentLoaded', () => {
            
    // 1. Mobile Menu Toggle Responsif
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');

    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        const icon = menuToggle.querySelector('i');
        if(navMenu.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-xmark');
        } else {
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars');
        }
    });

    // Tutup menu hp saat tautan navigasi di-klik
    document.querySelectorAll('.nav-item a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            menuToggle.querySelector('i').classList.remove('fa-xmark');
            menuToggle.querySelector('i').classList.add('fa-bars');
        });
    });

    // 2. Slider Banner Dinamis Otomatis & Manual
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.getElementById('prevSlide');
    const nextBtn = document.getElementById('nextSlide');
    let currentSlide = 0;
    let slideInterval;

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        
        if (index >= slides.length) currentSlide = 0;
        else if (index < 0) currentSlide = slides.length - 1;
        else currentSlide = index;

        slides[currentSlide].classList.add('active');
    }

    function nextSlideFunc() {
        showSlide(currentSlide + 1);
    }

    function startSlideTimer() {
        slideInterval = setInterval(nextSlideFunc, 5000); // Berganti otomatis setiap 5 detik
    }

    function resetSlideTimer() {
        clearInterval(slideInterval);
        startSlideTimer();
    }

    nextBtn.addEventListener('click', () => {
        nextSlideFunc();
        resetSlideTimer();
    });

    prevBtn.addEventListener('click', () => {
        showSlide(currentSlide - 1);
        resetSlideTimer();
    });

    startSlideTimer();

    // 3. Efek Aktif Tautan Menu Berdasarkan Scroll Posisi Section
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
        let scrollY = window.pageYOffset;
        
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100;
            const sectionId = current.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                document.querySelector('.nav-menu a[href*=' + sectionId + ']').classList.add('active');
            } else {
                document.querySelector('.nav-menu a[href*=' + sectionId + ']').classList.remove('active');
            }
        });
        
        if(scrollY < 100) {
            document.querySelectorAll('.nav-item a').forEach(a => a.classList.remove('active'));
            document.querySelector('.nav-menu a[href="#"]').classList.add('active');
        }
    });
});
