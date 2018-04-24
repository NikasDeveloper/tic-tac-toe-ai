import React from 'react';
import './Board.css';

const Board = props => {
  return <div className="Board">{props.children}</div>;
};

export default Board;