const mongoose = require('mongoose')
mongoose.set('strictQuery',true);

mongoose.connect(`mongodb://127.0.0.1:27017/login&registaration`)
.then(()=>{
    console.log(`Connection successful`)
}).catch((e)=>{
    console.log(`Connection Lost.........`)
})
