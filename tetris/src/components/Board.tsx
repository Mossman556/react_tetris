import React, { useEffect } from 'react';
import Cell from './Cell';
import { BoardShape } from '../types';
import { playSquareWaveSound } from './audioManager';

interface Props {
  currentBoard: BoardShape;
}

function Board({ currentBoard }: Props) {
  useEffect(() => {
    function handleKeyPress(event: KeyboardEvent) {
      if (event.code === 'ArrowLeft' || event.code === 'ArrowRight' || event.code === 'ArrowUp') {
        playSquareWaveSound();
      }
    }

    window.addEventListener('keyup', handleKeyPress);

    return () => {
      window.removeEventListener('keyup', handleKeyPress);
    };
  }, []);

  return (
    <div className="board">
      {currentBoard.map((row, rowIndex) => (
        <div className="row" key={`${rowIndex}`}>
          {row.map((cell, colIndex) => (
            <Cell key={`${rowIndex}-${colIndex}`} type={cell} />
          ))}
        </div>
      ))}
    </div>
  );
}

export default Board;
