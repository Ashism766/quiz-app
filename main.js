import {config} from  'dotenv'
config()
import express  from 'express';
import mongoose from "mongoose";
import cors from "cors";
import Router from './app/routes/quizRoutes.js';
import Script from './app/utility/cornUpdate.js';
import Limiter from './app/utility/requestLimit.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());
app.use(Limiter);
app.use(Router);
app.use((req, res) => { res.status(404).json({ message: 'Route not found' }); });
app.use((err, req, res) => { 
  console.error('Error:', err);  
  res.status(500).json({ message: 'Internal Server Error' }); });



app.get("/", (req, res)=>{
    res.send({"It's working": "yes"})
})

const port = process.env.PORT || 3000;



const server = async () =>{
  await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, w: 'majority' })
    .then(() => {
      console.log('Connected to database');
    })
    .catch((error) => {
      console.error('Error connecting to database:', error);
    });



  app.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });
}

server();
