let dotSize = 20;
let gameBoardSize = 400;
let direction = 'Right';
let snake = [{ top: 0, left: 0 }];
let food = null;

const gameBoard = document.getElementById('game-board');

function startGame() {
    setInterval(gameLoop, 200);
    window.addEventListener('keydown', handleKeydown);
}

function gameLoop() {
    const snakeHead = Object.assign({}, snake[0]); // 获取蛇头位置
    switch (direction) {
        case 'Left':
            snakeHead.left -= dotSize;
            break;
        case 'Right':
            snakeHead.left += dotSize;
            break;
        case 'Up':
            snakeHead.top -= dotSize;
            break;
        case 'Down':
            snakeHead.top += dotSize;
            break;
    }

    if (
        snakeHead.top < 0 || 
        snakeHead.top === gameBoardSize || 
        snakeHead.left < 0 || 
        snakeHead.left === gameBoardSize ||
        snake.some(dot => dot.top === snakeHead.top && dot.left === snakeHead.left)
    ) {
        return gameOver();
    }

    snake.unshift(snakeHead);

        if (food && food.top === snakeHead.top && food.left === snakeHead.left) {
        food = null; // 蛇吃到食物，清除当前食物
    } else {
        snake.pop(); // 如果没有吃到食物，就删除蛇尾（移动）
    }

    if (!food) { // 如果场上没有食物就生成新的食物
        food = { 
            top: Math.floor(Math.random() * gameBoardSize / dotSize) * dotSize,
            left: Math.floor(Math.random() * gameBoardSize / dotSize) * dotSize
        };
    }

    while (document.getElementById('game-board').firstChild) {
        document.getElementById('game-board').removeChild(document.getElementById('game-board').firstChild);
    }

    drawSnake();
    drawFood();
}

function handleKeydown(event) {
    switch (event.key) {
        case 'ArrowUp':
            if (direction !== 'Down') {
                direction = 'Up';
            }
            break;
        case 'ArrowDown':
            if (direction !== 'Up') {
                direction = 'Down';
            }
            break;
        case 'ArrowLeft':
            if (direction !== 'Right') {
                direction = 'Left';
            }
            break;
        case 'ArrowRight':
            if (direction !== 'Left') {
                direction = 'Right';
            }
            break;
    }
}

function drawSnake() {
    snake.forEach(function (dot) {
        const dotElement = document.createElement('div');
        dotElement.style.top = `${dot.top}px`;
        dotElement.style.left = `${dot.left}px`;
        dotElement.classList.add('dot');
        gameBoard.appendChild(dotElement);
    });
}

function drawFood() {
    if (food) {
        const foodElement = document.createElement('div');
        foodElement.style.top = `${food.top}px`;
        foodElement.style.left = `${food.left}px`;
        foodElement.classList.add('food');
        gameBoard.appendChild(foodElement);
    }
}

function gameOver() {
    window.alert('游戏结束');
    snake = [{ top: 0, left: 0 }];
    food = null;
    direction = 'Right';
}

function drawSnake() {
    snake.forEach(function (dot, index) {
        const dotElement = document.createElement('div');
        dotElement.style.top = `${dot.top}px`;
        dotElement.style.left = `${dot.left}px`;
        if (index === 0) { // 蛇头
            dotElement.classList.add('head');
        } else { // 蛇身
            dotElement.classList.add('dot');
        }
        gameBoard.appendChild(dotElement);
    });
}

document.getElementById('start-button').addEventListener('click', startGame);

