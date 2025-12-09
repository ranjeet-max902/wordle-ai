'use client';

import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Board } from '@/components/Game/Board';
import { Keyboard } from '@/components/Game/Keyboard';
import { TileState, GuessResult } from '@/components/Game/types';
import { useAuth } from '@/hooks/useAuth';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

const StatusMessage = styled.div`
  text-align: center;
  margin-bottom: 1rem;
  color: #fff;
  font-size: 1.2rem;
  height: 1.5rem;
`;

export default function GamePage() {
    const { isConnected } = useAuth();
    const [currentGuess, setCurrentGuess] = useState('');
    const [completedGuesses, setCompletedGuesses] = useState<GuessResult[]>([]);
    const [gameStatus, setGameStatus] = useState<'playing' | 'won' | 'lost'>('playing');
    const [message, setMessage] = useState('');
    const [keyStates, setKeyStates] = useState<Record<string, TileState>>({});

    // Fetch Word of Day ID
    const { data: wordData, isLoading } = useQuery({
        queryKey: ['word-of-day'],
        queryFn: async () => {
            const res = await fetch('/api/word-of-day');
            return res.json();
        }
    });

    const submitMutation = useMutation({
        mutationFn: async ({ guess, wordId }: { guess: string, wordId: string }) => {
            const res = await fetch('/api/submit', {
                method: 'POST',
                body: JSON.stringify({ guess, wordId }),
            });
            return res.json();
        },
        onSuccess: (data) => {
            const pattern = data.result;

            // Update Keyboard States
            const newKeyStates = { ...keyStates };
            currentGuess.split('').forEach((char, i) => {
                const currentState = newKeyStates[char];
                const newState = pattern[i];

                if (newState === 'correct') {
                    newKeyStates[char] = 'correct';
                } else if (newState === 'present' && currentState !== 'correct') {
                    newKeyStates[char] = 'present';
                } else if (newState === 'absent' && currentState !== 'correct' && currentState !== 'present') {
                    newKeyStates[char] = 'absent';
                }
            });
            setKeyStates(newKeyStates);

            const newResult: GuessResult = {
                word: currentGuess,
                result: pattern,
            };

            const newCompleted = [...completedGuesses, newResult];
            setCompletedGuesses(newCompleted);
            setCurrentGuess('');

            // Check win (all correct)
            const isWin = pattern.every((p: string) => p === 'correct');
            if (isWin) {
                setGameStatus('won');
                const score = Math.max(0, 1000 - (newCompleted.length - 1) * 100);
                setMessage(`You Won! 🎉 Score: ${score}`);
            } else if (newCompleted.length >= 6) {
                setGameStatus('lost');
                setMessage(`Game Over.`);
            }
        },
        onError: () => {
            setMessage('Error validating guess');
        }
    });

    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => setMessage(''), 3000);
            return () => clearTimeout(timer);
        }
    }, [message]);

    // Physical keyboard support
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (gameStatus !== 'playing') return;

            if (e.key === 'Enter') {
                onEnter();
            } else if (e.key === 'Backspace') {
                onBackspace();
            } else if (/^[a-zA-Z]$/.test(e.key)) {
                onChar(e.key.toUpperCase());
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [gameStatus, currentGuess, completedGuesses]);

    const onChar = (char: string) => {
        if (gameStatus !== 'playing') return;
        if (currentGuess.length < 5) {
            setCurrentGuess(prev => prev + char);
        }
    };

    const onBackspace = () => {
        if (gameStatus !== 'playing') return;
        setCurrentGuess(prev => prev.slice(0, -1));
    };

    const onEnter = async () => {
        if (gameStatus !== 'playing') return;
        if (currentGuess.length !== 5) {
            setMessage('Not enough letters');
            return;
        }

        if (!wordData?.wordId) {
            setMessage('Loading game...');
            return;
        }

        submitMutation.mutate({ guess: currentGuess, wordId: wordData.wordId });
    };

    if (isLoading) return <Container><StatusMessage>Loading...</StatusMessage></Container>;

    return (
        <Container>
            <StatusMessage>{message}</StatusMessage>
            <Board
                completedGuesses={completedGuesses}
                currentGuess={currentGuess}
                maxGuesses={6}
            />
            <Keyboard
                onChar={onChar}
                onEnter={onEnter}
                onBackspace={onBackspace}
                keyStates={keyStates}
            />
        </Container>
    );
}
