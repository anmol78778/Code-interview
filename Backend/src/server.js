import express from 'express';
import { ENV } from './lib/env.js';
import { connectDB } from './lib/db.js';


const app = express(); 

console.log(ENV.PORT)



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


