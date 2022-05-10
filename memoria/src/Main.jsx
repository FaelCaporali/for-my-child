import React, { useState } from 'react';
import GameSetted from './GameSetted';

function Main() {
    const [gameMode, switchMode] = useState('initial')

    if (gameMode === 'normal') {
        return (
        <>
          <GameSetted />
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