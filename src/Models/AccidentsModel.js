const mongoose = require('../Config/bd')

const AccidentsSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    origem: {
        type: String,
        required: true
    },
    tipo: {
        type: String,
        required: true
    },
    local: {
        type: String,
        required: true
    },
    bairro: {
        type: String,
        required: true
    },
    data: {
        type: Date,
        required: true
    },
    cruzamento: {
        type: String
    },
    semaforo: {
        type: String
    },
    pavimento: {
        type: String
    },
    vitima: {
        type: String,
        required: true
    },
    observacao: {
        type: String,
    }
})

const Accidents = mongoose.model('Accidents', AccidentsSchema);

module.exports = Accidents;