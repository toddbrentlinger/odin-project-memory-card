function Card(props) {
    const { image, title } = props.card;

    const handleSelectCard = () => {
        props.handleSelectCard(props.card.id);
    };

    return (
        <div
            className="memory-card" 
            tabIndex={0}
            onClick={handleSelectCard}
        >
            <img className="memory-card-img" src={image} alt={title} />
        </div>
    );
}

export default Card;
