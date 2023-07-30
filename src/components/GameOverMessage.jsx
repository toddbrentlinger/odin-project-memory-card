function GameOverMessage(props) {
    const { createNewGame, score, scoreBest, didWin = false } = props;

    const displayWinMessage = () => {
        return (
            <p>Game Over! You Win!</p>
        );
    };

    const displayLoseMessage = () => {
        return (
            <p>Game Over! You Lose!</p>
        );
    };

    const displayScoreMessage = () => {
        if (score >= scoreBest) {
            return `New Best Score: ${scoreBest}`
        } else { // Else score < scoreBest
            return `Score: ${score} (Best: ${scoreBest})`;
        }
    };

    return (
        <section id="game-over-message-container">
            {
                didWin ? displayWinMessage() : displayLoseMessage()
            }
            <p>{displayScoreMessage()}</p>
            <button onClick={createNewGame}>
                <span>Start New Game</span>
            </button>
        </section>
    );
}

export default GameOverMessage;
