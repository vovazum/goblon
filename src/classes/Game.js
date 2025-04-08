export default class Game {
  constructor({ goblinImage, hammerImage }) {
    this.goblinImage = goblinImage;
    this.hammerImage = hammerImage;
    this.field = this.createField();
    this.cursor = this.createCursor();
    this.scoreElement = null;
    this.points = 0;
    this.hits = 0; // Счётчик успешных попаданий
    this.maxHits = 10; // Лимит ударов
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
    this.updateScore();
  }

  setupEventListeners() {
    document.querySelector('.field-container').addEventListener('click', (e) => {
      if (e.target.classList.contains('goblin') && this.hits < this.maxHits) {
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

  updateScore() {
    if (!this.scoreElement) {
      this.scoreElement = document.createElement('div');
      this.scoreElement.className = 'score';
      document.body.prepend(this.scoreElement);
    }
    this.scoreElement.textContent = `Score: ${this.points} (${this.hits}/${this.maxHits} hits left)`;
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
    if (this.hits >= this.maxHits || this.misses >= this.maxMisses) {
      return; // Прекращаем игру если достигли лимита
    }

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
    if (this.hits >= this.maxHits) return;
    
    this.hits++;
    this.points += 10; // Начисляем 10 очков за попадание
    this.updateScore();
    document.querySelector('.goblin')?.remove();

    if (this.hits >= this.maxHits) {
      this.endGame(true); // Победа
    }
  }

  miss() {
    this.misses++;
    if (this.misses >= this.maxMisses) {
      this.endGame(false); // Проигрыш
    }
  }

  endGame(isWin) {
    clearInterval(this.interval);
    const message = isWin 
      ? `Вы выиграли! Окончательный счет: ${this.points}` 
      : `Игра окончена! Ваш результат: ${this.points}`;
    alert(message);
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }
}