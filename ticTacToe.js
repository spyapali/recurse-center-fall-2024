import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';

const rowStyle = {
    display: 'flex'
}

const squareStyle = {
    'width': '60px',
    'height': '60px',
    'backgroundColor': '#ddd',
    'margin': '4px',
    'display': 'flex',
    'justifyContent': 'center',
    'alignItems': 'center',
    'fontSize': '20px',
    'color': 'white'
}

const boardStyle = {
    'backgroundColor': '#eee',
    'width': '208px',
    'alignItems': 'center',
    'justifyContent': 'center',
    'display': 'flex',
    'flexDirection': 'column',
    'border': '3px #eee solid'
}

const containerStyle = {
    'display': 'flex',
    'alignItems': 'center',
    'flexDirection': 'column'
}

const instructionsStyle = {
    'marginTop': '5px',
    'marginBottom': '5px',
    'fontWeight': 'bold',
    'fontSize': '16px',
}

const buttonStyle = {
    'marginTop': '15px',
    'marginBottom': '16px',
    'width': '80px',
    'height': '40px',
    'backgroundColor': '#8acaca',
    'color': 'white',
    'fontSize': '16px',
}

function Square({ value, onClick }) {
    return (
        <div
            className="square"
            style={squareStyle}
            onClick={onClick}
        >
            {value}
        </div>
    );
}

function Board({ player, handlePlayer, winningPlayer, setWinningPlayer, setPlayer, board, handleBoard, won, setHasWon, resetBoard, hasWon }) {

    return (
        <div style={containerStyle} className="gameBoard">
            <div id="statusArea" className="status" style={instructionsStyle}>Next player: <span>{player}</span></div>
            <div id="winnerArea" className="winner" style={instructionsStyle}>Winner: <span>{won ? winningPlayer : "None"}</span></div>
            <button style={buttonStyle} onClick={() => { resetBoard(); setHasWon(false); setPlayer("X") }}>Reset</button>
            <div onClick={() => {
                if (hasWon()) {
                    setWinningPlayer(player);
                    setHasWon(true);
                }
            }}>
                {!won ?
                    (
                        <div style={boardStyle}>
                            <div className="board-row" style={rowStyle}>
                                <Square value={board[0][0]} onClick={() => { if (board[0][0] === "") { handleBoard(0, 0); handlePlayer(); } }} />
                                <Square value={board[0][1]} onClick={() => { if (board[0][1] === "") { handleBoard(0, 1); handlePlayer(); } }} />
                                <Square value={board[0][2]} onClick={() => { if (board[0][2] === "") { handleBoard(0, 2); handlePlayer(); } }} />
                            </div>
                            <div className="board-row" style={rowStyle}>
                                <Square value={board[1][0]} onClick={() => { if (board[1][0] === "") { handleBoard(1, 0); handlePlayer(); } }} />
                                <Square value={board[1][1]} onClick={() => { if (board[1][1] === "") { handleBoard(1, 1); handlePlayer(); } }} />
                                <Square value={board[1][2]} onClick={() => { if (board[1][2] === "") { handleBoard(1, 2); handlePlayer(); } }} />
                            </div>
                            <div className="board-row" style={rowStyle}>
                                <Square value={board[2][0]} onClick={() => { if (board[2][0] === "") { handleBoard(2, 0); handlePlayer(); } }} />
                                <Square value={board[2][1]} onClick={() => { if (board[2][1] === "") { handleBoard(2, 1); handlePlayer(); } }} />
                                <Square value={board[2][2]} onClick={() => { if (board[2][2] === "") { handleBoard(2, 2); handlePlayer(); } }} />
                            </div>
                        </div>
                    ) : <div>Thanks for playing!</div>}
            </div>
        </div>
    );
}

function Game() {
    const [player, setPlayer] = useState("X")
    const [winningPlayer, setWinningPlayer] = useState();
    const [won, setHasWon] = useState(false);
    const [board, setBoard] = useState([["", "", ""], ["", "", ""], ["", "", ""]])
    const hasWon = () => {
        if (board[0][0] !== "" && board[0][0] === board[0][1] && board[0][1] === board[0][2]) {
            return true;
        }
        if (board[1][0] !== "" && board[1][0] === board[1][1] && board[1][1] === board[1][2]) {
            return true;
        }
        if (board[2][0] !== "" && board[2][0] === board[2][1] && board[2][1] === board[2][2]) {
            return true;
        }
        if (board[0][0] !== "" && board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
            return true;
        }
        if (board[0][2] !== "" && board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
            return true;
        }
        if (board[0][0] !== "" && board[0][0] === board[1][0] && board[1][0] === board[2][0]) {
            return true;
        }
        if (board[0][1] !== "" && board[0][1] === board[1][1] && board[1][1] === board[2][1]) {
            return true;
        }
        if (board[0][2] !== "" && board[0][2] === board[1][2] && board[1][2] === board[2][2]) {
            return true;
        }
        return false;
    }
    const handleBoard = (x, y) => {
        const newBoard = board.slice()
        newBoard[x][y] = player;
        setBoard(newBoard)
    }
    const resetBoard = () => {
        setBoard([["", "", ""], ["", "", ""], ["", "", ""]])
    }
    const handlePlayer = () => {
        // setPlayer(player === "X" ? "O" : "X")
        setPlayer((prevState) => {
            return prevState === "X" ? "O" : "X"
        })
    }
    return (
        <div className="game">
            <div className="game-board">
                <Board player={player} handlePlayer={handlePlayer} board={board} setHasWon={setHasWon} setPlayer={setPlayer} setWinningPlayer={setWinningPlayer} winningPlayer={winningPlayer} hasWon={hasWon} handleBoard={handleBoard} won={won} resetBoard={resetBoard} />
            </div>
        </div>
    );
}

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<Game />);