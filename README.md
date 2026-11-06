<div align="center">

# ⚡ SolPulse
### **The Micro-Bounty & Proof-of-Skill Platform on Solana**

*We help builders instantly verify skills and judges instantly reward talent at the speed of Solana.*

### 🌐 **Live Production Demo:** [https://solpulse-rs.vercel.app/](https://solpulse-rs.vercel.app/)

[![Live Demo](https://img.shields.io/badge/Live_Demo-solpulse--rs.vercel.app-14F195?style=for-the-badge&logo=vercel&logoColor=black)](https://solpulse-rs.vercel.app/)
[![Solana Devnet](https://img.shields.io/badge/Solana-Devnet-9945FF?style=for-the-badge&logo=solana&logoColor=white)](https://explorer.solana.com/?cluster=devnet)
[![React 19](https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

</div>

---

## 🚨 The Problem: Hackathons & Bounties are Broken for Both Sides

| Persona | Pain Point | Impact |
| :--- | :--- | :--- |
| **👨‍💻 For Developers** *(The Waiting Game)* | Work is completed over the weekend, but payouts take weeks to process through manual Web2 financial rails. | Zero verifiable, on-chain proof of the specific technical skills demonstrated. |
| **⚖️ For Judges** *(The Admin Nightmare)* | Evaluating 100+ projects requires managing disjointed spreadsheets and executing manual wallet transfers one by one. | High friction in verifying actual code contributions versus team claims. |
| **🔗 The Root Cause** | GitHub, Discord, and Crypto Wallets do not talk to each other seamlessly. | **The verification layer is completely disconnected from the settlement layer.** |

---

## 💡 The Solution: SolPulse Protocol

**SolPulse** ([https://solpulse-rs.vercel.app/](https://solpulse-rs.vercel.app/)) binds **Task Verification** directly with **Instant On-Chain Payouts** and **Soulbound Reputation** in one unified Solana protocol:

- **For Developers (`Devs`)**: `Build` ➔ `Submit GitHub PR` ➔ `Earn Instant SOL & SPL Proof-of-Skill Tokens`
- **For Hackathon Judges (`Judges`)**: `Review PR` ➔ `1-Click Auto-Confirm Approve` ➔ `Programmatic On-Chain Distribution`

> *"SolPulse doesn’t just fund builders; it builds on-chain resumes at the speed of Solana."*

---

## 🚀 The 4-Step Prototype Journey

1. **Step 1: Authenticate**
   - Developers & Judges connect via **Phantom Wallet** (`window.solana`) or our **⚡ Quick Judge Demo Wallet** (instant in-browser `@solana/web3.js` `Keypair.generate()` pre-funded with Devnet SOL for zero-friction evaluation).
2. **Step 2: Submit Proof-of-Skill**
   - Developer selects a smart contract micro-bounty and submits a verifiable GitHub PR / repository URL and technical execution notes.
3. **Step 3: 1-Click Judge Approval (`useAutoConfirm`)**
   - Judges review submissions in the **Judge Portal** and utilize the **1-Click Auto-Confirm** session mode to rapidly approve individual or batch payouts (`50+ TXs in a row`) without repetitive signing pop-ups—saving **~3 minutes per project evaluation**.
4. **Step 4: Instant Settlement & SPL Token Minting**
   - `@solana/web3.js` triggers an atomic Devnet transaction routed via low-latency RPC nodes. The builder immediately receives **SOL** + a customized non-transferable **SPL Proof-of-Skill Token (`Token-2022`)** stamped into their **Builder Passport**.

---

## 📊 Performance & Friction Matrix

| Metric | Traditional Platforms | ⚡ SolPulse Protocol |
| :--- | :--- | :--- |
| **Payout Speed** | Weeks *(manual bank/Web2 rails)* | ✅ **Sub-second via Solana (~0.48s)** |
| **Judge Friction** | Manual TX signing per team | ✅ **1-Click Auto-Confirm Wallet** |
| **Reputation** | Off-chain PDF resumes | ✅ **Immutable SPL Token Minting** |
| **Architecture** | Siloed Web2 Databases | ✅ **Solana-Native Program & Ledger** |

---

## 🏗️ 3-Tier Technical Architecture

```text
┌─────────────────────────────────────────────────────────────────────────┐
│ Tier 1: Frontend & UI (The Presentation Layer)                          │
│ • React 19 + Vite + TypeScript + Tailwind CSS v4                        │
│ • Web3 UI Blocks, Recharts Telemetry, Canvas-Confetti, Glassmorphism    │
└───────────────────────────────────┬─────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│ Tier 2: Wallet & Authentication (The Interaction Layer)                 │
│ • Phantom Wallet Provider Detection + Instant In-Browser Demo Keypair   │
│ • 1-Click Judge Auto-Confirm Hook for Frictionless Batch Approvals      │
└───────────────────────────────────┬─────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│ Tier 3: Blockchain & Infrastructure (The Settlement Layer)              │
│ • @solana/web3.js Atomic Transactions & Devnet Faucet Airdrops          │
│ • Chainstack Global RPC Nodes & Token-2022 Soulbound Proof Attestations │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## ✨ Key Features Included in This Repo

- **⚡ Instant Judge Demo Wallet**: Judges without a browser wallet extension can click **Quick Demo Wallet** to generate a real in-browser Solana `Keypair`, request Devnet SOL airdrops (`+1 SOL`), and sign transactions immediately.
- **🛒 Micro-Bounty Marketplace**: Pre-loaded with 6 realistic Solana engineering bounties (*Token-2022 Transfer Hook Audit*, *Solana Blinks & Actions*, *Anchor Escrow Smart Contract*, *Chainstack Global RPC Failover*, *1-Click Judge Auto-Confirm Hook*, and *Soulbound SPL Token Minting*). Includes search, category tabs, difficulty filters, and a **Post New Bounty** modal.
- **⚖️ 1-Click Judge Portal**: Dedicated evaluation dashboard with **Auto-Confirm toggle**, single-click approval, **1-Click Batch Approve All**, and live administrative time-saved telemetry.
- **🪪 On-Chain Builder Passport**: Dynamic holographic builder identity card displaying XP rank progression (*Apprentice* ➔ *Genesis Vanguard*), verified skill tiers, **Minted SPL Proof-of-Skill Tokens**, and a **Cryptographic Proof Ledger** with direct links to **Solana Explorer (Devnet)**.
- **📈 Ecosystem Analytics**: Live 7-day SOL volume `AreaChart` and domain distribution `BarChart` powered by `Recharts`.

---

## 🛠️ Getting Started

### 🌐 Live Deployment
Test the live production deployment directly at:
👉 **[https://solpulse-rs.vercel.app/](https://solpulse-rs.vercel.app/)**

### 💻 Local Development

#### Prerequisites
- **Node.js** `>= 18.x` (or **Bun** `>= 1.x`)
- Optional: [Phantom Wallet Browser Extension](https://phantom.app/) set to **Solana Devnet**

#### 1. Clone & Install Dependencies
```bash
git clone <your-repo-url>
cd solpulse
npm install
```

#### 2. Start the Development Server
```bash
npm run dev
```
Open **`http://localhost:3000`** in your browser (or visit **[https://solpulse-rs.vercel.app/](https://solpulse-rs.vercel.app/)** for the live hosted version).

#### 3. Run Unit Tests & Type Check
```bash
# Run core logic & Solana utility unit tests
npx tsx --test src/utils/bountyLogic.test.ts

# Run TypeScript compiler verification
npm run lint

# Build production bundle
npm run build
```

---

## 📂 Project Structure

```text
├── public/
│   └── assets/aistudio/SolPulse_Pitch_Deck_ee1aef17.pdf  # Official Pitch Deck PDF
├── src/
│   ├── assets/images/            # High-res 3D orb, builder avatar & badge assets
│   ├── components/
│   │   ├── Navbar.tsx            # Top navigation bar + Wallet & Airdrop controls
│   │   ├── Hero.tsx              # Hero banner + 4-column live KPI strip
│   │   ├── Marketplace.tsx       # Filterable micro-bounty grid
│   │   ├── JudgePortal.tsx       # 1-Click Judge approval & batch payout dashboard
│   │   ├── BuilderPassportView.tsx # Holographic passport, SPL tokens & TX ledger
│   │   ├── AnalyticsView.tsx     # Recharts 7-day SOL volume & category telemetry
│   │   ├── SubmitProofModal.tsx  # On-chain proof submission & confetti modal
│   │   ├── BountyDetailModal.tsx # Full technical specs & requirements modal
│   │   ├── CreateBountyModal.tsx # Publish new micro-bounty modal
│   │   └── Toast.tsx             # Sleek toast alerts with Solana Explorer links
│   ├── types/
│   │   └── index.ts              # TypeScript interfaces for Bounties, Proofs & SPL Tokens
│   ├── utils/
│   │   ├── solana.ts             # @solana/web3.js Devnet connection, keypair & TX helpers
│   │   ├── bountyLogic.ts        # Seed bounties, XP rank calculator & filters
│   │   └── bountyLogic.test.ts   # Automated unit test suite
│   ├── polyfill.ts               # Browser Buffer & globalThis polyfills for web3.js
│   ├── App.tsx                   # Root state orchestration
│   └── main.tsx                  # Application entry point
└── package.json
```

---

## 🗺️ Roadmap to Mainnet

- **Month 1 — Escrow Smart Contract Audit**: Mainnet deployment and comprehensive security audit of the Anchor Escrow Smart Contract.
- **Month 2 — GitHub Actions Automation**: Deep integration with GitHub Actions for automated, commit-based bounty validation.
- **Month 3 — Ecosystem Hackathon Pilots**: Pilot launch executing real-time payouts for 3 major Solana ecosystem hackathons.

---

<div align="center">
  <b>Built with 💜 & 💚 on Solana Devnet — Team SolPulse</b><br/>
  <a href="https://solpulse-rs.vercel.app/">https://solpulse-rs.vercel.app/</a>
</div>
