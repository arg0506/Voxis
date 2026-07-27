<div align="center">

# 🗳️ Voxis

### Privacy-Preserving Zero-Knowledge Voting Platform on Midnight

Secure • Anonymous • Verifiable • Decentralized


[![Midnight](https://img.shields.io/badge/Built%20on-Midnight-4F46E5?style=for-the-badge)](#)
[![Compact](https://img.shields.io/badge/Compact-ZK%20Contracts-0EA5E9?style=for-the-badge)](#)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)](#)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript)](#)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4-38BDF8?style=for-the-badge&logo=tailwindcss)](#)
[![License](https://img.shields.io/badge/License-MIT-success?style=for-the-badge)](#license)

---
# 📸 Application Screenshots

> **Current MVP (Minimum Viable Product)**

### 🏠 Landing Page

<p align="center">
<img src=".src/assets/images/landingpage.png" width="100%">
</p>

A modern landing page introducing Voxis, its privacy-first governance model, and Midnight-powered zero-knowledge voting.

---


### Zero-Knowledge Governance for the Future of Web3

*A decentralized voting platform where ballots remain private while election results remain publicly verifiable.*

</div>

---

# 📖 Overview

**Voxis** is a next-generation governance platform built on the **Midnight Network** using **Compact Zero-Knowledge Smart Contracts**.

Traditional blockchain voting systems expose voter identities, wallet addresses, or voting choices on-chain. Voxis eliminates this problem by leveraging Midnight's privacy-preserving architecture.

Each vote is validated through **Zero-Knowledge Proofs** generated locally by the client. The blockchain only verifies the proof and updates the public tally—never revealing the actual vote or voter identity.

---

# ✨ Features

## 🔐 Private Voting

- Anonymous ballot casting
- Zero-Knowledge proof verification
- Wallet identity never linked to vote
- Client-side witness execution

---

## 🛡 Double Vote Prevention

Each voter generates a unique cryptographic **Nullifier**.

✔ Vote once

❌ Vote twice

The blockchain verifies uniqueness without revealing who voted.

---

## 📊 Transparent Public Results

Public ledger stores only:

- Yes Votes
- No Votes
- Abstain Votes

No private information is disclosed.

---

## 📈 Live Analytics Dashboard

Interactive charts including

- Vote Distribution
- Participation Rate
- Proposal Status
- Ledger Verification
- Real-time Updates

---

## 🧠 Proposal Management

- Create Proposal
- Search Proposal
- Filter by Status
- Voting Deadline
- Active / Closed Governance

---

## 🎨 Premium User Experience

- Responsive Design
- Glassmorphism UI
- Full Screen Navigation
- Command Palette
- Dark Theme
- Smooth Motion Animations

---

# 🏗 Architecture

```
                    User

                      │

        Generate Witness Locally

                      │

             Create ZK Proof

                      │

                      ▼

          Midnight Compact Contract

                      │

          Verify Cryptographic Proof

                      │

       disclose(yesVotes/noVotes)

                      │

                      ▼

           Public Midnight Ledger
```

---


# 🔒 Privacy Model

## Public State

| State | Visibility |
|----------|------------|
| Proposal ID | Public |
| Proposal Title | Public |
| Vote Counters | Public |
| Nullifier Hash | Public |
| Proposal Status | Public |

---

## Private Witness State

| State | Visibility |
|----------|------------|
| Voter Secret | Private |
| Vote Choice | Private |
| Wallet Identity | Private |
| Witness Data | Private |

---

# ⚙ Technology Stack

## Smart Contracts

- Compact Language
- Midnight Network
- Zero-Knowledge Circuits

---

## Frontend

- React 19
- TypeScript
- Vite
- Tailwind CSS v4
- Motion
- Lucide Icons

---

## Visualization

- Recharts

---

## Blockchain

- Midnight Proof Server
- Compact Compiler
- Lace Wallet
- Midnight Wallet

---

# 📂 Project Structure

```
voxis/

├── contract/
│   ├── voting.compact
│   └── circuits/
│
├── frontend/
│   ├── src/
│   ├── components/
│   ├── pages/
│   ├── hooks/
│   ├── services/
│   └── styles/
│
├── public/
│
├── cli/
│
├── README.md
│
└── package.json

```
# 🚀 Deployment

| Service | URL | Status |
|---------|-----|--------|
| 🌐 Live Application | https://voxis-plum.vercel.app/ | ✅ Online |
| 📂 GitHub Repository | https://github.com/arg0506/Voxis | ✅ Public |
| 🔗 Smart Contract | Pending | 🚧 Deploying |
| 🌙 Midnight Network | Preprod | ✅ Active |


---

# 🚀 Getting Started

## Clone Repository

```bash
git clone https://github.com/arg0506/voxis.git

cd voxis
```

---

## Install Dependencies

```bash
npm install
```

---

## Start Development

```bash
npm run dev
```

---

## Build Project

```bash
npm run build
```

---

## Compile Compact Contract

```bash
npm run compact
```

---

## Run Midnight Proof Server

```bash
docker run \
-p 6300:6300 \
midnightnetwork/proof-server:latest \
midnight-proof-server
```

---

# 🌐 Deployment

| Environment | Status |
|-------------|--------|
| Frontend | Vercel |
| Smart Contract | Midnight Preprod |
| Proof Server | Local Docker |
| Wallet | Lace Midnight |

---

# 📸 Screenshots

## Architectural Flow

<p align="center">
<img src=".Voxis-main/src/assets/images/Screenshot 2026-07-27 144715.png" width="100%">
</p>

---

## Vote Casting

<p align="center">
<img src=".Voxis-main/src/assets/images/Screenshot 2026-07-27 143205.png" width="100%">
</p>

---


## Navigation
<p align="center">
<img src=".Voxis-main/src/assets/Screenshot 2026-07-27 144634.png" width="100%">
</p>


---

# 🔑 Environment Variables

```env
CONTRACT_ADDRESS=Pending

PROOF_SERVER=http://localhost:6300
```

---

# 🛣 Roadmap

### Phase 1

- Voting
- Proposal Creation
- Public Tallies

### Phase 2

- DAO Governance
- Treasury Voting
- Multi-signature Support

### Phase 3

- Mobile App
- Cross-chain Governance
- Identity Verification
- Anonymous Delegation

---

# 💡 Why Midnight?

Unlike traditional blockchains,

- Ethereum exposes transactions.
- Solana exposes wallet activity.
- Most DAOs reveal voting behavior.

Midnight enables **confidential smart contracts**, allowing developers to build applications where users can prove correctness without revealing sensitive data.

Voxis leverages these capabilities to create a governance platform that is simultaneously **private**, **transparent**, and **trustless**.

---

# 📜 License

This project is licensed under the **MIT License**.

---

<div align="center">

### Built with ❤️ using Midnight Network

**Privacy is a Fundamental Right—not a Feature.**

</div>
