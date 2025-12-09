'use client';

import styled from 'styled-components';
import { Tile } from './Tile';
import { GuessResult, TileState } from './types';

const Grid = styled.div`
  display: grid;
  grid-template-rows: repeat(6, 1fr);
  gap: 5px;
  width: 350px;
  max-width: 100vw;
  margin: 0 auto;
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 5px;
`;

interface BoardProps {
    completedGuesses: GuessResult[];
    currentGuess: string;
    maxGuesses?: number; // 6
}

export const Board = ({ completedGuesses, currentGuess, maxGuesses = 6 }: BoardProps) => {
    const empties = maxGuesses - 1 - completedGuesses.length;
    // If game not over, show current guess row. If game over (6 guesses), no current guess row if strictly adhering, 
    // but usually game stops. We'll assume if completedGuesses < 6, we show current + empties.

    const showCurrent = completedGuesses.length < maxGuesses;
    const emptyRows = Math.max(0, maxGuesses - completedGuesses.length - (showCurrent ? 1 : 0));

    return (
        <Grid>
            {completedGuesses.map((guess, i) => (
                <Row key={i}>
                    {guess.word.split('').map((letter, j) => (
                        <Tile
                            key={j}
                            letter={letter}
                            state={guess.result[j]}
                            animationDelay={j * 0.1}
                        />
                    ))}
                </Row>
            ))}

            {showCurrent && (
                <Row>
                    {Array.from({ length: 5 }).map((_, i) => {
                        const letter = currentGuess[i] || '';
                        return (
                            <Tile
                                key={i}
                                letter={letter}
                                state={letter ? 'tbd' : 'empty'}
                            />
                        );
                    })}
                </Row>
            )}

            {Array.from({ length: emptyRows }).map((_, i) => (
                <Row key={`empty-${i}`}>
                    {Array.from({ length: 5 }).map((_, j) => (
                        <Tile key={j} letter="" state="empty" />
                    ))}
                </Row>
            ))}
        </Grid>
    );
};
