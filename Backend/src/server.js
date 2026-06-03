import express from 'express';
import { ENV } from './lib/env.js';
import { connectDB } from './lib/db.js';
import cors from 'cors';
import {serve} from 'inngest/express'
import { inngest, functions } from "./lib/inngest.js";
// import {protectRoute} from './middleware/protectRoute.js';
import chatRoutes from './routes/chatRoutes.js';

// import sessionRoutes from './routes/sessionRoutes.js';
import {clerkMiddleware} from '@clerk/express'
const app = express(); 

console.log(ENV.PORT)

app.use(express.json());
app.use(cors({ origin: ENV.CLIENT_URL ,credentials: true }));
app.use(clerkMiddleware());
// console.log(process.env.STREAM_API_KEY);
// console.log(process.env.STREAM_API_SECRET);

// app.get("/", (req, res) => {
//   res.send("Backend working");
// });


app.use("/api/inngest", serve({ client: inngest, functions }));
app.use("/api/chat", chatRoutes);
// app.use("/api/sessions", sessionRoutes);

app.get("/health", (req, res) => {
  res.status(200).json({ msg: "api is up and running" });
});



const startServer = async () => {
  try {
    await connectDB();
    app.listen(ENV.PORT, () => console.log("Server is running on port:", ENV.PORT));
  } catch (error) {
    console.error("💥 Error starting the server", error);
  }
};

startServer();


// app.listen(ENV.PORT, () => {
//     console.log(`Server is running on port ${ENV.PORT}`);
//     console.log("About to call connectDB");
//     connectDB();
// });


