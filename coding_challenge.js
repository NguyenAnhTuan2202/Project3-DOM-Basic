'use strict';
// My structure code
/**
 * 1. Select elements essential
 * 2. Assign event handlers with butttons 'roll'
 *  2.1 Create random dice
 *  2.2 Display dice corresponding with random dice
 *  2.3 Check current score with 1
 * 3. Assign event handlers with butttons 'hold'
 *  3.1 Add current score to active player's score
 *  3.2 Check if player's score is >= 10
 *  3.3 Assign state variables when player win the game
 * 4. Assign event handlers with butttons 'new'
 */
//  1. Select elements essential
const diceEl = document.querySelector('.dice');

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const current0El = document.querySelector('#current--0');
const current1El = document.querySelector('#current--1');

const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnNew = document.querySelector('.btn--new');

let currentScore, activePlayer, scores, isPlaying;

// Fucntion init to reset or initialize state variables
const init = function () {
  diceEl.classList.add('hidden');
  currentScore = 0;
  activePlayer = 0;
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  scores = [0, 0];
  isPlaying = true;

  diceEl.classList.add('hidden');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
};
init();

const switchPlayer = function () {
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// 2. Assign event handlers with butttons 'roll'
btnRoll.addEventListener('click', function () {
  if (isPlaying) {
    // 2.1 Create random dice
    const dice = Math.floor(Math.random() * 6) + 1;
    // 2.2 Display dice corresponding with random dice
    diceEl.src = `dice-${dice}.png`;
    diceEl.classList.remove('hidden');
    // 2.3 Check current score with 1
    if (dice !== 1) {
      currentScore += dice;
      document.querySelector(`#current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // Switch player
      switchPlayer();
    }
  }
});

// 3. Assign event handlers with butttons 'hold'
btnHold.addEventListener('click', function () {
  if (isPlaying) {
    // 3.1 Add current score to active player's score
    scores[activePlayer] += currentScore;
    document.querySelector(`#score--${activePlayer}`).textContent =
      scores[activePlayer];
    // 3.2 Check if player's score is >= 10
    if (scores[activePlayer] >= 10) {
      // 3.3 Assign state variables when player win the game
      isPlaying = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      switchPlayer();
    }
  }
});

// 4. Assign event handlers with butttons 'new'
btnNew.addEventListener('click', init);
