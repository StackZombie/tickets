import express, {Response,Request} from 'express';
const router = express.Router();

router.get("/api/users/singout",(req:Request,res:Response)=>{
  res.send("Hi there");
})

export {router as signoutRouter};