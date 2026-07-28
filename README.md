# Voxis — Midnight Zero-Knowledge Voting DApp

A privacy-preserving, decentralized voting DApp built on the Midnight Network using Compact ZK smart contracts, private witness state, and transparent public ledger tallying.

---

## Contract Address

**Contract Address:** `Pending` (Deploying to Midnight Preprod Testnet)

| Network | Contract Address | Status |
|---------|------------------|--------|
| Preprod | `Pending` | Pending Deployment |

```env
CONTRACT_ADDRESS=Pending
```

---

## Live Vercel Link

🚀 **Live Application:** [https://voxis-zk-voting.vercel.app](https://voxis-zk-voting.vercel.app)

*(Alternatively: Deployable on Vercel with standard `npm run build` static/full-stack output)*

---

## Project Description

Voxis is a zero-knowledge governance platform designed for decentralized organizations, DAOs, and privacy-focused communities on the Midnight Network. By executing private witness code client-side, Voxis generates zk-SNARK cryptographic proofs that verify ballot validity and double-voting prevention without revealing voter identity or individual choices to the public ledger.

---

## Key Features

- **Zero-Knowledge Ballot Secrecy**: Vote choices are calculated inside private witness execution and never linked to voter addresses.
- **Nullifier Double-Voting Protection**: Cryptographic ZK proof ensures every voter casts at most one ballot per proposal without disclosing secret keys.
- **Transparent Public Tallying**: Atomic increment of public vote counters (`yesVotes`, `noVotes`, `abstainVotes`) using Compact's native `disclose()` language primitive.
- **Full-Screen Navigation Control**: Modern, responsive full-screen hamburger menu drawer providing access to all DApp modules, command search, and wallet controls.
- **Lace & Midnight Wallet Integration**: Connects seamlessly with Midnight testnet wallets and local proof server at `http://localhost:6300`.
- **Live Public Analytics & Charts**: Interactive Recharts breakdown of proportional vote distribution and real-time ledger verification status.
- **ZK Audit Trail & Nullifier Inspector**: Immutable event log displaying spent nullifiers, block timestamps, circuit parameters, and transaction hashes.
- **Interactive Proposal Management**: Creation, filtering, search, and real-time state tracking for active governance proposals.

---

## UI Screenshots

### 1. Proposal Dashboard & Voting Cards
![Proposal Dashboard UI](https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80)
*Interactive governance board with active voting cards, live status badges, and proposal filters.*

### 2. Client-Side ZK Proof Generation & Ballot Casting
![ZK Proof Engine UI](https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=1200&q=80)
*Step-by-step witness calculation, nullifier generation, and zero-knowledge proof compilation.*

### 3. Public Ledger Tally & Cryptographic Audit Log
![Tally Analytics UI](https://images.unsplash.com/photo-1543286386-713bdd548da4?auto=format&fit=crop&w=1200&q=80)
*Disclosed public vote tallies with interactive charts, spent nullifiers map, and block explorer verification.*

### 4. Full-Screen Hamburger Navigation Panel
![Full-Screen Menu UI](https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80)
*Unified full-screen modal navigation with command palette integration and wallet status hub.*

---

## Privacy Architecture

### Public On-Chain State
- `proposalId`: Unique identifier for the governance topic
- `proposalTitle`: Metadata title
- `yesVotes, noVotes, abstainVotes`: Aggregate public vote counters
- `nullifiers`: On-chain ledger map storing spent nullifier hashes
- `isOpen`: Boolean state controlling active voting sessions

### Private Client-Side State (Witness)
- `voterSecret`: High-entropy 32-byte secret key known only to voter
- `voterChoice`: Selected VoteChoice (`YES`, `NO`, `ABSTAIN`) prior to disclosure
- `Voter Wallet Identity`: Excluded from proof payload

---

## Tech Stack

- **Smart Contract Language**: Compact (`voting.compact` v0.20.0)
- **Proof Engine**: Midnight Local Proof Server (`midnightnetwork/proof-server:latest` on port `6300`)
- **Frontend Framework**: React 19, TypeScript, Vite
- **Styling & Motion**: Tailwind CSS v4, Lucide Icons, Motion
- **Data Visualization**: Recharts
- **Command Line Tools**: `voting-cli` (Node.js TypeScript CLI)

---

## Getting Started

### Prerequisites
- Node.js >= 18.0.0
- Docker (for local Midnight Proof Server container)

### Installation
```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

### Build & Compilation
```bash
# Build React application
npm run build

# Compile Compact ZK smart contract
npm run compact
```

---

## License

MIT License - feel free to use and modify for private governance on Midnight Network.
