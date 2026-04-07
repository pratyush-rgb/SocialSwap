import express from "express";
import "dotenv/config";
import cors from "cors";
import { clerkMiddleware } from "@clerk/express";
import { serve } from "inngest/express";
import { inngest, functions } from "./ingest/index.js";
import { connectMongo } from "./Configs/mongodb.js";
import listingRouter from "./routes/listingroutes.js";
import chatRouter from "./routes/chatroutes.js";
import authRouter from "./routes/authroutes.js";

const app = express();
const hasClerkConfig =
  Boolean(process.env.CLERK_PUBLISHABLE_KEY) &&
  Boolean(process.env.CLERK_SECRET_KEY);

app.use(express.json());
app.use(cors());

if (hasClerkConfig) {
  app.use(clerkMiddleware());
} else {
  console.warn(
    "Clerk env vars are missing (CLERK_PUBLISHABLE_KEY, CLERK_SECRET_KEY). Authenticated routes will return 401 until configured."
  );
  app.use((req, res, next) => {
    req.auth = async () => ({
      userId: null,
      has: async () => false,
    });
    next();
  });
}

app.get("/", (req, res) => res.send("Server UP!!!"));

app.use("/api/inngest", serve({ client: inngest, functions }));

app.use("/api/auth", authRouter);
app.use("/api/listing", listingRouter);
app.use("/api/chat", chatRouter);

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await connectMongo();

    if (process.env.NODE_ENV !== "production") {
      app.listen(PORT, () => {
        console.log(`Server Running on port ${PORT}`);
      });
      return;
    }

    app.listen(PORT, () => {
      console.log(`Server Running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();

export default app;
