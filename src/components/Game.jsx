import { useEffect, useState } from "react";
import GameOverMessage from "./GameOverMessage";
import Round from "./Round";
import Scoreboard from "./Scoreboard";
import Loading from "./Loading";
import game, { GameState } from "../memory_card_game/game.js";

function Game() {
    const [scoreBest, setScoreBest] = useState(Number(localStorage.getItem('scoreBest')) || 0);
    const [score, setScore] = useState(0);
    const [round, setRound] = useState(1);
    const [cardsInRound, setCardsInRound] = useState([]);
    const [isGameOver, setIsGameOver] = useState(false);
    const [gameState, setGameState] = useState(GameState.PLAYING);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch('https://hp-api.onrender.com/api/characters')
            .then((response) => response.json())
            .then((data) => {
                // Filter data to only items with image (25/402 items with images)
                data = data.filter((item) => item.image.length > 0);

                game.init(data);
                createNewGame();
                setIsLoading(false);
            });
    }, []);

    useEffect(() => {
        localStorage.setItem('scoreBest', scoreBest);
    }, [scoreBest]);

    const createNewGame = () => {
        game.play();

        setScore(game.score);
        setScoreBest(game.scoreBest);
        setRound(game.round);
        setCardsInRound([...game.cardsInRound]);
        setIsGameOver(false);
        setGameState(game.gameState);
    };

    const handleSelectCard = (selectedCardId) => {
        game.selectCard(selectedCardId);

        // Remove focus of selected element (focus remains after re-render)
        if (document.activeElement) {
            document.activeElement.blur();
        }
        
        switch(game.gameState) {
            case GameState.LOST:
            case GameState.WON:
                setIsGameOver(true);
                setGameState(game.gameState);
                break;
            case GameState.PLAYING:
            default:
                setScore(game.score);
                setScoreBest(game.scoreBest);
                setRound(game.round);
                setCardsInRound([...game.cardsInRound]);
                setIsGameOver(false);
                setGameState(game.gameState);
        }
    };

    const renderGame = () => {
        return (
            <>
                <section id="scoreboard-round-outer">
                    <div id="scoreboard-round-inner">
                        <Scoreboard 
                            scoreCurrent={score} 
                            scoreBest={scoreBest}
                        />
                        <div id="round-container">
                            <span>Round: </span>
                            <span id="round-number">{`${round} of ${game.roundMax}`}</span>
                        </div>
                    </div>
                </section>
                <Round 
                    cardsInRound={cardsInRound} 
                    handleSelectCard={handleSelectCard}
                />
            </>
        );
    };

    const renderGameOver = () => {
        return (
            <GameOverMessage 
                didWin={gameState === GameState.WIN} 
                score={score}
                scoreBest={scoreBest}
                createNewGame={createNewGame}
            />
        );
    };

    return (
        <div id="memory-card-game-container">
            { 
                isLoading ? <Loading /> :  
                    isGameOver ? renderGameOver() : renderGame()
            }
        </div>
    );
}

export default Game;
