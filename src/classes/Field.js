export default class Field {
    constructor() {
      this.container = document.createElement('div');
      this.container.className = 'field-container';
      document.body.appendChild(this.container);
      this.cells = [];
    }
  
    drawField() {
      for (let i = 0; i < 16; i++) {
        const cell = document.createElement('div');
        cell.className = 'field-cell';
        cell.dataset.index = i;
        this.cells.push(cell);
        this.container.appendChild(cell);
      }
    }
  
    getRandomCell() {
      const availableCells = this.cells.filter(
        (_, index) => index !== this.currentGoblinIndex
      );
      const randomIndex = Math.floor(Math.random() * availableCells.length);
      return availableCells[randomIndex];
    }
  }