'use strict';

// elements selector
const score0Element = document.querySelector('#score--0');
const score1Element = document.getElementById('score--1');

const imgElement = document.querySelector('.dice');

const btnRoll = document.querySelector('.btn--roll');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');

const current0Element = document.querySelector('#current--0');
const current1Element = document.querySelector('#current--1');

const player0Section = document.querySelector('.player--0');
const player1Section = document.querySelector('.player--1');

let currentScore = 0;
let activePlayer = 0;
let result = 0;
// const currentElement = document.querySelector(`#current--${activePlayer}`);

const player1Name = prompt('Enter your name as player 1!');
const player2Name = prompt('Enter your name as player 2!');

document.getElementById('name--0').textContent = player1Name;

document.getElementById('name--1').textContent = player2Name;

//my functions
const randomNumber = function () {
  return Math.trunc(Math.random() * 6) + 1;
};

//set up starting point
score0Element.textContent = '0';
score1Element.textContent = '0';
imgElement.classList.add('hidden');

//ROLL DICE btn onClick listener handeling
btnRoll.addEventListener('click', function () {
  //generate random dice roll
  const dice = randomNumber();
  imgElement.src = `dice-${dice}.png`;

  //display dice and current dice

  imgElement.classList.remove('hidden');

  //dice condition
  if (dice !== 1) {
    //add to current scoreand display
    currentScore += dice;
    document.querySelector(`#current--${activePlayer}`).textContent =
      currentScore;
  } else {
    //switching next player
    document.querySelector(`#current--${activePlayer}`).textContent = 0;
    // document.querySelector(`#score--${activePlayer}`).textContent = 0;
    currentScore = 0;

    activePlayer = activePlayer === 0 ? 1 : 0;

    // if 'player--active' is set remove it, otherwise add it
    player0Section.classList.toggle('player--active');
    player1Section.classList.toggle('player--active');

    console.log('Rolled 1: switching players');
    console.log(`now player ${activePlayer + 1} is active`);
  }
});

//HOLD btn onClick listener handeling
btnHold.addEventListener('click', function () {
  result = Number(
    document.querySelector(`#score--${activePlayer}`).textContent
  );
  document.querySelector(`#score--${activePlayer}`).textContent =
    currentScore + result;

  if (currentScore + result >= 75) {
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add('player--winner', 'name');

    document.getElementById(`name--${activePlayer}`).textContent +=
      ' Is The Winner!';

    btnRoll.disabled = true;
    btnHold.disabled = true;
  }

  currentScore = 0;
  document.querySelector(`#current--${activePlayer}`).textContent =
    currentScore;

  activePlayer = activePlayer === 0 ? 1 : 0;

  // if 'player--active' is set remove it, otherwise add it
  player0Section.classList.toggle('player--active');
  player1Section.classList.toggle('player--active');

  imgElement.classList.add('hidden');

  console.log('HOLD btn: switching players');
  console.log(`now player ${activePlayer + 1} is active`);
});

//NEW GAME btn onClick listener handeling
btnNew.addEventListener('click', function () {
  currentScore = 0;
  activePlayer = 0;
  result = 0;
  score0Element.textContent = '0';
  score1Element.textContent = '0';
  current0Element.textContent = 0;
  current1Element.textContent = 0;

  imgElement.classList.add('hidden');
  document.getElementById('name--0').textContent = player1Name;

  document.getElementById('name--1').textContent = player2Name;

  if (!player0Section.classList.contains('player--active')) {
    // if 'player--active' is set remove it, otherwise add it
    console.log('last if executed');
    player0Section.classList.toggle('player--active');
    player1Section.classList.toggle('player--active');
  }

  player0Section.classList.contains('player--winner')
    ? player0Section.classList.remove('player--winner', 'name')
    : player1Section.classList.remove('player--winner', 'name');

  btnRoll.disabled = false;
  btnHold.disabled = false;
});
