export default class Cursor {
    constructor() {
      this.cursor = document.createElement('div');
      this.cursor.className = 'cursor';
      document.body.appendChild(this.cursor);
    }
  
    setCursor() {
      document.addEventListener('mousemove', (e) => {
        this.cursor.style.left = `${e.clientX}px`;
        this.cursor.style.top = `${e.clientY}px`;
      });
    }
  }