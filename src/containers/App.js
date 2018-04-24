import React, { Component } from 'react';
import Board from '../components/Board/Board';
import Square from '../components/Board/Square/Square';
import './App.css';

import { emptySquare, checkWin, checkTie, aiMove } from '../util';

class App extends Component {
  state = {
    squares: [],
    human: 'X',
    ai: 'O',
    won: false,
  }
  componentDidMount() {
    this.startGame();
  }
  startGame = () => {
    this.setState({
      squares: Array.from(Array(9).keys()),
      won: false
    });
  }
  clickHandler = (index) => {
    const squares = [...this.state.squares];
    let clickedSquare = squares[index];
    if (emptySquare(clickedSquare)) {
      const player = this.state.human;
      clickedSquare = player;
      squares[index] = clickedSquare;
      const playerWon = checkWin(squares, player);
      if (playerWon) this.setState({ squares: squares, won: playerWon });
      else {
        const aiPlayer = this.state.ai;
        const aiIndex = aiMove(squares, aiPlayer);
        squares[aiIndex] = aiPlayer;
        const aiPlayerWon = checkWin(squares, aiPlayer);
        this.setState({ squares: squares, won: aiPlayerWon });
      }
    }
  }
  render() {
    const tie = checkTie(this.state.squares);
    let board = (
      <div>
        <h3>{this.state.won ? `${this.state.won} won the game!` : 'Game is tie'} </h3>
        <button className="btn btn-default" onClick={this.startGame.bind(this)}>
          Replay
        </button>
      </div>
    );
    if (!this.state.won && !tie) board = (
      <Board>
        {
          this.state.squares.map((square, index) => (
            <Square
              key={index}
              symbol={square}
              clicked={this.clickHandler.bind(this, index)} />
          ))
        }
      </Board>
    );
    return (
      <div className="App">
        <h1>Tic-Tac-Toe with AI</h1>
        {board}
      </div>
    );
  }
}

export default App;
