'use client';

import styled, { keyframes } from 'styled-components';
import Link from 'next/link';
import { motion } from 'framer-motion';

const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 80vh;
  text-align: center;
  padding: 0 1rem;
`;

const HeroTitle = styled.h1`
  font-size: 4rem;
  font-weight: 800;
  margin-bottom: 1rem;
  background: linear-gradient(to right, #4ade80, #22d3ee);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  
  @media (max-width: 600px) {
    font-size: 2.5rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.25rem;
  color: #94a3b8;
  max-width: 600px;
  margin-bottom: 3rem;
  line-height: 1.6;
`;

const CTAButton = styled(Link)`
  background: linear-gradient(135deg, #4ade80, #22d3ee);
  color: #0f172a;
  font-weight: bold;
  font-size: 1.25rem;
  padding: 1rem 3rem;
  border-radius: 9999px;
  text-decoration: none;
  transition: transform 0.2s, box-shadow 0.2s;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 20px rgba(34, 211, 238, 0.4);
  }
`;

const DemoContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 2rem;
`;

const DemoTile = styled(motion.div) <{ $color: string }>`
  width: 50px;
  height: 50px;
  background-color: ${props => props.$color};
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 1.5rem;
  color: white;
`;

export default function Home() {
  return (
    <Main>
      <DemoContainer>
        <DemoTile $color="#538d4e" animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 2, delay: 0 }}>W</DemoTile>
        <DemoTile $color="#b59f3b" animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 2, delay: 0.2 }}>O</DemoTile>
        <DemoTile $color="#3a3a3c" animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 2, delay: 0.4 }}>R</DemoTile>
        <DemoTile $color="#538d4e" animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 2, delay: 0.6 }}>D</DemoTile>
        <DemoTile $color="#b59f3b" animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 2, delay: 0.8 }}>L</DemoTile>
        <DemoTile $color="#3a3a3c" animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 2, delay: 1.0 }}>E</DemoTile>
      </DemoContainer>

      <HeroTitle>Wordle AI</HeroTitle>
      <HeroSubtitle>
        The classic word game, reimagined with unlimited AI-generated words and blockchain rewards.
        Connect your wallet to track history and earn daily.
      </HeroSubtitle>

      <CTAButton href="/game">Play Now</CTAButton>
    </Main>
  );
}
