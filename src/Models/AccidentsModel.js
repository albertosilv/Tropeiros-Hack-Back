const mongoose = require('../Config/bd')

const AccidenstSchema = new mongoose.Schema({
    accidents:
})

const Accidents = mongoose.model('Accidents', AccidenstSchema);

module.exports = Accidents
