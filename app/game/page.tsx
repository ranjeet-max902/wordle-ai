'use client';

import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Board } from '@/components/Game/Board';
import { Keyboard } from '@/components/Game/Keyboard';
import { TileState, GuessResult } from '@/components/Game/types';
import { useAuth } from '@/hooks/useAuth';

import { Modal } from '@/components/Modal';
import { ChartBarIcon } from '@heroicons/react/24/outline';

const PageLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const GameArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 600px;
`;

const SidePanel = styled.div`
  display: none;
  
  @media (min-width: 1300px) {
    display: flex;
    flex-direction: column;
    width: 320px;
    background: #1e293b;
    border-radius: 16px;
    padding: 1.5rem;
    border: 1px solid #334155;
    position: fixed;
    right: 2rem;
    top: 100px;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 1rem;
  min-height: calc(100vh - 80px);
`;

const GameHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 500px;
  margin-bottom: 2rem;
  padding: 0 1rem;
`;

const IconButton = styled.button`
  background: transparent;
  border: none;
  color: #94a3b8;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  transition: all 0.2s;
  display: block;

  @media (min-width: 1300px) {
    display: none;
  }

  &:hover {
    color: #f1f5f9;
    background: rgba(255, 255, 255, 0.1);
  }

  svg {
    width: 24px;
    height: 24px;
  }
`;

const StatusMessage = styled.div`
  text-align: center;
  margin-bottom: 1rem;
  color: #fff;
  font-size: 1.2rem;
  min-height: 1.5rem;
`;

const RevealWord = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: #4ade80;
  margin: 1rem 0;
  letter-spacing: 0.5em;
`;

const PlayAgainButton = styled.button`
  background: linear-gradient(135deg, #4ade80, #22d3ee);
  color: #0f172a;
  font-weight: bold;
  font-size: 1.1rem;
  padding: 0.75rem 2rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 1rem;
  width: 100%;
  text-transform: uppercase;
  transition: transform 0.2s;
  
  &:hover {
    transform: scale(1.02);
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  margin-bottom: 2rem;
  width: 100%;
`;

const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StatValue = styled.div`
  font-size: 1.8rem;
  font-weight: 700;
  color: #fff;
`;

const StatLabel = styled.div`
  font-size: 0.75rem;
  text-transform: uppercase;
  color: #94a3b8;
  margin-top: 0.25rem;
  text-align: center;
`;

const ModalActionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;
  gap: 1rem;
  border-top: 1px solid #334155;
  padding-top: 1.5rem;
  width: 100%;
`;

const HeaderTitle = styled.h1`
  font-size: 2rem;
  font-weight: 800;
  color: #fff;
  margin: 0;
  letter-spacing: -0.05em;
  font-family: 'Outfit', sans-serif;
`;

const SidePanelTitle = styled.h2`
  color: #fff;
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  text-align: center;
  text-transform: uppercase;
`;

interface GameStats {
    gamesPlayed: number;
    gamesWon: number;
    gamesLost: number;
    currentStreak: number;
    maxStreak: number;
}

const StatsDisplay = ({ stats, winRate, gameStatus, correctWord, playAgain }: {
    stats: GameStats;
    winRate: number;
    gameStatus: 'playing' | 'won' | 'lost';
    correctWord: string;
    playAgain: () => void;
}) => (
    <>
        <StatsGrid>
            <StatItem>
                <StatValue>{stats.gamesPlayed}</StatValue>
                <StatLabel>Played</StatLabel>
            </StatItem>
            <StatItem>
                <StatValue>{winRate}%</StatValue>
                <StatLabel>Win %</StatLabel>
            </StatItem>
            <StatItem>
                <StatValue>{stats.currentStreak}</StatValue>
                <StatLabel>Streak</StatLabel>
            </StatItem>
            <StatItem>
                <StatValue>{stats.maxStreak}</StatValue>
                <StatLabel>Max Streak</StatLabel>
            </StatItem>
        </StatsGrid>

        {gameStatus !== 'playing' && (
            <ModalActionContainer>
                {gameStatus === 'lost' && correctWord && (
                    <>
                        <h3 style={{ textTransform: 'uppercase', color: '#94a3b8', fontSize: '0.8rem' }}>The word was</h3>
                        <RevealWord>{correctWord}</RevealWord>
                    </>
                )}
                <PlayAgainButton onClick={playAgain}>
                    PLAY NEW GAME
                </PlayAgainButton>
            </ModalActionContainer>
        )}
    </>
);

export default function GamePage() {
    const { isConnected } = useAuth();
    const [currentGuess, setCurrentGuess] = useState('');
    const [completedGuesses, setCompletedGuesses] = useState<GuessResult[]>([]);
    const [gameStatus, setGameStatus] = useState<'playing' | 'won' | 'lost'>('playing');
    const [message, setMessage] = useState('');
    const [keyStates, setKeyStates] = useState<Record<string, TileState>>({});
    const [correctWord, setCorrectWord] = useState<string>('');
    const [isStatsOpen, setIsStatsOpen] = useState(false);
    const [stats, setStats] = useState<GameStats>({
        gamesPlayed: 0,
        gamesWon: 0,
        gamesLost: 0,
        currentStreak: 0,
        maxStreak: 0,
    });

    useEffect(() => {
        const savedStats = localStorage.getItem('wordleStats');
        if (savedStats) {
            setStats(JSON.parse(savedStats));
        }
    }, []);

    const { data: wordData, isLoading, refetch } = useQuery({
        queryKey: ['word-of-day'],
        queryFn: async () => {
            const res = await fetch('/api/word-of-day');
            return res.json();
        },
        refetchOnWindowFocus: false, // Prevent unwanted refetches
    });

    useEffect(() => {
        if (wordData?.wordId) {
            try {
                const word = Buffer.from(wordData.wordId, 'base64').toString('utf-8');
                setCorrectWord(word);
                localStorage.setItem('currentWordleAnswer', word);
                // Debugging: Log the AI word to console
                console.log('%c AI Suggested Word: ' + word, 'background: #22c55e; color: black; padding: 4px; border-radius: 4px;');
            } catch (e) {
                console.error('Failed to decode word');
            }
        }
    }, [wordData]);



    const submitMutation = useMutation({
        mutationFn: async ({ guess, wordId }: { guess: string, wordId: string }) => {
            const res = await fetch('/api/submit', {
                method: 'POST',
                body: JSON.stringify({ guess, wordId }),
            });
            const data = await res.json();
            if (data.error) throw new Error(data.error);
            return data.result as TileState[];
        },
        onSuccess: (pattern) => {
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

            const isWin = pattern.every((p: string) => p === 'correct');
            if (isWin) {
                setGameStatus('won');
                const score = Math.max(0, 1000 - (newCompleted.length - 1) * 100);
                setMessage(`You Won! 🎉 Score: ${score}`);
                updateStats(true);
                if (window.innerWidth < 1300) {
                    setTimeout(() => setIsStatsOpen(true), 1500);
                }
            } else if (newCompleted.length >= 6) {
                setGameStatus('lost');
                setMessage(`Game Over!`);
                updateStats(false);
                if (window.innerWidth < 1300) {
                    setTimeout(() => setIsStatsOpen(true), 1500);
                }
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

    const updateStats = (won: boolean) => {
        const newStats = { ...stats };
        newStats.gamesPlayed++;

        if (won) {
            newStats.gamesWon++;
            newStats.currentStreak++;
            newStats.maxStreak = Math.max(newStats.maxStreak, newStats.currentStreak);
        } else {
            newStats.gamesLost++;
            newStats.currentStreak = 0;
        }

        setStats(newStats);
        localStorage.setItem('wordleStats', JSON.stringify(newStats));
    };

    const playAgain = () => {
        setCurrentGuess('');
        setCompletedGuesses([]);
        setGameStatus('playing');
        setMessage('');
        setKeyStates({});
        // Clear correct word locally until new one is fetched
        setCorrectWord('');
        setIsStatsOpen(false);
        localStorage.removeItem('currentWordleAnswer');

        // Soft reset: Refetch new word from API
        refetch();
    };

    if (isLoading) return <Container><StatusMessage>Loading...</StatusMessage></Container>;

    const winRate = stats.gamesPlayed > 0 ? Math.round((stats.gamesWon / stats.gamesPlayed) * 100) : 0;

    return (
        <Container>
            <PageLayout>
                <GameArea>
                    <GameHeader>
                        <HeaderTitle style={{ textAlign: 'center', width: '100%' }}>WORDLE AI</HeaderTitle>
                        <IconButton onClick={() => setIsStatsOpen(true)} title="Statistics">
                            <ChartBarIcon />
                        </IconButton>
                    </GameHeader>

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
                </GameArea>

                <SidePanel>
                    <SidePanelTitle>Statistics</SidePanelTitle>
                    <StatsDisplay
                        stats={stats}
                        winRate={winRate}
                        gameStatus={gameStatus}
                        correctWord={correctWord}
                        playAgain={playAgain}
                    />
                </SidePanel>
            </PageLayout>

            <Modal isOpen={isStatsOpen} onClose={() => setIsStatsOpen(false)} title="STATISTICS">
                <StatsDisplay
                    stats={stats}
                    winRate={winRate}
                    gameStatus={gameStatus}
                    correctWord={correctWord}
                    playAgain={playAgain}
                />
            </Modal>
        </Container>
    );
}
