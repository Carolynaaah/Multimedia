window.onload = function () {
    let board = document.getElementById('board');
    let guessButton = this.document.getElementById('guessButton');
    let guessInput = this.document.getElementById('guessInput');
    let message = document.getElementById('message');
    let newGameButton = document.getElementById('newGameButton');
    let winsEl = document.getElementById('wins');
    let lossesEl = document.getElementById('losses');
    let streakEl = document.getElementById('streak');
    let playedEl = document.getElementById('played');
    let winrateEl = document.getElementById('winrate');

    let played = 0;


    let wins = 0;
    let losses = 0;
    let streak = 0;

    function updateStats() {
        playedEl.textContent = played;
        winsEl.textContent = wins;
        lossesEl.textContent = losses;
        streakEl.textContent = streak;

        let winrate = played > 0 ? Math.round((wins / played) * 100) : 0;
        winrateEl.textContent = winrate;
    }

    updateStats();


    function showError(text) {
        message.textContent = text;
        message.className = "error";
    }

    function clearMessage() {
        message.textContent = "";
        message.className = "";
    }

    function setGameOver() {
        gameOver = true;
        newGameButton.style.display = "inline-block";
    }

    function resetBoard() {
        document.querySelectorAll('.cell').forEach(cell => {
            cell.textContent = "";
            cell.classList.remove('green', 'yellow', 'red');
        });
    }

    newGameButton.addEventListener('click', function () {
        resetBoard();
        tries = 0;
        gameOver = false;
        word = words[Math.floor(Math.random() * words.length)];
        guessInput.value = "";
        clearMessage();
        newGameButton.style.display = "none";
    });




    for (let i = 0; i < 6; i++) {
        let row = this.document.createElement('div');
        row.classList.add('row');
        board.append(row);

        for (let j = 0; j < 5; j++) {
            let cell = this.document.createElement('div');
            cell.classList.add('cell');
            cell.setAttribute('data-row', i);
            cell.setAttribute('data-column', j);
            row.append(cell);
        }
    }

    const words = ["table", "chair", "piano", "mouse", "house", "plant", "brain", "cloud", "beach", "fruit", "media"];
    let word = words[Math.floor(Math.random() * words.length)];


    let tries = 0;
    let gameOver = false;

    guessButton.addEventListener('click', function () {
        if (gameOver == true) {
            alert("Game is already over");
            return;
        }

        let guess = guessInput.value;

        guess = guess.trim().toLowerCase();

        if (guess.length !== 5) {
            showError("Guess must be exactly 5 letters.");
            return;
        }

        clearMessage();

        let guessLetters = guess.split('');
        let wordLetters = word.split('');

        for (let i = 0; i < 5; i++) {
            let cell = document.querySelector(
                `[data-row="${tries}"][data-column="${i}"]`
            );

            cell.textContent = guessLetters[i];
            cell.classList.remove('green', 'yellow', 'red');

            if (guessLetters[i] === wordLetters[i]) {
                cell.classList.add('green');
                guessLetters[i] = null;
                wordLetters[i] = null;
            }
        }

        for (let i = 0; i < 5; i++) {
            if (guessLetters[i] === null) continue;

            let cell = document.querySelector(
                `[data-row="${tries}"][data-column="${i}"]`
            );

            let idx = wordLetters.indexOf(guessLetters[i]);

            if (idx !== -1) {
                cell.classList.add('yellow');
                wordLetters[idx] = null;
            } else {
                cell.classList.add('red');
            }

            cell.classList.remove('flip');
            void cell.offsetWidth;
            cell.classList.add('flip');
        }




        if (word === guess) {
            alert("You won");
            wins++;
            streak++;
            played++;
            updateStats();
            setGameOver();
            return;
        }

        if (tries === 5) {
            alert("You lost! The word was: " + word.toUpperCase());
            losses++;
            streak = 0;
            played++;
            updateStats();
            setGameOver();
            return;
        }



        tries++;
    })

    guessInput.addEventListener('keydown', function (event) {
        if (event.key === "Enter") {
            guessButton.click();
        }
    });

}