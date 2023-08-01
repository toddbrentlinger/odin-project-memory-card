import { useEffect, useRef } from "react";

function Card(props) {
    const { image, title } = props.card;
    const elementRef = useRef(null);
    const animationRef = useRef(null);

    const handleSelectCard = () => {
        props.handleSelectCard(props.card.id);
    };

    useEffect(() => {
        animationRef.current = elementRef.current.animate(
            [{transform: 'rotateY(180deg)'}, {transform: 'rotateY(0deg)'}],
            {
                easing: 'ease-in-out',
                duration: 1000,
            }
        );
    }, []);

    useEffect(() => {
        console.log(`Card Renders: ${title}`);
        animationRef.current.play();
    });

    return (
        <div
            ref={elementRef}
            className="memory-card" 
            tabIndex={0}
            onClick={handleSelectCard}
        >
            <img className="memory-card-img" src={image} alt={title} />
        </div>
    );
}

export default Card;
