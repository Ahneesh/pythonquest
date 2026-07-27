import express from "express";
const app = express();
app.use(express.json({ limit: "1mb" }));
app.post("/api/runner/execute", async (_req, res) => {
  res.status(501).json({status:"error",message:"Configure an isolated worker before enabling execution."});
});
app.listen(8787);
