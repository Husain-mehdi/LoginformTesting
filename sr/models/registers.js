const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const UserScehma = new mongoose.Schema({
    name :{
        type : String,
        require:true
    },
    email : {
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true
    }
    ,confirm_password:{

        type:String,
        require:true
    }
})

UserScehma.pre("save",async function(next){

    if(this.isModified("password")){

        
console.log(`the current password is ${this.password}`);
this.password = await bcrypt.hash(this.password, 10)
console.log(`the current password is ${this.password}`);

this.confirm_password = undefined;

    }
 next()
})




// Now we have to create the Collections

const Register = new mongoose.model("Register",UserScehma);



module.exports= Register;