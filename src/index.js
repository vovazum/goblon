import Game from './classes/Game.js';
import './styles/main.css';

const game = new Game();
game.init();

// Обработка кликов по полю
document.querySelector('.field-container').addEventListener('click', (e) => {
  if (e.target.classList.contains('goblin')) {
    game.hit();
  }
});