'use client';

import styled from 'styled-components';
import { TileState } from './types';

const KeyboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  margin-top: 2rem;
  width: 100%;
`;

const KeyRow = styled.div`
  display: flex;
  gap: 6px;
`;

const KeyButton = styled.button<{ $state?: TileState; $isWide?: boolean }>`
  background-color: ${props => {
        switch (props.$state) {
            case 'correct': return '#538d4e';
            case 'present': return '#b59f3b';
            case 'absent': return '#3a3a3c';
            default: return '#818384';
        }
    }};
  color: white;
  border: none;
  border-radius: 4px;
  font-weight: bold;
  height: 58px;
  min-width: ${props => props.$isWide ? '65px' : '43px'};
  padding: 0 10px;
  cursor: pointer;
  text-transform: uppercase;
  user-select: none;
  font-size: 1.25rem = 14px; // Simplified
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.9rem;

  &:active {
    opacity: 0.8;
  }
`;

const KEYS = [
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
    ['enter', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'backspace']
];

interface KeyboardProps {
    onChar: (char: string) => void;
    onEnter: () => void;
    onBackspace: () => void;
    keyStates: Record<string, TileState>; // map letter to state
}

export const Keyboard = ({ onChar, onEnter, onBackspace, keyStates }: KeyboardProps) => {
    const handleClick = (key: string) => {
        if (key === 'enter') onEnter();
        else if (key === 'backspace') onBackspace();
        else onChar(key);
    };

    return (
        <KeyboardContainer>
            {KEYS.map((row, i) => (
                <KeyRow key={i}>
                    {row.map(key => {
                        const isSpecial = key === 'enter' || key === 'backspace';
                        const display = key === 'backspace' ? '⌫' : key;
                        return (
                            <KeyButton
                                key={key}
                                onClick={() => handleClick(key)}
                                $state={keyStates[key] || 'empty'}
                                $isWide={isSpecial}
                            >
                                {display}
                            </KeyButton>
                        );
                    })}
                </KeyRow>
            ))}
        </KeyboardContainer>
    );
};
