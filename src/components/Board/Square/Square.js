import React from 'react';
import { emptySquare } from '../../../util';
import './Square.css';

const Square = props => {
  const classes = ["Square"];
  if (!emptySquare(props.symbol)) classes.push("selected");
  return (
    <div className={classes.join(' ')} onClick={props.clicked}>
      {!emptySquare(props.symbol) ? props.symbol : null}
    </div>
  );
}

export default Square;