'use client';

import styled from 'styled-components';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Link from 'next/link';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@/hooks/useAuth';
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { parseEther } from 'viem';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '@/lib/contract';
import { useEffect } from 'react';
import { toast } from 'sonner';

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.25rem 2rem;
  background-color: #0f172a; // Slate-900
  color: white;
  border-bottom: 1px solid #1e293b; // Slate-800
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: 800;
  text-decoration: none;
  background: linear-gradient(to right, #4ade80, #22d3ee);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Links = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
`;

const NavLink = styled(Link)`
  color: #94a3b8; // Slate-400
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s ease;
  
  &:hover {
    color: #e2e8f0; // Slate-200
  }
`;

const ClaimButton = styled.button<{ $disabled?: boolean }>`
  background: ${props => props.$disabled ? '#334155' : 'linear-gradient(135deg, #4ade80, #22d3ee)'};
  color: ${props => props.$disabled ? '#94a3b8' : '#0f172a'};
  border: none;
  border-radius: 20px;
  padding: 0.5rem 1rem;
  font-weight: bold;
  cursor: ${props => props.$disabled ? 'not-allowed' : 'pointer'};
  font-size: 0.9rem;
  transition: all 0.2s;

  &:hover {
      transform: ${props => props.$disabled ? 'none' : 'scale(1.05)'};
  }
`;

export default function Navbar() {
  const { address, isConnected } = useAuth();
  const queryClient = useQueryClient();

  const { data: claimStatus, isLoading } = useQuery({
    queryKey: ['claim-status', address],
    queryFn: async () => {
      if (!address) return null;
      const res = await fetch(`/api/claim?address=${address}`);
      return res.json();
    },
    enabled: !!address,
    refetchInterval: 60000, // Check every minute
  });

  // Wagmi hooks for contract interaction
  const { data: hash, isPending, writeContract } = useWriteContract();

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  // API mutation to update backend AFTER successful on-chain transaction
  const claimMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch('/api/claim', {
        method: 'POST',
        body: JSON.stringify({ address }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['claim-status'] });
      toast.success('Reward claimed! 100 Tokens minted to your wallet 🎉');
    },
    onError: (err) => {
      toast.error('Claim failed: ' + err.message);
    }
  });

  // Effect to trigger backend update when transaction is confirmed
  useEffect(() => {
    if (isSuccess) {
      claimMutation.mutate();
    }
  }, [isSuccess]);

  const handleClaim = () => {
    if (!address) return;
    writeContract({
      address: CONTRACT_ADDRESS,
      abi: CONTRACT_ABI,
      functionName: 'mint',
      args: [address, parseEther('100')], // Mint 100 tokens
    });
  };

  const getButtonText = () => {
    if (!claimStatus) return 'Claim';
    if (claimStatus.eligible) return 'Daily Claim 🎁';

    const next = new Date(claimStatus.nextEligibleAt);
    const now = new Date();
    const diff = next.getTime() - now.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    return `${hours}h ${mins}m`;
  };

  return (
    <Nav>
      <Logo href="/">Wordle AI</Logo>
      <Links>
        {/* <NavLink href="/history">History</NavLink> */}
        <NavLink href="https://cloud.google.com/application/web3/faucet/story/aeneid" target="_blank">Faucet</NavLink>
        <NavLink
          href={isConnected && address ? `https://aeneid.storyscan.io/address/${address}?tab=index` : '#'}
          target={isConnected ? "_blank" : undefined}
        >
          Explorer
        </NavLink>

        {isConnected && (
          <ClaimButton
            onClick={() => handleClaim()}
            disabled={!claimStatus?.eligible || isPending || isConfirming}
            $disabled={!claimStatus?.eligible}
          >
            {isPending || isConfirming ? 'Minting...' : getButtonText()}
          </ClaimButton>
        )}

        <ConnectButton showBalance={false} />
      </Links>
    </Nav>
  );
}
