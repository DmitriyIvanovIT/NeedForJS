/* eslint-disable strict */
'use strict';
// Переменные
const score = document.querySelector('.score'),
    start = document.querySelector('.start'),
    gameArea = document.querySelector('.gameArea'),
    car = document.createElement('div');

car.classList.add('car');

const keys = {
        ArrowUp: false,
        ArrowDown: false,
        ArrowLeft: false,
        ArrowRight: false
    },
    setting = {
        start: false,
        score: 0,
        speed: 3
    };

// Функции
const startGame = () => {
        start.classList.add('hide');
        setting.start = true;
        gameArea.appendChild(car);
        requestAnimationFrame(playGame);
    },
    playGame = () => {
        if (setting.start === true) {
            requestAnimationFrame(playGame);
        }
    },
    startRun = event => {
        event.preventDefault();
        keys[event.key] = true;
    },
    stopRun = event => {
        event.preventDefault();
        keys[event.key] = false;
    };

// Обработчики событий
start.addEventListener('click', startGame);
document.addEventListener('keydown', startRun);
document.addEventListener('keyup', stopRun);
