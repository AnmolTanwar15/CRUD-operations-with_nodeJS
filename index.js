// const 
import express from 'express';
import mongoose from "mongoose"; 
import cors from "cors"; 
import http from 'http';
import { create } from 'domain';
const app = express();
// const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/test').then(()=>{console.log("Connected Successfully")}).catch((e)=>{console.log(e)});

const userSchema = mongoose.Schema({
    fName:{
        type:String
    },
    lName:{
        type:String
    },
    email:{
        type:String
    },
    mob:{
        type:Number
    },
    salary:{
        type:String
    },
})

const userModel = mongoose.model('user',userSchema);

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors());
app.post('/add_user',async(req,res)=>{
    try{
        console.log("add user");
        await userModel.create(req.body)
        res.status(200).send(
        {
            status:true,
            message:"User Added Successfully",
            data:req.body
        });
    }catch(err){
        console.log(err);
    }
});

app.get('/get_user',async(req,res)=>{
    try{
        console.log("get user");
        let data = await userModel.find();
        res.status(200).send({
            status:true,
            message:"All user",
            data:data
        });
    }catch(err){
        console.log(err)
    }
});

app.delete('/delete_user/:id',async(req,res)=>{
    try{
        console.log("User deleted");
        await userModel.deleteOne({_id:req.params.id});
        // let data = await userModel.find();
        res.status(200).send({
            status:true,
            message:"User deleted Successfully",
            // data:data
        });
    }catch(err){
        console.log(err)
    }
});

app.put('/update_user',async(req,res)=>{
    try{
        console.log("User deleted");
        let data = await userModel.updateOne({_id:req.body.id},req.body);
        res.status(200).send({
            status:true,
            message:"User Updated Successfully",
            data:data
        });
    }catch(err){
        console.log(err)
    }
});

app.listen(4100,()=> console.log('listining to server at port 4100'))

