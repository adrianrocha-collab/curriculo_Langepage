const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle?.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', open);
});

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        menuToggle?.setAttribute('aria-expanded', 'false');
    });
});

const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            obs.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal, .section-heading, .timeline-card, .education-card, .knowledge-card, .skill').forEach((el, index) => {
    el.classList.add('reveal');
    el.style.transitionDelay = `${Math.min(index * 45, 250)}ms`;
    observer.observe(el);
});

document.querySelectorAll('.skill-meter, .language-meter').forEach(meter => {
    const value = meter.value;
    meter.value = 0;
    const animate = () => {
        const start = performance.now();
        const duration = 900;
        const step = now => {
            const progress = Math.min((now - start) / duration, 1);
            meter.value = value * progress;
            if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
    };
    const meterObserver = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
            animate();
            meterObserver.disconnect();
        }
    }, { threshold: 0.5 });
    meterObserver.observe(meter);
});

document.getElementById('year').textContent = new Date().getFullYear();
