import Express, { json, urlencoded } from "express";
import dotenv from "dotenv";
import router from "./routes";
import cookieParser from "cookie-parser";


const server = Express();
dotenv.config();


server.use(Express.static("../front-end/dist"), cookieParser(), json(),urlencoded({extended:true}),router);



server.listen(3000,()=>{
   console.log(process.env);
   console.log("port: ",process.env.PORT)
   console.log("listening")
})