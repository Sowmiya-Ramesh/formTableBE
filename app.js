// const http= require('http')
// const port = 3000

// const server = http.createServer(function(res,req){

// })

// server.listen(port, function(error){
//     if(error){
//         console.log('Something went wrong',error);
//     }
//     else{
//         console.log('Server is listening on port' + port);
//     }
// })

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const User= require('./models/User');
const bodyParser = require('body-parser');

require('dotenv/config');

//middlewares
app.use(cors());
app.use(bodyParser.json());

//get all the users 
app.get('/', async(req,res) =>{
    // res.send('helo there');
    try{
        const userList = await User.find();
        res.json(userList);
    }
    catch(err){
        res.json({message: err});
    }
})


//to post new user
app.post('/',async (req,res) => {
    // console.log(req.body);
    const user = new User({
        id:req.body.id,
        avatar:req.body.avatar,
        name:req.body.name,
mobile:req.body.mobile,
email:req.body.email,
jobtype:req.body.jobtype,
dob:req.body.dob,
pref_location:req.body.pref_location
    });
    try{
    const savedUser = await user.save();
        res.json(savedUser);
    }
    catch(err){
        res.json({message: err });
    }
})


//get user by id
app.get('/:userId',async(req,res)=>{
 try{  const userId= await User.findById(req.params.userId);
    res.json(userId);
}catch(err){
    res.json({message: err });
}
})

//delete user by id
app.delete('/:userId',async(req,res)=>{
    try{  const delUser= await User.remove({ id:req.params.userId});
       res.json(delUser);
   }catch(err){
       res.json({message: err });
   }
   })


   
//update user by id
app.patch('/:userId',async(req,res)=>{
    try{  const updateUser= await User.updateOne({ id:req.params.userId}, { $set: {
        id:req.body.id,
        avatar:req.body.avatar,
        name:req.body.name,
        mobile:req.body.mobile,
        email:req.body.email,
        jobtype:req.body.jobtype,
        dob:req.body.dob,
        pref_location:req.body.pref_location
    }});
       res.json(updateUser);
   }catch(err){
       res.json({message: err });
   }
   })


mongoose.connect(process.env.DB_CONNECTION,{ useNewUrlParser: true ,useUnifiedTopology: true},() =>{
    console.log('DB connected');
})
app.listen(5000);