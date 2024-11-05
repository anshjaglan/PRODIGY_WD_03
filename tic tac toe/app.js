const cells = document.querySelectorAll('.cell');
const messageElement = document.getElementById('message');
const resetButton = document.getElementById('resetBtn');

let board = ['', '', '', '', '', '', '', '', '']; // Board state
let currentPlayer = 'X'; // X always starts
let gameActive = true; // Whether the game is ongoing or over

// Win conditions (indexes in the board array)
const winConditions = [
    [0, 1, 2], // Top row
    [3, 4, 5], // Middle row
    [6, 7, 8], // Bottom row
    [0, 3, 6], // Left column
    [1, 4, 7], // Middle column
    [2, 5, 8], // Right column
    [0, 4, 8], // Diagonal from top left to bottom right
    [2, 4, 6], // Diagonal from top right to bottom left
];

// Start new game when a cell is clicked
cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

// Handle cell clicks
function handleCellClick(event) {
    const index = event.target.getAttribute('data-index');
    
    if (board[index] !== '' || !gameActive) return; // Ignore if already marked or game is over
    
    board[index] = currentPlayer; // Mark the cell with the current player's symbol
    event.target.textContent = currentPlayer;

    if (checkWin()) {
        messageElement.textContent = `${currentPlayer} Wins!`;
        gameActive = false;
    } else if (board.every(cell => cell !== '')) {
        messageElement.textContent = "It's a Tie!";
        gameActive = false;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X'; // Switch player
        messageElement.textContent = `Player ${currentPlayer}'s turn`;
    }
}

// Check if a player has won
function checkWin() {
    return winConditions.some(combination => {
        const [a, b, c] = combination;
        return board[a] && board[a] === board[b] && board[a] === board[c];
    });
}

// Reset the game
resetButton.addEventListener('click', resetGame);

function resetGame() {
    board = ['', '', '', '', '', '', '', '', '']; // Clear board state
    gameActive = true; // Reset the game status
    currentPlayer = 'X'; // Set X as the first player

    cells.forEach(cell => {
        cell.textContent = ''; // Clear each cell
    });

    messageElement.textContent = `Player ${currentPlayer}'s turn`; // Reset message
}
