const user=require("../models/usermodel")
const bcrypt=require('bcrypt')
var jwt = require('jsonwebtoken');

const findalluser=(req,res)=>{
    try{user.find({}).then((result)=>{
        res.send(result)
    })}
    catch(err){
     console.log(err)
    }
    
}
const adduser= async(req,res)=>{
    try{
    let newuser=new user({
        name:req.body.name,
        lastname:req.body.lastname,
        email:req.body.email,
        password:req.body.password,
        })
        await newuser.save()
    res.status(201).json({message:'user added succesufully'})
    }
    catch (err){
        console.log(err)
        res.status(400).json({message:'Something wrong with db'})
    }
    
}
const finduserbyId=async(req,res)=>{
    let exituser
try {
   exituser= await user.findOne({id:req.params._id})
} catch (error) {
    res.status(400).json({message:'Something wrong with db'})
}
res.status(201).json({ success: true, message: "success", data: exituser })
}
const supprimer=async(req,res)=>{
    try {
        await user.findOneAndDelete({id:req.params._id})
    } catch (error) {
        res.status(400).json({message:'Something wrong with db'})
    }
    res.status(201).json({message:'user Deleted succesufully'})
    }
const modifier=async(req,res)=>{
    let exituser
        try {
            exituser= await user.findOneAndUpdate({id:req.params._id},{email:req.body.email,password:req.body.password
                ,lastname:req.body.lastname,name:req.body.name,image:req.body.image}  )
        } catch (error) {
            res.status(400).json({ success: false, message: "something went wrong ", data: error })
        }
        res.status(201).json({message:'user updated succesufully',data:exituser})
        }
//##########Authentifications################
const Login =async(req,res)=>{
    // Get user credentials from the request body
    const { email, password } = req.body;
  
    // Verify user credentials
    const User = await user.findOne({ email });
  
    if (!User) {
      return res.status(203).json({ message: ' Authentication failed' });
    }
  
    const isPasswordValid = await bcrypt.compare(password, User.password);
  
    if (!isPasswordValid) {
      return res.status(203).json({ message: ' Authentication failed' });
    }
  
    // Generate JWT token
    const token = jwt.sign({ id: User._id }, 'your-secret-key', { expiresIn: '2h' });
  
    // Send JWT token to client
    res.json({ token });
  };
const Profile=(req,res)=>{
res.json({user:req.user})
}

const Register=async(req,res)=>{
   let existinguser
    try {
        const hashedPwd = await bcrypt.hash(req.body.password, 12);
        existinguser= await user.findOne({email:req.body.email,});
        if(!existinguser){
       existinguser= await user.create({
            name:req.body.name,
            lastname:req.body.lastname,
            email:req.body.email,
            password:hashedPwd,
          });
          return res.status(200).json({success:true ,message:" User created",user:existinguser})
        }
        return res.status(200).json({success:false ,message:" Email address already exists"})
         
        
    } catch (error) {
        res.status(404).json({success:false,message:"something went wrong with db"+error})
    }
    
}
exports.Register=Register
exports.Profile=Profile
exports.finduserbyId=finduserbyId
exports.findalluser=findalluser
exports.adduser=adduser
exports.supprimer=supprimer
exports.modifier=modifier
exports.Login=Login