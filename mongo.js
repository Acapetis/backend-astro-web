const mongoose=require("mongoose")
const bcrypt = require('bcrypt')

mongoose.connect("mongodb+srv://admin:1234@cluster0.v2ntp09.mongodb.net/?retryWrites=true&w=majority")
.then(()=>{
    console.log("mongodb connected");
})
.catch(()=>{
    console.log('failed');
})


const UserSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

UserSchema.pre('save', function(next) {
    const user = this;
    bcrypt.hash(user.password, 10).then(hash => {
        user.password = hash
        next()
    }).catch(err => {
        console.error(err)
    })
})

const User = mongoose.model("User",UserSchema)

module.exports = User