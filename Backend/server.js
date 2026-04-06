import express from "express";
import "dotenv/config";
import cors from "cors";
import { clerkMiddleware } from "@clerk/express";
import { serve } from "inngest/express";
import { inngest, functions } from "./ingest/index.js";
import listingRouter from "./routes/listingroutes.js";
import chatRouter from "./routes/chatroutes.js";

const app = express();

app.use(express.json());
app.use(cors());
app.use(clerkMiddleware());

app.get("/", (req, res) => res.send("Server UP!!!"));

app.use("/api/inngest", serve({ client: inngest, functions }));

app.use("/api/listing", listingRouter);
app.use("/api/chat", chatRouter);

const PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`Server Running on port ${PORT}`);
  });
}

export default app;
