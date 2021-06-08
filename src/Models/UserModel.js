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
    tipo:{
        type:String,
        required:true
    }
})

UserSchema.pre('save', async function(next){
    const hash = await bcrypt.hash(this.password,10)
    this.password = hash

    next()
})
const User = mongoose.model('User', UserSchema);

module.exports = User;