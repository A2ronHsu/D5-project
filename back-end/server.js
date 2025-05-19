import Express from "express";
import dotenv from "dotenv";
import router from "./routes.js";
import { google } from "googleapis";

const auth = new google.auth.GoogleAuth({
   keyFile: './d5-project-460116-01b43c0675ac.json'
})


const server = Express();

dotenv.config();
server.use(router);


server.listen(process.env.PORT,()=>{
   console.log("listening")
})