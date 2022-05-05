const baseWordsPrime = ['teste', 'iara', 'savarino', 'pivete', 'escola', 'letras', 'lapis', 'panda', 'cebola', 'odin', 'frio', 'aula', 'forca', 'fui', 'eu', 'jogo', 'comida', 'sorvete', 'arroz', 'salada'];

const baseWords = ['jogo', 'novo', 'bolo', 'lobo', 'todo',, 'iara', 'lara', 'fala', 'bala', 'mata', 'lata', 'cata', 'arara', 'abala', 'acaba', 'afaga', 'apaga', 'apara', 'frio', 'crio', 'trio', 'carro', 'barro', 'erro', 'digite', 'filipe', 'felipe', 'limite', 'rinite', 'uma', 'lua', 'sua', 'usa'];

const actualWord = '';

const resetGame = () => {
    const boardElements = document.querySelectorAll('.btn-outline-danger');
    boardElements.forEach((element) => {
        element.classList.add('btn-outline-secondary');
        element.classList.remove('btn-outline-danger');
    });
    const gaps = document.querySelectorAll('#guess span');
    gaps.forEach(guess => guess.remove());
    const wrongGuesses = document.querySelectorAll('#wrong span');
    wrongGuesses.forEach(guess => guess.remove());
};

const displayWord = (word) => {
    const arrayOfLetters = word.split('');
    const wordContainer = document.getElementById('guess');
    arrayOfLetters.forEach(letter => {
        const letterEl = document.createElement('span');
        letterEl.classList.add(`${letter}`, 'hidlet', 'm-1', 'fs-1', 'col-1');
        letterEl.innerText = '_';
        wordContainer.appendChild(letterEl);
    });
};

const newGameListener = () => {
    resetGame();
    const word = document.getElementById('word').value;
    displayWord(word.toUpperCase());
};

const randomGameListener = () => {
    resetGame();
    const generate = Math.floor(Math.random() * baseWords.length - 1)  + 1;
    const chosen = baseWords[generate];
    displayWord(chosen.toUpperCase());
}

const guessWasRight = (letters, eventTarget) => {
    const classes = [];
    letters.forEach((letter) => {
        classes.push(letter.className)        
    });
    return classes.some(inClass => inClass.charAt(0) === eventTarget.innerText);
};

const displayCorrectGuess = (hiddenLetters, event) => {
    hiddenLetters.forEach((letter) => {
        if (letter.classList.contains(event.target.innerText)) {
            letter.classList.add('found', 'text-decoration-underline');
            letter.innerText = event.target.innerText;
        }
    });
};

const displayWrongGuess = (event) => {
    const erros = document.querySelector('#wrong');
    const wrongGuess = document.createElement('span');
    wrongGuess.innerText = event.target.innerText;
    wrongGuess.classList.add('wrongLG');
    wrongGuess.style.color = 'red';
    event.target.classList.remove('btn-outline-secondary');
    event.target.classList.add('btn-outline-danger')
    erros.appendChild(wrongGuess);
};

const endWithWin = () => {
    window.alert('Parabéns, você ganhou');
    resetGame();
}

const endWithLoss = () => {
    window.alert('Não foi dessa vez');
    resetGame();
};

const checkClasses = (nodeList) => {
    const bolls = [];
    nodeList.forEach((domEl) => bolls.push(domEl.classList.contains('found')));
    return bolls.every(bool => bool === true);
};

const checkGameStatus = () => {
    const answerLetters = document.querySelectorAll('#guess span');
    const tries = document.querySelectorAll('#wrong span').length;
    if (checkClasses(answerLetters)) {
        endWithWin();
    } else if (tries === 10){
        endWithLoss();
    }
};

const handleGuess = (event) => {
    const hiddenLetters = document.querySelectorAll('.hidlet');
    if (guessWasRight(hiddenLetters, event.target)) {
        displayCorrectGuess(hiddenLetters, event);
    } else {
        displayWrongGuess(event);
    }
    setTimeout(checkGameStatus, 200);
};

const constructBoard = () => {
    const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    alphabet.forEach(letter => {
        const board = document.getElementById('board');
        const newKey = document.createElement('span');
        newKey.innerText = letter;
        newKey.classList = `key, ${letter.toLocaleLowerCase()}`;
        newKey.classList.add('btn', 'btn-outline-secondary', 'col-2', 'text-center')
        newKey.addEventListener('click', handleGuess);
        board.appendChild(newKey);
    })
};


constructBoard();
document.getElementById('random').addEventListener('click', randomGameListener);
document.getElementById('newGame').addEventListener('click', newGameListener);

// export default { constructBoard, handleGuess, displayCorrectGuess, displayWrongGuess, displayWord, guessWasRight, newGameListener, randomGameListener, resetGame }