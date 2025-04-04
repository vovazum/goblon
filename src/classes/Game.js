export default class Game {
  constructor({ goblinImage, hammerImage }) {
    this.goblinImage = goblinImage;
    this.hammerImage = hammerImage;
    this.field = this.createField();
    this.score = this.createScore();
    this.cursor = this.createCursor();
    this.misses = 0;
    this.maxMisses = 5;
    this.interval = null;
  }

  init() {
    this.setupDOM();
    this.setupEventListeners();
    this.startGame();
  }

  setupDOM() {
    this.field.drawField();
    this.cursor.setCursor();
    this.score.display();
  }

  setupEventListeners() {
    document.querySelector('.field-container').addEventListener('click', (e) => {
      if (e.target.classList.contains('goblin')) {
        this.hit();
        this.cursor.hitAnimation();
      }
    });
  }

  createField() {
    return {
      drawField: () => {
        const container = document.querySelector('.field-container');
        container.innerHTML = '';
        for (let i = 0; i < 16; i++) {
          const cell = document.createElement('div');
          cell.className = 'field-cell';
          container.appendChild(cell);
        }
      },
      getRandomCell: () => {
        const cells = document.querySelectorAll('.field-cell');
        return cells[Math.floor(Math.random() * cells.length)];
      }
    };
  }

  createScore() {
    return {
      points: 0,
      display: () => {
        const scoreElement = document.querySelector('.score');
        if (!scoreElement) {
          const score = document.createElement('div');
          score.className = 'score';
          document.body.prepend(score);
        }
        this.updateScore();
      },
      increase: () => {
        this.points++;
        this.updateScore();
      },
      updateScore: () => {
        document.querySelector('.score').textContent = `Score: ${this.points}`;
      }
    };
  }

  createCursor() {
    return {
      setCursor: () => {
        const cursor = document.createElement('div');
        cursor.className = 'cursor';
        document.body.appendChild(cursor);
        cursor.style.backgroundImage = `url(${this.hammerImage})`;
        
        document.addEventListener('mousemove', (e) => {
          cursor.style.left = `${e.clientX}px`;
          cursor.style.top = `${e.clientY}px`;
        });
      },
      hitAnimation: () => {
        const cursor = document.querySelector('.cursor');
        cursor.style.transform = 'translate(-50%, -50%) rotate(-30deg)';
        setTimeout(() => {
          cursor.style.transform = 'translate(-50%, -50%) rotate(0)';
        }, 100);
      }
    };
  }

  showGoblin() {
    const cell = this.field.getRandomCell();
    const goblin = document.createElement('img');
    goblin.src = this.goblinImage;
    goblin.className = 'goblin';
    cell.appendChild(goblin);
    
    setTimeout(() => {
      if (cell.contains(goblin)) {
        this.miss();
        goblin.remove();
      }
    }, 1000);
  }

  startGame() {
    this.interval = setInterval(() => {
      this.showGoblin();
    }, 1000);
  }

  hit() {
    this.score.increase();
    document.querySelector('.goblin')?.remove();
  }

  miss() {
    this.misses++;
    if (this.misses >= this.maxMisses) {
      this.endGame();
    }
  }

  endGame() {
    clearInterval(this.interval);
    alert(`Game over! Your score: ${this.score.points}`);
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }
}