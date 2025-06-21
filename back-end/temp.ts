import { json } from "express";
import GoogleRepository from "./repositories/googlesheetRepository";
import authClient from "./schemas/authGoogle";
import fs from "fs";

const repo = new GoogleRepository(authClient());


const all = async () => {
   const temp = JSON.stringify((await repo.getAll()));
   fs.writeFile("./all.txt",temp,(err)=>console.log(err));

}

all();