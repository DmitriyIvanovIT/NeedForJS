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
        speed: 3,
        traffic: 3
    };

// Функции
const getCountElements = heightElement => document.documentElement.clientHeight / heightElement + 1,
    moveRoad = () => {
        const lines = document.querySelectorAll('.line');
        lines.forEach(line => {
            line.y += setting.speed;
            line.style.top = `${line.y}px`;

            if (line.y >= document.documentElement.clientHeight) {
                line.y = -75;
            }
        });
    },
    moveEnemy = () => {
        const enemy = document.querySelectorAll('.enemy');
        enemy.forEach(enemyCar => {
            const carRect = car.getBoundingClientRect(),
                enemyRect = enemyCar.getBoundingClientRect();

            if (carRect.top <= enemyRect.bottom &&
                carRect.right >= enemyRect.left &&
                carRect.left <= enemyRect.right &&
                carRect.bottom >= enemyRect.top) {
                setting.start = false;
                start.classList.remove('hide');
            }

            enemyCar.y += setting.speed / 2;
            enemyCar.style.top = `${enemyCar.y}px`;

            if (enemyCar.y >= document.documentElement.clientHeight) {
                enemyCar.y = -200 * setting.traffic;
                enemyCar.style.left = `${Math.floor(Math.random() * (gameArea.offsetWidth - 50))}px`;
            }
        });
    },
    playGame = () => {

        if (setting.start === true) {
            setting.score += setting.speed;
            score.innerHTML = `SCORE:<br>
            ${setting.score}`;
            moveRoad();
            moveEnemy();
            if (keys.ArrowLeft && setting.x > 0) {
                setting.x -= setting.speed;
            }
            if (keys.ArrowRight && setting.x < (gameArea.offsetWidth - car.offsetWidth)) {
                setting.x += setting.speed;
            }

            if (keys.ArrowDown && setting.y < (gameArea.offsetHeight - car.offsetHeight - 15)) {
                setting.y += setting.speed;
            }

            if (keys.ArrowUp && setting.y > 90) {
                setting.y -= setting.speed;
            }
            car.style.left = `${setting.x}px`;
            car.style.top = `${setting.y}px`;
            requestAnimationFrame(playGame);
        }
    },
    startGame = () => {
        start.classList.add('hide');
        score.classList.remove('hide');
        gameArea.innerHTML = '';
       

        for (let i = 0; i < getCountElements(75); i++) {
            const line = document.createElement('div');
            line.classList.add('line');
            line.style.top = `${(i * 75)}px`;
            line.y = i * 75;
            gameArea.appendChild(line);
        }

        for (let i = 0; i < getCountElements(100 * setting.traffic); i++) {
            const enemy = document.createElement('div');
            enemy.classList.add('enemy');
            enemy.y = -100 * setting.traffic * (i + 1);
            enemy.style.top = `${enemy.y}px`;
            enemy.style.left = `${Math.floor(Math.random() * (gameArea.offsetWidth - 50))}px`;
            // eslint-disable-next-line max-len
            enemy.style.background = `transparent url('./image/enemy${Math.round(1 - 0.5 + Math.random() * 3 - 1 + 1)}.png') center / cover no-repeat`;
            gameArea.appendChild(enemy);
        }
        setting.score = 0;
        setting.start = true;
        gameArea.appendChild(car);
        car.style.left = `${gameArea.offsetWidth / 2 - car.offsetWidth / 2}px`;
        car.style.top = `${gameArea.offsetHeight - car.offsetHeight - 15}px`;
        setting.x = car.offsetLeft;
        setting.y = car.offsetTop;
        requestAnimationFrame(playGame);
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
