function Scoreboard({ scoreCurrent, scoreBest }) {
    return (
        <div id="scoreboard">
            <div className="score-container">
                <div>Current Score</div>
                <div id="current-score">{ scoreCurrent }</div>
            </div>
            <span className="vertical-separator"></span>
            <div className="score-container">
                <div>Best Score</div>
                <div id="best-score">{ scoreBest }</div>
            </div>
        </div>
    );
}

export default Scoreboard;
