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

// 5. Form Submission
// document.getElementById("registrationForm").onsubmit = (e) => {
//     e.preventDefault();
//     const email = document.getElementById("userEmail").value;
//     if(!email.includes("@rgnau.ac.in")) return alert("Please use your official university email!");
//     alert("Mission Control: Registration confirmed! Prepare for takeoff.");
//     modal.style.display = "none";
// };


const scriptURL = 'https://script.google.com/macros/s/AKfycbyNQ6uAb7A0JvIo-OWxEbwyBWj6mkfDCfPgFxcT-dlvOTecIzADLHfyRYD6ObxEVDF1/exec';
const regForm = document.getElementById('registrationForm');
const submitBtn = document.getElementById('submitBtn');
const thankYouOverlay = document.getElementById('thankYouOverlay');
const rocket = document.querySelector('.rocket-container');

regForm.addEventListener('submit', e => {
    e.preventDefault();
    
    submitBtn.disabled = true;
    submitBtn.innerText = "Transmitting Data...";

    const formData = {
        name: document.getElementById('regName').value,
        email: document.getElementById('regEmail').value,
        category: document.getElementById('regCategory').value,
        phone: document.getElementById('regPhone').value
    };

    fetch(scriptURL, {
        method: 'POST',
        mode: 'no-cors',
        cache: 'no-cache',
        body: JSON.stringify(formData)
    })
    .then(() => {
        // Trigger Animation Sequence
        document.getElementById("registerModal").style.display = "none";
        thankYouOverlay.style.display = "flex";
        
        // Wait for user to see the "Mission Successful" text, then launch rocket
        setTimeout(() => {
            rocket.classList.add('launch-animation');
        }, 1000);

        // Hide overlay and reset form after launch
        setTimeout(() => {
            thankYouOverlay.style.display = "none";
            rocket.classList.remove('launch-animation');
            regForm.reset();
            submitBtn.disabled = false;
            submitBtn.innerText = "Confirm Takeoff";
        }, 3000);
    })
    .catch(error => {
        alert("Registeration Done.");
        submitBtn.disabled = false;
        submitBtn.innerText = "Confirm Takeoff";
    });
});