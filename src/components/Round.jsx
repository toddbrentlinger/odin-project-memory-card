import Card from "./Card";

function Round({ cardsInRound, handleSelectCard }) {
    return (
        <section id="memory-card-round">
            {
                cardsInRound.map((card) => <Card key={card.id} card={card} handleSelectCard={handleSelectCard}/>)
            }
        </section>
    );
}

export default Round;
