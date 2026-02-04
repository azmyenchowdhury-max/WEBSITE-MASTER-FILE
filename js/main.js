/* ===================================
   Kamal & Associates - Main JavaScript
   Pure HTML/CSS/JS/Bootstrap Version
   =================================== */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 100
    });

    // ===== Navbar Scroll Effect =====
    const navbar = document.querySelector('.navbar');
    
    function handleNavbarScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
    
    window.addEventListener('scroll', handleNavbarScroll);
    handleNavbarScroll();

    // ===== Rotating Text Animation =====
    const rotatingTextElement = document.getElementById('rotatingText');
    if (rotatingTextElement) {
        const words = ['Freedom.', 'Rights.', 'Case.', 'Custody.'];
        let currentIndex = 0;

        setInterval(() => {
            currentIndex = (currentIndex + 1) % words.length;
            rotatingTextElement.style.animation = 'none';
            rotatingTextElement.offsetHeight; // Trigger reflow
            rotatingTextElement.textContent = words[currentIndex];
            rotatingTextElement.style.animation = 'fadeInUp 0.5s ease';
        }, 2500);
    }

    // ===== Counter Animation =====
    const counters = document.querySelectorAll('.counter');
    let countersAnimated = false;

    function animateCounters() {
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 2000;
            const steps = 60;
            const increment = target / steps;
            let current = 0;

            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    counter.textContent = target;
                    clearInterval(timer);
                } else {
                    counter.textContent = Math.floor(current);
                }
            }, duration / steps);
        });
    }


    // TYPEWRITER / ROTATING TEXT FUNCTION
var TxtRotate = function(el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = '';
  this.tick();
  this.isDeleting = false;
};

TxtRotate.prototype.tick = function() {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

  var that = this;
  var delta = 300 - Math.random() * 100;

  if (this.isDeleting) { delta /= 2; }

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
  }

  setTimeout(function() {
    that.tick();
  }, delta);
};

window.onload = function() {
  var elements = document.getElementsByClassName('txt-rotate');
  for (var i=0; i<elements.length; i++) {
    var toRotate = elements[i].getAttribute('data-rotate');
    var period = elements[i].getAttribute('data-period');
    if (toRotate) {
      new TxtRotate(elements[i], JSON.parse(toRotate), period);
    }
  }
};

    // Intersection Observer for Counter Animation
    const statsSection = document.getElementById('statsSection');
    if (statsSection) {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !countersAnimated) {
                countersAnimated = true;
                animateCounters();
            }
        }, { threshold: 0.5 });
        
        observer.observe(statsSection);
    }

    // ===== Case Studies Filter =====
    const filterButtons = document.querySelectorAll('#caseFilter .nav-link');
    const caseItems = document.querySelectorAll('.case-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active state
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filter = button.getAttribute('data-filter');

            caseItems.forEach(item => {
                const category = item.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    item.classList.remove('hidden');
                    item.style.display = '';
                } else {
                    item.classList.add('hidden');
                    item.style.display = 'none';
                }
            });
        });
    });

    // ===== Testimonials Carousel =====
    const testimonials = [
        {
            text: '"Kamal & Associates provided exceptional guidance during our merger. Their expertise in corporate law and attention to detail ensured a smooth transaction. Highly recommended for any business legal needs."',
            name: 'Rahman Industries Ltd.',
            role: 'Corporate Client',
            image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150'
        },
        {
            text: '"During my property dispute, the team at Kamal & Associates showed remarkable dedication. They handled my case with professionalism and achieved the best outcome. I am forever grateful."',
            name: 'Fatima Begum',
            role: 'Individual Client',
            image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150'
        },
        {
            text: '"Outstanding intellectual property services. They helped us protect our innovations and navigate complex IP regulations with ease. Their expertise is unmatched in the industry."',
            name: 'Bangladesh Tech Solutions',
            role: 'Corporate Client',
            image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150'
        }
    ];

    let currentTestimonial = 0;
    const testimonialText = document.getElementById('testimonialText');
    const testimonialName = document.getElementById('testimonialName');
    const testimonialRole = document.getElementById('testimonialRole');
    const testimonialImg = document.getElementById('testimonialImg');
    const testimonialDots = document.querySelectorAll('#testimonialDots .dot');

    function updateTestimonial(index) {
        if (!testimonialText) return;
        
        currentTestimonial = index;
        const t = testimonials[index];
        
        testimonialText.textContent = t.text;
        testimonialName.textContent = t.name;
        testimonialRole.textContent = t.role;
        testimonialImg.src = t.image;

        testimonialDots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }

    // Auto-rotate testimonials
    if (testimonialText) {
        setInterval(() => {
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            updateTestimonial(currentTestimonial);
        }, 5000);

        // Click on dots
        testimonialDots.forEach((dot, index) => {
            dot.addEventListener('click', () => updateTestimonial(index));
        });
    }

    (function($) {
    "use strict";

    $(document).ready(function() {

        /* =================================
           TESTIMONIALS CAROUSEL INITIALIZATION
           ================================= */
        $(".testimonial-carousel").owlCarousel({
            loop: true,
            margin: 30,
            nav: false,       /* No left/right arrows */
            dots: true,       /* Show bottom dots */
            autoplay: true,
            autoplayTimeout: 4000,
            smartSpeed: 700,
            responsive: {
                0: {
                    items: 1  /* Mobile: 1 card */
                },
                768: {
                    items: 2  /* Tablet: 2 cards */
                },
                992: {
                    items: 3  /* Desktop: 3 cards */
                }
            }
        });

    });

})(jQuery);


/* =================================
   CLIENT LOGO CAROUSEL INITIALIZATION
   ================================= */
$(".logo-carousel").owlCarousel({
    rtl: true,       /* Right to Left */
    loop: true,
    margin: 30,
    nav: false,         /* No arrows */
    dots: false,        /* No dots needed for logos */
    autoplay: true,     /* Auto Scroll */
    autoplayTimeout: 2000, /* Speed of slide */
    autoplayHoverPause: true, /* Stops if user hovers to look closer */
    responsive: {
        0: {
            items: 2    /* 2 logos on mobile */
        },
        600: {
            items: 3    /* 3 logos on tablet */
        },
        1000: {
            items: 5    /* 5 logos on desktop */
        }
    }
});

    // ===== Video Modal =====
    const videoModal = document.getElementById('videoModal');
    if (videoModal) {
        videoModal.addEventListener('show.bs.modal', function() {
            document.getElementById('videoFrame').src = 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1';
        });
        
        videoModal.addEventListener('hide.bs.modal', function() {
            document.getElementById('videoFrame').src = '';
        });
    }

    // ===== Back to Top Button =====
    const backToTopBtn = document.getElementById('backToTop');
    
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ===== Newsletter Form =====
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            alert('Thank you for subscribing! We will send updates to: ' + email);
            this.reset();
        });
    }

    // ===== Contact Form =====
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Sending...';
            submitBtn.disabled = true;

            // Simulate form submission
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                
                // Show success message
                const successDiv = document.createElement('div');
                successDiv.className = 'alert alert-success mt-3';
                successDiv.innerHTML = '<i class="fas fa-check-circle me-2"></i>Thank you for your message! We will get back to you shortly.';
                contactForm.appendChild(successDiv);
                
                contactForm.reset();
                
                setTimeout(() => successDiv.remove(), 5000);
            }, 1500);
        });
    }

    // ===== Flip Cards Touch Support =====
    const flipCards = document.querySelectorAll('.flip-card');
    flipCards.forEach(card => {
        card.addEventListener('touchstart', function() {
            this.querySelector('.flip-card-inner').style.transform = 'rotateY(180deg)';
        });
        
        card.addEventListener('touchend', function() {
            setTimeout(() => {
                this.querySelector('.flip-card-inner').style.transform = '';
            }, 3000);
        });
    });

    // ===== Smooth Scroll for Anchor Links =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    });

    // ===== Active Nav Link =====
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
});

// ===== Page Header Animation =====
function initPageHeader() {
    const pageHeader = document.querySelector('.page-header');
    // ===== Attorney Card Click Handler =====
    const attorneyCards = document.querySelectorAll('.attorney-card-link');
    attorneyCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Prevent any carousel interference
            e.stopPropagation();
            // The link should work normally
        });
    });

    // ===== Smooth Scrolling for Anchor Links =====
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return; // Skip social links
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    if (pageHeader) {
        pageHeader.style.opacity = '1';
    }
}

window.addEventListener('load', initPageHeader);
