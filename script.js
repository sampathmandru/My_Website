// Logo Animation
function setupLogoAnimation() {
    const logoContainer = document.getElementById('logo-container');
    const logoScene = new THREE.Scene();
    const logoCamera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const logoRenderer = new THREE.WebGLRenderer({ alpha: true });
    logoRenderer.setSize(40, 40);
    logoContainer.appendChild(logoRenderer.domElement);

    const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
    const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0x4a90e2, wireframe: true });
    const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    logoScene.add(cube);

    logoCamera.position.z = 2;

    function animateLogo() {
        requestAnimationFrame(animateLogo);
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        logoRenderer.render(logoScene, logoCamera);
    }
    animateLogo();
}

// Navigation Highlighting
function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-right a');
    const sections = document.querySelectorAll('section');

    function setActiveNavItem() {
        let currentSection = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop - sectionHeight / 3) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === currentSection) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', setActiveNavItem);
    setActiveNavItem(); // Set initial active state
}

// Background Animation
function setupBackgroundAnimation() {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('animated-background').appendChild(renderer.domElement);

    const geometry = new THREE.BufferGeometry();
    const vertices = [];
    const size = 2000;

    for (let i = 0; i < 10000; i++) {
        const x = (Math.random() - 0.5) * size;
        const y = (Math.random() - 0.5) * size;
        const z = (Math.random() - 0.5) * size;
        vertices.push(x, y, z);
    }

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

    const material = new THREE.PointsMaterial({ color: 0x4a90e2, size: 2 });
    const points = new THREE.Points(geometry, material);
    scene.add(points);

    camera.position.z = 1000;

    function animate() {
        requestAnimationFrame(animate);
        points.rotation.x += 0.0005;
        points.rotation.y += 0.0005;
        renderer.render(scene, camera);
    }
    animate();

    // Resize handler
    window.addEventListener('resize', () => {
        const width = window.innerWidth;
        const height = window.innerHeight;
        renderer.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
    });
}

// Image Animation
function setupImageAnimation() {
    const animatedImage = document.getElementById('animated-image');
    let lastScrollTop = 0;

    window.addEventListener('scroll', () => {
        const st = window.pageYOffset || document.documentElement.scrollTop;
        if (st > lastScrollTop) {
            // Scrolling down
            animatedImage.style.transform = 'translateY(10px) scale(1.05)';
        } else {
            // Scrolling up
            animatedImage.style.transform = 'translateY(-10px) scale(1.05)';
        }
        lastScrollTop = st <= 0 ? 0 : st;
    });
}

// Scroll animations with Intersection Observer
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    function animateElement(element) {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        setTimeout(() => {
            element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, 100);
    }

    function animateSkillCards(skillsSection) {
        const skillBoxes = skillsSection.querySelectorAll('.skill-box');
        const skillIcons = skillsSection.querySelectorAll('.skill-icon-wrapper');
        
        skillBoxes.forEach((box, index) => {
            setTimeout(() => animateElement(box), index * 100);
        });
        
        skillIcons.forEach((icon, index) => {
            setTimeout(() => animateElement(icon), (skillBoxes.length + index) * 100);
        });
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                if (entry.target.id === 'skills') {
                    animateSkillCards(entry.target);
                } else {
                    animateElement(entry.target);
                }
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all sections, including the skills section
    document.querySelectorAll('.content-section').forEach(section => {
        observer.observe(section);
    });

    // Observe individual project and experience items
    document.querySelectorAll('.project-item, .experience-item').forEach(item => {
        observer.observe(item);
    });
}

// Typing effect for subtitle
function setupTypingEffect() {
    const subtitle = document.querySelector('.subtitle');
    const subtitleText = subtitle.textContent;
    let isTyping = false;

    function typeSubtitle(index = 0) {
        if (index < subtitleText.length) {
            subtitle.textContent = subtitleText.slice(0, index + 1);
            setTimeout(() => typeSubtitle(index + 1), 50);
        } else {
            isTyping = false;
            setTimeout(startTyping, 2000); // Wait 2 seconds before restarting
        }
    }

    function startTyping() {
        if (!isTyping) {
            isTyping = true;
            subtitle.textContent = '';
            typeSubtitle();
        }
    }

    // Start typing effect when the page loads
    window.addEventListener('load', startTyping);
}

// Smooth scrolling for navigation links
function setupSmoothScrolling() {
    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Add a scroll-to-top button
function setupScrollToTopButton() {
    const scrollTopButton = document.createElement('button');
    scrollTopButton.textContent = '↑';
    scrollTopButton.classList.add('scroll-top-button');
    document.body.appendChild(scrollTopButton);

    scrollTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Show/hide scroll-to-top button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollTopButton.classList.add('visible');
        } else {
            scrollTopButton.classList.remove('visible');
        }
    });
}

// Parallax Effect
function setupParallaxEffect() {
    window.addEventListener('scroll', function() {
        const parallax = document.querySelector('.parallax-section');
        let scrollPosition = window.pageYOffset;
        parallax.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
    });
}

// Main initialization function
function initializePortfolio() {
    setupLogoAnimation();
    setupNavigation();
    setupBackgroundAnimation();
    setupImageAnimation();
    setupScrollAnimations();
    setupTypingEffect();
    setupSmoothScrolling();
    setupScrollToTopButton();
    setupParallaxEffect();
}

(function() {
    emailjs.init("Q_O8cb2wLYxfJbH4h");
})();

// Get the form element
const contactForm = document.getElementById('contactForm');

// Add event listener for form submission
contactForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // Prepare template parameters
    const templateParams = {
        from_name: name,
        from_email: email,
        message: message
    };

    emailjs.sendForm('service_iqdgw8i', 'template_oa3m7wr', templateParams)
        .then(function() {
            console.log('SUCCESS!');
            alert('Thank you for your message! We will get back to you soon.');
            document.getElementById('contactForm').reset();
        }, function(error) {
            console.log('FAILED...', error);
            alert('Oops! There was an error sending your message. Please try again later.');
        });
});

// Run initialization when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', initializePortfolio);