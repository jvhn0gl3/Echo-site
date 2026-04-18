// Hero Effects (Typing and CPU stats)
const heroTypingEl = document.getElementById('heroTyping');
const heroCpuEl = document.getElementById('heroCpu');
const typingText = "Analyzing network topologies... Access granted.";

function typeHero(text, i = 0) {
    if (heroTypingEl && i < text.length) {
        heroTypingEl.innerHTML += text.charAt(i);
        setTimeout(() => typeHero(text, i + 1), 50);
    }
}

function updateHeroCpu() {
    if (heroCpuEl) {
        heroCpuEl.innerText = Math.floor(Math.random() * 25 + 5) + '%';
    }
}

window.addEventListener('load', () => {
    setTimeout(() => typeHero(typingText), 1500);
    setInterval(updateHeroCpu, 3000);
});
