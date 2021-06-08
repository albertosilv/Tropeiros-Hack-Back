const mongoose =  require('../Config/bd')

const TokenSchema =  new mongoose.Schema({
    token:{
        type:String,
        required:true,
        unique:true
    }
})

const token = mongoose.model('Token',TokenSchema)

module.exports = token;