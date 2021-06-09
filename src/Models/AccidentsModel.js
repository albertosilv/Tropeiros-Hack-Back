const mongoose = require('../Config/bd')

const AccidentsSchema = new mongoose.Schema({
    bairro: {
        type: String,
        required: true
    },
    rua: {
        type: String,
        required: true
    },
    data: {
        type: Date,
        required: true
    },
    tipo: {
        type: String,
        required: true
    },
    descricao: {
        type: String,
        required: true
    }
})

const Accidents = mongoose.model('Accidents', AccidentsSchema);

module.exports = Accidents;