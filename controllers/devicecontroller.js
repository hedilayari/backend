const device=require("../models/devicemodel")
const bcrypt=require('bcrypt')
var jwt = require('jsonwebtoken');
const findalldevice=(req,res)=>{
    try{device.find({}).then((result)=>{
        res.send(result)
    })}
    catch(err){
     console.log(err)
    }
    
}
const adddevice= async(req,res)=>{
    try{
    let newdevice=new device({
        idd:req.body.id,
        name:req.body.name
        })
        await newdevice.save()
    res.status(201).json({message:'device added succesufully'})
    }
    catch (err){
        console.log(err)
        res.status(400).json({message:'Something wrong with db'})
    }
    
}
const finduserbyId=async(req,res)=>{
    let existdevice
try {
   existdevice= await device.findOne({id:req.params._id})
} catch (error) {
    res.status(400).json({message:'Something wrong with db'})
}
res.status(201).json({ success: true, message: "success", data: existdevice })
}
const supprimer=async(req,res)=>{
    try {
        await device.findOneAndDelete({id:req.params._id})
    } catch (error) {
        res.status(400).json({message:'Something wrong with db'})
    }
    res.status(201).json({message:'device Deleted succesufully'})
    }
const modifier=async(req,res)=>{
    let existdevice
        try {
            existdevice= await device.findOneAndUpdate({id:req.params._id}, {idd:req.body.id},
                {name:req.body.name} )
        } catch (error) {
            res.status(400).json({ success: false, message: "something went wrong ", data: error })
        }
        res.status(201).json({message:'device updated succesufully',data:existdevice})
        }

    


exports.finduserbyId=finduserbyId
exports.findalldevice=findalldevice
exports.adddevice=adddevice
exports.supprimer=supprimer
exports.modifier=modifier
