'use client';

import styled from 'styled-components';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/hooks/useAuth';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

const Title = styled.h2`
  font-size: 2rem;
  margin-bottom: 2rem;
  color: white;
  text-align: center;
`;

const HistoryList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const HistoryItem = styled.div<{ $result: 'won' | 'lost' }>`
  background-color: #1e293b;
  padding: 1rem;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-left: 5px solid ${props => props.$result === 'won' ? '#538d4e' : '#3a3a3c'};
`;

const DateText = styled.div`
  color: #94a3b8;
  font-size: 0.9rem;
`;

const ScoreText = styled.div`
  font-weight: bold;
  color: white;
  font-size: 1.2rem;
`;

const NoHistory = styled.div`
  text-align: center;
  color: #64748b;
  margin-top: 2rem;
`;

export default function HistoryPage() {
    const { address, isConnected } = useAuth();

    const { data, isLoading } = useQuery({
        queryKey: ['history', address],
        queryFn: async () => {
            if (!address) return { history: [] };
            const res = await fetch(`/api/history?address=${address}`);
            return res.json();
        },
        enabled: !!address,
    });

    if (!isConnected) {
        return (
            <Container>
                <Title>My History</Title>
                <NoHistory>Please connect your wallet to view history.</NoHistory>
            </Container>
        );
    }

    if (isLoading) return <Container><Title>Loading...</Title></Container>;

    const history = data?.history || [];

    return (
        <Container>
            <Title>My History</Title>
            {history.length === 0 ? (
                <NoHistory>No games played yet. Go play!</NoHistory>
            ) : (
                <HistoryList>
                    {history.map((record: any, i: number) => (
                        <HistoryItem key={i} $result={record.result}>
                            <div>
                                <DateText>{new Date(record.timestamp).toLocaleString()}</DateText>
                                <div>{record.result.toUpperCase()}</div>
                            </div>
                            <ScoreText>{record.score} pts</ScoreText>
                        </HistoryItem>
                    ))}
                </HistoryList>
            )}
        </Container>
    );
}
