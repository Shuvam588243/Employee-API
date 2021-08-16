require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const port = process.env.PORT || 3000;
app.use(express.json());
const ConnectDB = require('./connection');
const userModel = require('./models/user_model');
const uniqid = require('uniqid');


//Route : /user/new
//description : Add User
//parameter : body(newUser)
app.post('/users/new',async(req,res)=>
{
    try{
        const {newUser} = req.body;
    await userModel.create(newUser);
    res.json(
        {
            msg : "User Created Successfully",
            user : newUser,
        }
    )
    }
    catch(error)
    {
        res.status(500).json({
            error : error.message
        });
    }
});


//Route : /
//description : All Employee Details
//parameter : none
//method : GET
app.get('/', async(req,res)=>
{
   try{
    const user = await userModel.find();
    if(!user)
    {
        res.json({
            "msg" : "Empty"
        });
    }
    else
    {
        res.json(
            {
                total : user.length,
                user
            }
        )
    }
   }
    catch(error)
    {
        res.status(500).json({
            error : error.message
        });
    }
});


//Route : /users/:id
//description : User by id
//parameter : id
//method : GET
app.get('/users/user/:id', async(req,res)=>
{
    try{
        const {id} = req.params;
    
    const user = await userModel.findById(id)
    if(!user)
    {
        res.json({
            msg : "No Users Found"
        });
    }
    else
    {
        res.json(
            {
                user
            }
        )
    }
    }

    catch(error)
    {
        res.status(500).json({
            error : error.message
        });
    }
    
});

//Route : /users/:type
//description : User by type (Free/Premium/Pro)
//parameter : type
//method : GET
app.get('/users/type/:type', async(req,res)=>
{
    try{
        const {type} = req.params;
    const user = await userModel.find({type : type});
    if(!user)
    {
        res.json({
            msg : "No Users Found"
        });
    }
    else
    {
        res.json(
            {
                total : user.length,
                user
            }
        )
    }
    }
    catch(error)
    {
        res.status(500).json({
            error : error.message
        });
    }
});

//Route : /users/:location
//description : User by Address
//parameter : address
//method : GET
app.get('/users/location/:location', async(req,res)=>
{
    try{
        const {location} = req.params;
    const user = await userModel.find({address : location});
    if(!user)
    {
        res.json({
            msg : "No Users Found"
        });
    }
    else
    {
        res.json(
            {
                total : user.length,
                user
            }
        )
    }
    }
    catch(error)
    {
        res.status(500).json({
            error : error.message
        });
    }
});

//Route : /users/update/
//description : Update User
//parameter : id
//method : PUT
app.put('/users/update/:_id', async(req,res)=>
{
    try{
        const { _id } = req.params;
    const { userData } = req.body;
    
    const updateUser = await userModel.findByIdAndUpdate(_id,
        { $set:userData },
        {new : true}
    );   
    
    res.json({
        user : updateUser 
    })
    }
    catch(error)
    {
        res.status(500).json({
            error : error.message
        });
    }
});
//Route : /users/delete/
//description : Delete User
//parameter : id
//method : delete
app.delete('/users/delete/:_id', async(req,res)=>
{
    try{
        const { _id } = req.params;

    await userModel.findByIdAndDelete(_id);

    res.json({
        msg : 'User Deleted'
    });
    }
    catch(error)
    {
        res.status(500).json({
            error : error.message
        });
    }
});

app.listen(port,()=>
{
    ConnectDB()
    .then(()=> console.log(`Mongo Connection Successful
Server Running at port ${port}`))
    .catch((error)=>console.log(error));
});