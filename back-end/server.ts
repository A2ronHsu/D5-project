import Express, { json, urlencoded } from "express";
import dotenv from "dotenv";
import router from "./routes";



const server = Express();



dotenv.config();
server.use(Express.static("public"), json(),urlencoded({extended:true}),router);



server.listen(3000,()=>{
   console.log(process.env.PORT)
   console.log("listening")
})