const mongoose =  require('../Config/bd')
const bcrypt = require('bcryptjs')

const UserSchema = new mongoose.Schema({
    nome:{
        type:String,
        required:true
    },
    cpf:{
        type:String,
        required:true,
        unique:true
    },
    senha:{
        type:String,
        required:true
    },
    admin:{
        type:Boolean,
        required:true
    }
})

UserSchema.pre('save', async function(next){
    const hash = await bcrypt.hash(this.senha,10)
    this.senha = hash

    return next();
})
const User = mongoose.model('User', UserSchema);

module.exports = User;