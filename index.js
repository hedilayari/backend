var bodyParser = require('body-parser')
const express = require('express');
const app=express()
const mongoose = require('mongoose');
const UserRouter=require('./routers/userrouter')
const IotRouter=require('./routers/iotrouter')
const cors = require("cors");
const port=3000;
let {PythonShell} = require('python-shell')



// create application/x-www-form-urlencoded parser
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
// passport
//app.use(passport.initialize());
//app.use(passport.session());
/*app.use(session({
  secret: 'hadil',
  resave: false,
  saveUninitialized: true
}));*/
//middleware
app.use(
    cors({
      origin: "*",
      methods: ["GET", "POST", "PATCH", "DELETE"],
    })
  );
app.use("/user",UserRouter);
app.use("/iot",IotRouter);
app.get('/',(req,res)=>{
   res.send('welcome back')
})
app.listen(port,()=>{
    console.log(`port:${port}`)
})
mongoose.connect(
'mongodb+srv://work:work@cluster0.sbwnosv.mongodb.net/?retryWrites=true&w=majority'
).then(()=>{
    console.log("mongodb a été bien connecté")
})
.catch(err=>{
    console.log("erreur avec mongodb",err);
});
// Exécute le script Python

PythonShell.run('script.py', null).then(messages=>{
  console.log('finished');
});