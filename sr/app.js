const express = require('express');
const app =express();
const path =  require('path');
const hbs = require('hbs')
const bcrypt = require('bcryptjs');
app.use(express.static('.'));
require(`./db/conn`);
const Register = require('../sr/models/registers');


const port = process.env.PORT || 3000;

app.use(express.json())
app.use(express.urlencoded({extended:false}))


 const static_path = path.join(__dirname,'../public')

 app.use(express.static(static_path));

const templates_path = path.join(__dirname,"../templates/views")
const partial_path = path.join(__dirname,'../templates/partials')

app.set("view engine","hbs")
app.set("views",templates_path)
hbs.registerPartials(partial_path)

app.get('/home' ,(req,res)=>{
res.render("home")

})
app.get("/register",(req,res)=>{
    res.render("register")

})

app.get("/login",(req,res)=>{
    res.render("login.hbs")
})


app.post("/register",async (req,res)=>{
    try{
const password = req.body.password
const cnpassword = req.body.confirm_password

if(password === cnpassword){

    const registerEmploye = new Register(
        {
name : req.body.name,
email : req.body.email,
password:password,
confirm_password : cnpassword
    })

    ///password hashing

    const registerd = await registerEmploye.save();
     res.status(201).render("home.hbs")
    console.log(registerd)


}else{
    res.send (`password not matching`)
}

    }catch(err){
console.log(err)
    }
})

//Login post


app.post("/login",async(req,res)=>{
    try{

        const email = req.body.email;
        const password = req.body.password;
        // console.log(`${username} and password is ${password}`)

         const useremail = await Register.findOne({email:email});
        //  res.send(useremail.password)

        const ismatch = bcrypt.compare(password,useremail.password)
         if(ismatch){
            res.status(201).render('home.hbs')
         }
         else{
            res.status(401).send(`Invalid password details`)
         }

    }
    catch(error){
        res.send(`invalislogin details`)
    }
})


app.get("/profile",async(req,res)=>{



    res.render("profile")
})
app.listen(port,()=>{
    console.log(`Connection Running on this ${port} Number.....`)
})