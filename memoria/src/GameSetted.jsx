import React, { useState } from 'react';
import './App.css';
import images from './images';


const GameSetted = () => {
    // importação de dado
    const { cards, template, found } = images;
    // estado dependente de importação
    const [gameTracker, trackGame] = useState(Array(cards.length * 2).fill(template));
    // estado criado por rodada
    const [turn, moveTurn] = useState(0);
    const [round, setFirstChoice] = useState([null, null]);
    // lógica do jogo
    const handleClick = (link, position, event) => {
        if (event.target.src !== found && turn !== 3) {
            if (turn === 0) {
                setFirstChoice([link, position]);
                moveTurn(1);
                const newTracker = gameTracker.slice();
                newTracker[position] = link;
                trackGame(newTracker);
            } else {
                moveTurn(3);
                const secondChoice = gameTracker.slice();
                secondChoice[position] = link;
                trackGame(secondChoice);
                if (link === round[0] && position !== round[1]) {
                    setTimeout(() => {
                        const rightChoise = gameTracker.map((linkTracker) => {
                            if (linkTracker === round[0]) {
                                return found;
                            }
                            return linkTracker;
                        });
                        rightChoise[position] = found;
                        trackGame(rightChoise);
                    }, 1050);
                } else {
                    setTimeout(() => {
                        const wrongChoice = gameTracker.map((ele) => {
                            if (ele !== found) {
                                return template;
                            }
                            return ele;
                        });
                        trackGame(wrongChoice);
                    }, 1050);
                }
                ;
                setTimeout(() => {
                    moveTurn(0);
                    setFirstChoice([null, null]);
                }, 1055);
            }   
        }
    }
    // lógica de style(Queryes)
    const Card = (props) => {
        const { i } = props;
        return (
            <img onClick={(event) => props.onClick(event)} width={window.innerWidth/9} height={window.innerWidth/9} src={gameTracker[i]} alt='game card'/>
        )

    }
    
    return (
        <div className='table'>
            {cards.map((link, i) => < Card onClick={(event) => handleClick(link, i, event)} key={link+'A'} i={i}/>)}
            {cards.map((link, i) => < Card onClick={(event) => handleClick(link, (i+cards.length), event)} key={link+'B'} i={i+cards.length}/>)}
        </div>
    )
}

export default GameSetted;



