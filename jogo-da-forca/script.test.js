const { constructBoard, handleGuess, displayCorrectGuess, displayWrongGuess, displayWord, guessWasRight, newGameListener, randomGameListener, resetGame } = require('./script');
it('expects to be a function', () => {
    expects(typeof constructBoard).toBe('function');
})