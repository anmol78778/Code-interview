import express from 'express';
import { ENV } from './lib/env.js';
import { connectDB } from './lib/db.js';
import cors from 'cors';
import {serve} from 'inngest/express'
import { inngest, functions } from "./lib/inngest.js";
const app = express(); 

console.log(ENV.PORT)

app.use(express.json());
app.use(cors({ origin: ENV.CLIENT_URL ,credentials: true }));

console.log(process.env.STREAM_API_KEY);
console.log(process.env.STREAM_API_SECRET);

app.get("/", (req, res) => {
  res.send("Backend working");
});
app.use("/api/inngest", serve({ client: inngest, functions }));


app.get('/health',(req,res)=>{
    res.status(200).json({message:'Server is healthy'})
})



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


