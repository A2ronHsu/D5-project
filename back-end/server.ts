import Express, { json, urlencoded } from "express";
import dotenv from "dotenv";
import router from "./routes";
import cookieParser from "cookie-parser";


const server = Express();
dotenv.config();


server.use((req, res, next) => {
  console.log(`➡️ Received ${req.method} request for URL: ${req.originalUrl}`);
  next(); // Call next() to pass the request on to the next handler
},Express.static("../front-end/dist"), cookieParser(), json(),urlencoded({extended:true}),router);



server.listen(3000,()=>{
   console.log(process.env.PORT)
   console.log("listening")
})