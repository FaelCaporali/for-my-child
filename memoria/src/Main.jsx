import React, { useState } from 'react';
import GameSetted from './GameSetted';
import images from './images';

function Main() {
    const [gameMode, switchMode] = useState('initial');
    
    const randomOrder = () => {
        const {cards} = images;
        const baseArray = Array(cards.length * 2).fill(1).reduce((acc, _, i) => {
            const noob = acc;
            noob.push(i+1);
            return noob;
        }, []);
        function fisherYatesShuffle(old){
            const arr = old;
            for(let i =arr.length-1 ; i>0 ;i--){
                let j = Math.floor( Math.random() * (i + 1) ); //random index
                [arr[i],arr[j]]=[arr[j],arr[i]]; // swap
            }
            return arr;
        }
        const final = fisherYatesShuffle(baseArray);
        return final;
    }
    const randomOrders = randomOrder();

    if (gameMode === 'normal') {
        return (
        <>
          <GameSetted randomOrders={randomOrders}/>
          <button onClick={() => switchMode('initial')}>Resetar o jogo</button>
        </>
        );
    } else {
        return (
            <div className="initialState">
                < button onClick={() => switchMode('normal')}>Novo Jogo</button>
            </div>
        );
    }

}

export default Main;