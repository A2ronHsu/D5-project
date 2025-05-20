import Express from "express";
import dotenv from "dotenv";
import router from "./routes";



const server = Express();

dotenv.config();
server.use(router);


server.listen(process.env.PORT,()=>{
   console.log("listening")
})