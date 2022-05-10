import React from "react";
import images from './images';
// lógica de style(implementar Queryes e animações)

const Card = (props) => {
    const { cards } = images;
    const { i, gameTracker, order, onClick } = props;
    const calculateDisplay = Math.floor(Math.sqrt(((window.innerHeight * 0.55) * window.innerWidth) / (cards.length * 2)));
    const orderInGame = order[i];
    const myStyle = {
        order: orderInGame,
        width: calculateDisplay,
        height: calculateDisplay,
    }
    return (
        <img onClick={(event) => onClick(event)} src={gameTracker[i]} alt='game card' style={myStyle}/>
    )
};

export default Card;