document.addEventListener('DOMContentLoaded', function() {

    // Smooth Scroll for Navigation Links ... (keep from previous version)
    const navLinks = document.querySelectorAll('#main-header nav ul li a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            let targetId = this.getAttribute('href');
            if (targetId && targetId.length > 1) {
                let targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const headerOffset = document.getElementById('main-header').offsetHeight;
                    const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                    const offsetPosition = elementPosition - headerOffset - 20;
                    window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                    navLinks.forEach(nav => nav.classList.remove('active'));
                    this.classList.add('active');
                }
            }
        });
    });

    // Optional: Highlight active nav link on scroll ... (keep from previous version)
    const sections = document.querySelectorAll('section[id]');
    const headerHeight = document.getElementById('main-header').offsetHeight;
    function activateNavLink() {
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - headerHeight - 50;
            if (window.pageYOffset >= sectionTop) {
                currentSectionId = section.getAttribute('id');
            }
        });
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    }
    window.addEventListener('scroll', activateNavLink);
    activateNavLink();

    // Update Copyright Year ... (keep from previous version)
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) { yearSpan.textContent = new Date().getFullYear(); }

    // Testimonial Slider Logic
    const sliderWrapper = document.querySelector('.testimonial-slider-wrapper');
    if (sliderWrapper) {
        const slidesContainer = sliderWrapper.querySelector('.testimonial-slides');
        const slides = Array.from(slidesContainer.children);
        const nextButton = sliderWrapper.querySelector('.next-slide');
        const prevButton = sliderWrapper.querySelector('.prev-slide');
        const dotsContainer = sliderWrapper.querySelector('.slider-dots');
        let currentIndex = 0;
        let slideInterval; // For auto-sliding (optional)

        if (slides.length > 0) { // Ensure there are slides before proceeding
            // Create dots
            slides.forEach((slide, index) => {
                const dot = document.createElement('button'); // Use button for accessibility
                dot.classList.add('dot');
                dot.setAttribute('aria-label', `Go to testimonial ${index + 1}`);
                if (index === 0) dot.classList.add('active-dot');
                dot.addEventListener('click', () => {
                    goToSlide(index);
                    // resetAutoSlide(); // If auto-slide is enabled
                });
                dotsContainer.appendChild(dot);
            });
            const dots = Array.from(dotsContainer.children);

            function updateSlideClassesAndTransform() {
                slidesContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
                slides.forEach((slide, index) => {
                    if (index === currentIndex) {
                        slide.classList.add('active-slide');
                    } else {
                        slide.classList.remove('active-slide');
                    }
                });
                dots.forEach((dot, index) => {
                    if (index === currentIndex) {
                        dot.classList.add('active-dot');
                    } else {
                        dot.classList.remove('active-dot');
                    }
                });
            }

            function goToSlide(index) {
                if (index >= slides.length) {
                    currentIndex = 0;
                } else if (index < 0) {
                    currentIndex = slides.length - 1;
                } else {
                    currentIndex = index;
                }
                updateSlideClassesAndTransform();
            }

            nextButton.addEventListener('click', () => {
                goToSlide(currentIndex + 1);
                // resetAutoSlide(); // If auto-slide is enabled
            });

            prevButton.addEventListener('click', () => {
                goToSlide(currentIndex - 1);
                // resetAutoSlide(); // If auto-slide is enabled
            });

            // Initialize first slide
            goToSlide(0);

            // Optional: Auto-sliding
            /*
            function startAutoSlide() {
                slideInterval = setInterval(() => {
                    goToSlide(currentIndex + 1);
                }, 7000); // Change slide every 7 seconds
            }
            function resetAutoSlide() {
                clearInterval(slideInterval);
                startAutoSlide();
            }
            startAutoSlide();
            */
        }
    }

    // Simple fade-in for sections on scroll (optional, can be heavy)
    // Kept from previous example, ensure it doesn't conflict with slider visibility
    const animatedSections = document.querySelectorAll('.section-padding:not(#testimonials-section)'); // Exclude testimonial section if slider handles its own visibility
    const observerOptions = { root: null, rootMargin: '0px', threshold: 0.1 };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                // observer.unobserve(entry.target); // Optional
            }
        });
    }, observerOptions);

    animatedSections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        sectionObserver.observe(section);
    });
    // Manually trigger for testimonials section if it's not observed for fade-in
    const testimonialsSection = document.getElementById('testimonials-section');
    if (testimonialsSection) {
        testimonialsSection.style.opacity = '1';
        testimonialsSection.style.transform = 'translateY(0)';
    }

});