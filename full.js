// fullscreen-modal.js
(function () {
  const style = document.createElement('style');
  style.textContent = `
    .fs-overlay {
      position: fixed;
      inset: 0;
      background: rgba(15, 23, 36, 0.95);
      backdrop-filter: blur(4px);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      z-index: 999999;
      color: #e6eef6;
      font-family: Inter, system-ui, sans-serif;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.3s ease;
    }
    .fs-overlay.visible {
      opacity: 1;
      pointer-events: auto;
    }
    .fs-modal {
      background: rgba(255,255,255,0.04);
      border: 1px solid rgba(255,255,255,0.06);
      border-radius: 14px;
      padding: 28px;
      text-align: center;
      box-shadow: 0 8px 24px rgba(0,0,0,0.4);
      animation: popIn 0.35s ease;
    }
    @keyframes popIn {
      from { transform: scale(0.9); opacity: 0; }
      to { transform: scale(1); opacity: 1; }
    }
    .fs-btn {
      background: #06b6d4;
      color: white;
      border: none;
      padding: 14px 22px;
      border-radius: 10px;
      font-weight: 600;
      cursor: pointer;
      margin-top: 14px;
      font-size: 1rem;
      transition: transform 0.15s ease;
    }
    .fs-btn:active {
      transform: scale(0.97);
    }
    .fs-small {
      color: #9fbfc6;
      font-size: 0.85rem;
      margin-top: 10px;
    }
  `;
  document.head.appendChild(style);

  const overlay = document.createElement('div');
  overlay.className = 'fs-overlay';
  overlay.innerHTML = `
    <div class="fs-modal">
      <h2 style="margin:0 0 6px;font-size:1.4rem;">Modaliteti i plotë</h2>
      <p style="margin:0 0 14px;font-size:0.95rem;">Prek butonin më poshtë për të hapur faqen në full-screen.</p>
      <button class="fs-btn">Hap në full-screen</button>
      <div class="fs-small">Në disa pajisje, shiriti i URL-së do të fshehet automatikisht.</div>
    </div>
  `;
  document.body.appendChild(overlay);

  const btn = overlay.querySelector('.fs-btn');

  // Shfaq modalin pas pak që faqja të duket e ngarkuar
  setTimeout(() => overlay.classList.add('visible'), 500);

  async function enterFullscreen() {
    try {
      await document.documentElement.requestFullscreen();
      overlay.classList.remove('visible');
      setTimeout(() => overlay.remove(), 400);
    } catch (err) {
      console.warn('Fullscreen refuzuar:', err);
      overlay.classList.remove('visible');
      setTimeout(() => overlay.remove(), 400);
    }
  }

  btn.addEventListener('click', enterFullscreen);

  // Nëse dikush del nga fullscreen, mund të rikthehet automatikisht (opsionale)
  document.addEventListener('fullscreenchange', () => {
    if (!document.fullscreenElement) {
      console.log('Doli nga fullscreen');
      // opsionale: rikthe modalin
      // overlay.classList.add('visible');
    }
  });
})();
