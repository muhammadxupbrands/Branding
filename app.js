const dialog = document.querySelector('.lightbox');
const viewer = document.querySelector('.viewer-wrap');
const viewerImage = document.querySelector('.viewer-image');
const viewerTitle = document.querySelector('#lightbox-title');
const cards = document.querySelectorAll('.gallery-card');
const gate = document.querySelector('#password-gate');
const passwordForm = document.querySelector('#password-form');
const passwordInput = document.querySelector('#pitch-password');
const passwordError = document.querySelector('#gate-error');
const accessKey = 'gilded-pitch-access';

let scale = 1;
let x = 0;
let y = 0;
let dragging = false;
let startX = 0;
let startY = 0;

function unlockPitch() {
  document.body.classList.remove('is-locked');
  document.body.classList.add('is-unlocked');
  sessionStorage.setItem(accessKey, 'granted');
}

if (sessionStorage.getItem(accessKey) === 'granted') {
  unlockPitch();
} else {
  document.body.classList.add('is-locked');
  passwordInput.focus();
}

passwordForm.addEventListener('submit', (event) => {
  event.preventDefault();
  if (passwordInput.value === 'gilded') {
    passwordError.textContent = '';
    unlockPitch();
    return;
  }
  passwordError.textContent = 'Incorrect password.';
  passwordInput.select();
});

function renderTransform() {
  viewerImage.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
}

function resetView() {
  scale = 1;
  x = 0;
  y = 0;
  renderTransform();
}

function setZoom(nextScale) {
  scale = Math.min(5, Math.max(1, nextScale));
  if (scale === 1) { x = 0; y = 0; }
  renderTransform();
}

cards.forEach((card) => {
  card.addEventListener('click', () => {
    viewerImage.src = card.dataset.image;
    viewerImage.alt = card.querySelector('img').alt;
    viewerTitle.textContent = card.dataset.title;
    resetView();
    dialog.showModal();
    viewer.focus();
  });
});

document.querySelectorAll('[data-action]').forEach((button) => {
  button.addEventListener('click', () => {
    const action = button.dataset.action;
    if (action === 'close') dialog.close();
    if (action === 'reset') resetView();
    if (action === 'zoom-in') setZoom(scale + 0.35);
    if (action === 'zoom-out') setZoom(scale - 0.35);
  });
});

viewer.addEventListener('wheel', (event) => {
  event.preventDefault();
  setZoom(scale + (event.deltaY < 0 ? 0.18 : -0.18));
}, { passive: false });

viewer.addEventListener('pointerdown', (event) => {
  if (scale <= 1) return;
  dragging = true;
  startX = event.clientX - x;
  startY = event.clientY - y;
  viewer.setPointerCapture(event.pointerId);
  viewer.classList.add('is-dragging');
});

viewer.addEventListener('pointermove', (event) => {
  if (!dragging) return;
  x = event.clientX - startX;
  y = event.clientY - startY;
  renderTransform();
});

function stopDragging() {
  dragging = false;
  viewer.classList.remove('is-dragging');
}

viewer.addEventListener('pointerup', stopDragging);
viewer.addEventListener('pointercancel', stopDragging);
viewer.addEventListener('dblclick', resetView);

viewer.addEventListener('keydown', (event) => {
  if (event.key === '+' || event.key === '=') setZoom(scale + 0.35);
  if (event.key === '-') setZoom(scale - 0.35);
  if (event.key.toLowerCase() === 'r') resetView();
  if (event.key === 'Escape') dialog.close();
});

dialog.addEventListener('click', (event) => {
  if (event.target === dialog) dialog.close();
});
