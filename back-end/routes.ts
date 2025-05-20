import { Router } from "express";

const router = Router();

router.post("/", (req,res)=>{
   res.json({test:"test"})
})

export default router;