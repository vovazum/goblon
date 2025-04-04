export default class Cursor {
  constructor(hammerImage) {
    this.hammerImage = hammerImage;
  }

  setCursor() {
    const cursor = document.createElement('div');
    cursor.className = 'cursor';
    document.body.appendChild(cursor);
    cursor.style.backgroundImage = `url(${this.hammerImage})`;
    
    document.addEventListener('mousemove', (e) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
    });
  }

  hitAnimation() {
    const cursor = document.querySelector('.cursor');
    cursor.style.transform = 'translate(-50%, -50%) rotate(-30deg)';
    setTimeout(() => {
      cursor.style.transform = 'translate(-50%, -50%) rotate(0)';
    }, 100);
  }
}