import express from "express";
import { MidnightVotingService } from "./voting-service.js";

const app = express();
const port = process.env.API_PORT || 3001;
const service = new MidnightVotingService();

app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    service: "Midnight Voting DApp API",
    contractAddress: service.getContractAddress(),
    isDeployed: service.isDeployed(),
    metadata: service.getMetadata()
  });
});

app.get("/api/ledger", async (req, res) => {
  try {
    const state = await service.fetchLedgerState();
    res.json({
      proposalId: state.proposalId,
      proposalTitle: state.proposalTitle,
      yesVotes: state.yesVotes.toString(),
      noVotes: state.noVotes.toString(),
      abstainVotes: state.abstainVotes.toString(),
      totalVotesCast: state.totalVotesCast.toString(),
      nullifierCount: state.nullifiers.size,
      isOpen: state.isOpen
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/vote", async (req, res) => {
  try {
    const { choice, voterSecret, proposalId } = req.body;
    if (choice === undefined || !voterSecret || !proposalId) {
      return res.status(400).json({ error: "Missing required fields: choice, voterSecret, proposalId" });
    }
    const proof = await service.generateProofAndCastVote(Number(choice), voterSecret, proposalId);
    res.json({ success: true, proof });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export { service };

if (process.env.NODE_ENV !== "test" && process.env.START_API_SERVER === "true") {
  app.listen(port, () => {
    console.log(`Midnight Voting API running on port ${port}`);
  });
}
