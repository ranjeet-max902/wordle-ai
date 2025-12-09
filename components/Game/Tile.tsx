'use client';

import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';
import { TileState } from './types';

const getBackgroundColor = (state: TileState) => {
    switch (state) {
        case 'correct': return '#538d4e';
        case 'present': return '#b59f3b';
        case 'absent': return '#3a3a3c';
        default: return 'transparent';
    }
};

const getBorderColor = (state: TileState) => {
    switch (state) {
        case 'tbd': return '#818384'; // active typing
        case 'empty': return '#3a3a3c';
        default: return 'transparent';
    }
};

const TileData = styled(motion.div) <{ $state: TileState }>`
  width: 100%;
  aspect-ratio: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  font-weight: bold;
  text-transform: uppercase;
  user-select: none;
  border: 2px solid ${props => getBorderColor(props.$state)};
  background-color: ${props => getBackgroundColor(props.$state)};
  color: white;
  
  ${props => props.$state === 'tbd' && css`
     animation: pop 0.1s;
  `}
`;

interface TileProps {
    letter: string;
    state: TileState;
    animationDelay?: number;
}

export const Tile = ({ letter, state, animationDelay = 0 }: TileProps) => {
    const isRevealed = state === 'correct' || state === 'present' || state === 'absent';

    return (
        <TileData
            $state={state}
            animate={isRevealed ? { rotateX: [0, 90, 0] } : {}}
            transition={{ duration: 0.5, delay: animationDelay }}
            initial={false}
        >
            <div style={{ transform: isRevealed ? 'rotateX(0deg)' : 'none' }}>
                {letter}
            </div>
        </TileData>
    );
};
