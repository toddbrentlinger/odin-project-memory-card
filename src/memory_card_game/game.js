import Card from "./card";

export class GameState {
    static PLAYING = new GameState(0);
    static WON = new GameState(1);
    static LOST = new GameState(2);

    constructor(value) {
        this.value = value;
    }
}

const game = (() => {
    const roundMax = 5;
    
    let cards = [];
    let cardsInRound = [];
    let cardsSelectedInRound = [];
    let round = 1;
    let score = 0;
    let scoreBest = Number(localStorage.getItem('scoreBest')) || 0;
    let gameState = null;

    function init(cardsData) {
        // Return if cardsData is undefined or empty
        if (!cardsData || !Array.isArray(cardsData) || !cardsData.length) { return; }

        cards = cardsData.map((cardDataItem) => {
            return new Card(cardDataItem.id, cardDataItem.image, cardDataItem.name);
        });
    }

    function checkRoundComplete() {
        if (cardsInRound.length === cardsSelectedInRound.length) {
            if (round === roundMax) {
                endGame(true);
            } else {
                round++;
                createNewRound();
            }
        } else {
            // Continue round
            randomizeArr(cardsInRound);
            console.log(`Score: ${score}\nSelect Card`);
            displayRoundCards();
        }
    }

    function createNewGame() {
        console.log(`New Game! Best Score: ${scoreBest}`);
        round = 1;
        score = 0;
        gameState = GameState.PLAYING;
        createNewRound();
    }

    function createNewRound() {
        console.log(`Round ${round} of ${roundMax}`);
        console.log('Select Card');
        cardsSelectedInRound = [];
        const numCardsPerRound = parseInt(cards.length / roundMax) * round;
        cardsInRound = getRandomItems(cards, numCardsPerRound);
        displayRoundCards();
    }

    function displayRoundCards() {
        let msg = '';

        cardsInRound.forEach((card, index) => {
            msg += `${card.id} - ${card.title}`;
            if (index < cardsInRound.length - 1) {
                msg += '\n';
            }
        });

        console.log(msg);
    }

    function endGame(didWin = false) {
        let msg = didWin ? "Congratulations! You Won!" : "Game Over! Better Luck Next Time!";
        msg += `\nCurrent Score: ${score}\nBest Score: ${scoreBest}`;
        console.log(msg);

        gameState = didWin ? GameState.WON : GameState.LOST;
    }

    function getRandomItems(arr, nItems) {
        // If arr length is less than or equal to nItems, return all items from arr
        if (arr.length <= nItems) { return [...arr]; }
    
        let itemArr = [];
        let item;
        while (nItems > 0) {
            item = arr[Math.floor(Math.random() * arr.length)];
            if (!itemArr.includes(item)) {
                itemArr.push(item);
                nItems--;
            }
        }
    
        return itemArr;
    }

    function play() {
        createNewGame();
    }

    /**
     * Randomizes array in-place using the Fisher-Yates (aka Knuth) Shuffle.
     * @param {Array} arr 
     * @returns Randomized array
     */
    function randomizeArr(arr) {
        let currIndex = arr.length, randomIndex;

        // While there are remaining items to shuffle
        while (currIndex > 0) {
            // Pick random remaining item index
            randomIndex = Math.floor(Math.random() * currIndex);

            // Decrement currIndex
            currIndex--;

            // Swap random item with current item
            [arr[currIndex], arr[randomIndex]] = [
                arr[randomIndex],
                arr[currIndex]
            ];
        }

        return arr;
    }

    function selectCard(selectedCardId) {
        // If game state is NOT PLAYING, return
        if (gameState !== GameState.PLAYING) { return; }

        const selectedCard = cards.find((card) => card.id === selectedCardId);

        // Return if selectedCard does not exist
        if (selectedCard === undefined) { return; }

        // Return if selectedCard is not even in cardsInRound (invalid card)
        if (!cardsInRound.includes(selectedCard)) { return; }

        console.log(`Selected Card: ${selectedCard.title}`);

        // If selectedCard is already in cardsSelectedInRound, end game and return
        if (cardsSelectedInRound.includes(selectedCard)) {
            endGame();
            return gameState;
        }

        // If reach here, selectedCard is valid AND NOT already selected
        
        // Add selectedCard to cardsSelectedInRound array
        cardsSelectedInRound.push(selectedCard);

        // Increment current score
        score++;

        // Update best score if necessary
        if (score >= scoreBest) {
            scoreBest = score;
            localStorage.setItem('scoreBest', scoreBest);
        }

        // Check if round is complete
        checkRoundComplete();

        return gameState;
    }

    return {
        init,
        play,
        selectCard,
        get cardsInRound() { return [...cardsInRound]; },
        get gameState() { return gameState; },
        get round() { return round; },
        get roundMax() { return roundMax; },
        get score() { return score; },
        get scoreBest() { return scoreBest },
    };
})();

export default game;
