const cells = document.querySelectorAll('.cell');
const gameBoard = document.getElementById('gameBoard');
const resultDisplay = document.getElementById('result');
let currentPlayer = 'X';
let gameOver = false;

startGame();

function startGame() {
    cells.forEach(cell => {
        cell.addEventListener('click', handleCellClick, { once: true });
    });
}

function handleCellClick(e) {
    const cell = e.target;
    const currentIndex = parseInt(cell.dataset.cellIndex);

    placeMark(cell, currentIndex);
    if (checkWin()) {
        endGame(false);
    } else if (isDraw()) {
        endGame(true);
    } else {
        swapPlayers();
    }
}

function placeMark(cell, index) {
    cell.innerText = currentPlayer;
}

function swapPlayers() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function checkWin() {
    const winCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    return winCombinations.some(combination => {
        return combination.every(index => {
            return cells[index].innerText === currentPlayer;
        });
    });
}

function isDraw() {
    return [...cells].every(cell => cell.innerText !== '');
}

function endGame(isDraw) {
    if (isDraw) {
        resultDisplay.textContent = 'ничья)';
    } else {
        resultDisplay.textContent = `${currentPlayer} выиграл!!`;
    }
    gameOver = true;
}

function restartGame() {
    gameOver = false;
    cells.forEach(cell => {
        cell.innerText = '';
        cell.removeEventListener('click', handleCellClick);
    });
    startGame();
}