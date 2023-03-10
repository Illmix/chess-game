import React, {useEffect, useState} from 'react';
import './App.css';
import BoardComponent from "./components/BoardComponent";
import {Board} from "./models/Board";
import {Player} from "./models/Player";
import {Colors} from "./models/Colors";
import LostFigures from "./components/LostFigures";
import Timer from "./components/Timer";

const App = () => {
    const [board, setBoard] = useState<Board>(new Board());
    const [whitePlayer] = useState<Player>(new Player(Colors.WHITE));
    const [blackPlayer] = useState<Player>(new Player(Colors.BLACK));
    const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);

    useEffect(()=>{
        restart();
    }, [])

    function restart () {
        const newBoard = new Board();
        newBoard.initCells();
        newBoard.addFigures();
        setBoard(newBoard);
        setCurrentPlayer(whitePlayer);
    }

    function swapPlayer() {
        setCurrentPlayer(currentPlayer?.color === Colors.WHITE ? blackPlayer : whitePlayer)
    }

    return (
        <div className="app">
            <Timer currentPlayer={currentPlayer} restart={restart}/>
            <BoardComponent
                board={board}
                setBoard={setBoard}
                currentPlayer={currentPlayer}
                swapPlayer={swapPlayer}
            />
            <div>
                <LostFigures
                    title={"Black figures"}
                    figures={board.lostBlackFigures}
                />
                <LostFigures
                    title={"White figures"}
                    figures={board.lostWhiteFigures}
                />
            </div>
        </div>
    );
};

export default App;