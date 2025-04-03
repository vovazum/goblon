export default class Goblin {
    constructor(field) {
      this.field = field;
      this.element = document.createElement('img');
      this.element.src = './images/goblin.png';
      this.element.className = 'goblin';
      this.currentPosition = null;
    }
  
    showRandom() {
      if (this.currentPosition !== null) {
        this.hide();
      }
  
      const randomCell = this.field.getRandomCell();
      randomCell.appendChild(this.element);
      this.currentPosition = randomCell.dataset.index;
    }
  
    hide() {
      if (this.element.parentElement) {
        this.element.parentElement.removeChild(this.element);
      }
      this.currentPosition = null;
    }
  }