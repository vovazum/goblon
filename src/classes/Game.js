import Field from './Field.js';
import Goblin from './Goblin.js';
import Score from './Score.js';
import Cursor from './Cursor.js';

export default class Game {
  constructor() {
    this.field = new Field();
    this.goblin = new Goblin(this.field);
    this.score = new Score();
    this.cursor = new Cursor();
    this.misses = 0;
    this.maxMisses = 5;
    this.interval = null;
  }

  init() {
    this.field.drawField();
    this.cursor.setCursor();
    this.startGame();
  }

  startGame() {
    this.interval = setInterval(() => {
      this.goblin.showRandom();
      setTimeout(() => {
        if (this.goblin.currentPosition !== null) {
          this.miss();
        }
      }, 1000);
    }, 1000);
  }

  hit() {
    this.score.increase();
    this.goblin.hide();
    this.goblin.currentPosition = null;
  }

  miss() {
    this.goblin.hide();
    this.goblin.currentPosition = null;
    this.misses++;
    
    if (this.misses >= this.maxMisses) {
      this.endGame();
    }
  }

  endGame() {
    clearInterval(this.interval);
    alert(`Game over! Your score: ${this.score.points}`);
  }
}