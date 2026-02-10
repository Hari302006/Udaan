// 1. Starfield Animation
const canvas = document.getElementById('starfield');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const stars = [];
for (let i = 0; i < 200; i++) {
    stars.push({ x: Math.random() * canvas.width, y: Math.random() * canvas.height, size: Math.random() * 2, speed: Math.random() * 0.5 });
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'white';
    stars.forEach(star => {
        ctx.beginPath(); ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2); ctx.fill();
        star.y += star.speed; if (star.y > canvas.height) star.y = 0;
    });
    requestAnimationFrame(animate);
}
animate();

// 2. Tab Switcher
function showTab(tabId) {
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.getElementById(tabId).classList.add('active');
    event.currentTarget.classList.add('active');
}

// 3. Countdown Timer (Feb 23, 2026)
const launchDate = new Date("Feb 23, 2026 09:00:00").getTime();
setInterval(() => {
    const distance = launchDate - new Date().getTime();
    document.getElementById("days").innerText = Math.floor(distance / (1000 * 60 * 60 * 24));
    document.getElementById("hours").innerText = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    document.getElementById("minutes").innerText = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    document.getElementById("seconds").innerText = Math.floor((distance % (1000 * 60)) / 1000);
}, 1000);

// 4. Modal Control
const modal = document.getElementById("registerModal");
document.querySelectorAll(".btn-register").forEach(btn => btn.onclick = () => modal.style.display = "block");
document.querySelector(".close-btn").onclick = () => modal.style.display = "none";
window.onclick = (e) => { if (e.target == modal) modal.style.display = "none"; }


// Mobile Menu Toggle
const menuIcon = document.getElementById('menuIcon');
const navLinks = document.getElementById('navLinks');

menuIcon.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    
    // Toggle icon between "Bars" and "Times (X)"
    const icon = menuIcon.querySelector('i');
    if (navLinks.classList.contains('active')) {
        icon.classList.replace('fa-bars', 'fa-times');
    } else {
        icon.classList.replace('fa-times', 'fa-bars');
    }
});

// Close menu when a link is clicked (Optional, for better UX)
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuIcon.querySelector('i').classList.replace('fa-times', 'fa-bars');
    });
});


// --- Cursor Trail Animation ---
document.addEventListener('mousemove', (e) => {
    createParticle(e.clientX, e.clientY);
});

function createParticle(x, y) {
    const particle = document.createElement('div');
    particle.className = 'cursor-particle';
    document.body.appendChild(particle);

    // Initial position
    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;

    // Randomize movement slightly
    const destinationX = x + (Math.random() - 0.5) * 50;
    const destinationY = y + (Math.random() - 0.5) * 50;

    // Trigger the animation
    const animation = particle.animate([
        { transform: 'translate(0, 0) scale(1)', opacity: 0.8 },
        { transform: `translate(${destinationX - x}px, ${destinationY - y}px) scale(0)`, opacity: 0 }
    ], {
        duration: 800,
        easing: 'ease-out'
    });

    // Remove element after animation finishes
    animation.onfinish = () => {
        particle.remove();
    };
}



// --- Shooting Star Random Generator ---
function createShootingStar() {
    const star = document.createElement('div');
    star.className = 'shooting-star';
    document.body.appendChild(star);

    // Randomize starting position
    const startX = Math.random() * window.innerWidth;
    const startY = Math.random() * window.innerHeight / 2;
    
    star.style.left = `${startX}px`;
    star.style.top = `${startY}px`;

    // Remove after animation
    setTimeout(() => {
        star.remove();
    }, 2000);
}

// Style for the shooting star
const style = document.createElement('style');
style.textContent = `
    .shooting-star {
        position: fixed;
        width: 150px;
        height: 2px;
        background: linear-gradient(90deg, var(--primary), transparent);
        transform: rotate(-45deg);
        pointer-events: none;
        z-index: -1;
        animation: shoot 2s linear forwards;
    }
    @keyframes shoot {
        0% { transform: translate(0, 0) rotate(-45deg); opacity: 1; }
        100% { transform: translate(500px, 500px) rotate(-45deg); opacity: 0; }
    }
`;
document.head.appendChild(style);

// Trigger a star every 4-8 seconds
setInterval(createShootingStar, Math.random() * 4000 + 4000);

