# 🎮 Wordle AI
**Built on Story Protocol Aeneid Testnet**

**WRDL Token Contract:** `0x506B41359218BCac5B648b78a56cA315365487ec`

The classic word game reimagined with unlimited AI-generated words and blockchain rewards.  
Play daily → earn tokens → track your genius on-chain.

---

## ⚡ One-liner
Guess the AI-generated word in 6 tries → earn $WRDL tokens daily → on-chain history = permanent bragging rights.  
No ads. No paywalls. Just pure word-puzzle dopamine that pays you.

---

## 🚀 Why Wordle AI?

| Traditional Wordle | Wordle AI |
|-------------------|-----------|
| One word per day | **Unlimited AI-generated words** |
| Zero rewards | **Daily $WRDL token claims** |
| No history tracking | **Permanent on-chain game history** |
| Boring repetition | **Every game is unique (Gemini 2.0 Flash)** |
| Play alone | **Win rewards + compete globally** |
| Static experience | **Web3 wallet integration** |

---

## 🌟 Features That Make You Smarter (and Richer)

| Feature | Benefit | Web3 Magic |
|---------|---------|-----------|
| **AI Word Generator** | Fresh 5-letter words every game via Gemini 2.0 Flash | No repeats, infinite replayability |
| **Daily Token Claims** | Claim $WRDL tokens every 24h just for playing | Story Protocol testnet (mainnet soon) |
| **On-Chain History** | Every win permanently recorded to your wallet | Immutable proof of your word-solving prowess |
| **Gas-less Gameplay** | Play without transaction fees | Only claim rewards require wallet signature |
| **Real-Time Validation** | Instant feedback on correct/present/absent letters | Client-side + server validation |
| **Rainbow Kit Wallet** | Connect with MetaMask, Coinbase, WalletConnect & more | One-click authentication |
| **Toast Notifications** | Smooth Sonner toasts instead of ugly alerts | Premium UX with framer-motion animations |
| **Mobile First** | Perfect on iPhone, Android, and desktop | Responsive CSS with styled-components |
| **Dark Mode Ready** | Easy on the eyes, hard on the competition | Sleek gradient design system |

---

## 💸 Monetization & Rewards

### 1️⃣ **Daily Claim Rewards**
- Connect wallet → claim free $WRDL tokens every 24 hours
- Cooldown tracked on-chain with transparent eligibility

### 2️⃣ **Win Bonuses** *(Coming Soon)*
- Solve in 1-2 guesses → bonus multiplier
- Win streaks = compounding rewards
- Leaderboard tournaments with prize pools

### 3️⃣ **NFT Badges** *(Coming Soon)*
- Mint achievement NFTs for milestones:
  - 🏆 First Win
  - 🔥 7-Day Streak
  - 🧠 100 Games Played
  - ⚡ Perfect Score (1 guess)

### 4️⃣ **Staking & Governance** *(Coming Soon)*
- Stake $WRDL tokens to vote on new features
- Earn yield from platform fees
- Shape the future of Wordle AI

---

## 🎮 How It Works (30s Flow)

1. **Connect Wallet** → RainbowKit popup (MetaMask, Coinbase, etc.)
2. **Start Game** → AI generates unique 5-letter word via Gemini 2.0 Flash
3. **Make Guesses** → Real-time color feedback:
   - 🟩 **Green** = Correct letter, correct position
   - 🟨 **Yellow** = Correct letter, wrong position  
   - ⬛ **Gray** = Letter not in word
4. **Win or Lose** → Game history saved on-chain
5. **Claim Tokens** → Daily $WRDL rewards sent to your wallet
6. **Repeat** → Unlimited games, unlimited fun

---

## 🧪 Tech Stack

- **Framework:** Next.js 16 (App Router)
- **AI:** Google Gemini 2.0 Flash for word generation
- **Blockchain:** Story Protocol Aeneid Testnet
- **Smart Contract:** ERC-20 $WRDL token with mint/claim functions
- **Wallet:** RainbowKit + Wagmi v3 + Viem v2
- **Styling:** Styled-components + Framer Motion
- **Notifications:** Sonner toast library
- **State Management:** React Query (TanStack Query)

---

## 🔧 Installation & Setup

### Prerequisites
- Node.js 18+ or Bun
- MetaMask or compatible Web3 wallet
- Story Protocol Aeneid testnet RPC

### 1️⃣ Clone & Install
```bash
git clone https://github.com/ranjeet-max902/wordle-ai.git
cd wordle-ai
bun install  # or npm install
```

### 2️⃣ Environment Setup
Create `.env.local` file:
```bash
NEXT_PUBLIC_CONTRACT_ADDRESS=0x506B41359218BCac5B648b78a56cA315365487ec
GEMINI_API_KEY=your_gemini_api_key_here
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id
```

Get your Gemini API key: https://aistudio.google.com/apikey  
Get WalletConnect Project ID: https://cloud.walletconnect.com

### 3️⃣ Run Development Server
```bash
bun dev  # or npm run dev
```
Open [http://localhost:3000](http://localhost:3000)

### 4️⃣ Add Story Aeneid Testnet to Wallet
- **Chain ID:** 11155111 (check Story docs for actual testnet ID)
- **RPC URL:** Get from [Story Protocol Docs](https://docs.story.foundation/)
- **Currency:** ETH (testnet)

---

## 🎯 Roadmap

- [x] AI word generation with Gemini
- [x] Web3 wallet integration
- [x] Daily token claim system
- [x] On-chain game history
- [x] Responsive UI with animations
- [ ] Win-based token rewards
- [ ] Achievement NFT minting
- [ ] Global leaderboard
- [ ] Multiplayer head-to-head mode
- [ ] $WRDL token staking & governance
- [ ] Story Protocol mainnet deployment
- [ ] Mobile app (iOS/Android)

---

## 🌐 Live Demo

🖥️ **Web:** https://wordle-ai-<your-deployment>.vercel.app  
📱 **PWA:** Add to home screen for native feel  
🌐 **Testnet:** Story Protocol Aeneid  
💰 **Contract:** [`0x506B41359218BCac5B648b78a56cA315365487ec`](https://explorer.story.foundation/address/0x506B41359218BCac5B648b78a56cA315365487ec)

---

## 🤝 Contributing

We welcome contributions! Here's how:

1. Fork the repo
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open Pull Request

---

## 📜 License

MIT License - see [LICENSE](LICENSE) file for details

---

## 🙏 Acknowledgments

- **Story Protocol** - For the programmable IP infrastructure
- **Google Gemini** - AI word generation
- **RainbowKit** - Beautiful wallet connection UX
- **Original Wordle** - Inspiration from Josh Wardle's genius

---

## 📞 Contact & Community

- **GitHub:** [ranjeet-max902/wordle-ai](https://github.com/ranjeet-max902/wordle-ai)
- **Twitter:** [@YourTwitter]
- **Discord:** [Join our server]

---

**Built with 💚 on Story Protocol**  
*Turn your word skills into on-chain flex*
