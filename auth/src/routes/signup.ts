import express, {Request,Response} from 'express';
import { body, validationResult } from 'express-validator';

import { RequestValidationError } from '../Errors/request-validation-error';
import { BadRequestError } from '../Errors/bad-request-error';

import { User } from '../models/User';
import { CustomError } from '../Errors/custom-error';

const router = express.Router();

router.post("/api/users/signup",[
  body('email')
    .isEmail()
    .withMessage('Email must be valid'),
  body('password')
    .trim()
    .isLength({min:4, max:20})
    .withMessage("Password must be between 4 and 20 characters")
],
async (req:Request,res:Response)=>{

  const errors = validationResult(req);
  if(!errors.isEmpty()){
    throw new RequestValidationError(errors.array());
  }
  const {email,password} = req.body;
  const existingUser = await User.findOne({email});
  if(existingUser){
    console.log("User Already Exists");
    throw new BadRequestError("Email is already in use");
    
  }else{
    const user =User.build({email,password});
    await user.save();
    return res.status(201).send(user);

  }
})

export {router as signupRouter};