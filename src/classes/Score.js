export default class Score {
    constructor() {
      this.points = 0;
      this.element = document.createElement('div');
      this.element.className = 'score';
      document.body.appendChild(this.element);
      this.update();
    }
  
    increase() {
      this.points++;
      this.update();
    }
  
    update() {
      this.element.textContent = `Score: ${this.points}`;
    }
  }