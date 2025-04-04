import Game from './classes/Game.js';
import './styles/main.css';
import hammerImg from './images/hammer.png';
import goblinImg from './images/goblin.png';

const game = new Game({
  goblinImage: goblinImg,
  hammerImage: hammerImg
});

game.init();