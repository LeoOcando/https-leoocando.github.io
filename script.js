// Grab all slides and the invisible click zones
const slides = document.querySelectorAll('.carousel img');
const leftHotspot  = document.querySelector('.hotspot.left');
const rightHotspot = document.querySelector('.hotspot.right');

let currentIndex = 0;
const AUTOPLAY_MS = 4500;
let timer = null;

// Show one slide and hide the rest (fade handled in CSS)
function showSlide(i) {
  slides.forEach((s, idx) => s.classList.toggle('active', idx === i));
}

function next() {
  currentIndex = (currentIndex + 1) % slides.length;
  showSlide(currentIndex);
}

function prev() {
  currentIndex = (currentIndex - 1 + slides.length) % slides.length;
  showSlide(currentIndex);
}

function startTimer() {
  stopTimer();
  timer = setInterval(next, AUTOPLAY_MS);
}

function stopTimer() {
  if (timer) clearInterval(timer);
}

function resetAnd(action) {
  stopTimer();
  action();
  startTimer();
}

// --- Init ---
if (slides.length > 0) {
  showSlide(currentIndex);
  startTimer();
}

// --- Click/tap controls ---
rightHotspot.addEventListener('click', () => resetAnd(next));
leftHotspot.addEventListener('click',  () => resetAnd(prev));

// Touch support (mobile)
rightHotspot.addEventListener('touchstart', () => resetAnd(next), { passive: true });
leftHotspot.addEventListener('touchstart',  () => resetAnd(prev), { passive: true });

// Keyboard accessibility: Enter/Space on focused hotspot, plus arrow keys
[rightHotspot, leftHotspot].forEach(el => {
  el.addEventListener('keydown', (e) => {
    const isRight = el.classList.contains('right');
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      resetAnd(isRight ? next : prev);
    }
    if (e.key === 'ArrowRight' && isRight) resetAnd(next);
    if (e.key === 'ArrowLeft'  && !isRight) resetAnd(prev);
  });
});

