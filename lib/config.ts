import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { defineChain } from 'viem';
import {
    mainnet,
    polygon,
    optimism,
    arbitrum,
    base,
} from 'wagmi/chains';

// Story Aeneid Testnet - Custom Chain Definition
export const storyAeneidTestnet = defineChain({
    id: 1315,
    name: 'Story Aeneid Testnet',
    nativeCurrency: {
        name: 'IP',
        symbol: 'IP',
        decimals: 18,
    },
    rpcUrls: {
        default: {
            http: ['https://rpc.ankr.com/story_aeneid_testnet'],
        },
    },
    blockExplorers: {
        default: {
            name: 'Story Explorer',
            url: 'https://aeneid.storyscan.xyz',
        },
    },
    testnet: true,
});

export const config = getDefaultConfig({
    appName: 'Wordle AI',
    projectId: process.env.NEXT_PUBLIC_PROJECT_ID || 'YOUR_PROJECT_ID',
    // Story Aeneid Testnet is the primary chain
    chains: [storyAeneidTestnet, mainnet, polygon, optimism, arbitrum, base],
    ssr: true,
});

