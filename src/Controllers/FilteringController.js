const Accidents = require('../Models/AccidentsModel');
const data = require('../Repositories/data');
class Filtering {
    static async filter(req, res) {
        try {
            const { dataInicio, dataFim, tipo, bairro } = req.body
            let contFilter = 0;
            let contTotal = 0
            if (dataInicio != null && dataFim != null) {
                if (bairro != null) {
                    if (tipo != null) {
                        const filter = await Accidents.find({
                            data:
                                { "$gte": dataInicio, "$lt": dataFim }
                            , bairro, tipo
                        })
                        const total = await Accidents.find({
                            data:
                                { "$gte": dataInicio, "$lt": dataFim }
                            , bairro
                        })
                        contFilter = filter.length
                        contTotal = total.length
                    } else {
                        const filter = await Accidents.find({
                            data:
                                { "$gte": dataInicio, "$lt": dataFim }
                            , bairro
                        })
                        const total = await Accidents.find({
                            data:
                                { "$gte": dataInicio, "$lt": dataFim }
                        })
                        contFilter = filter.length
                        contTotal = total.length
                    }
                } else {
                    const total = await Accidents.find({
                        data:
                            { "$gte": dataInicio, "$lt": dataFim }
                    })
                    contTotal = total.length
                }
            } else {
                if (tipo != null) {
                    if (bairro != null) {
                        const filter = await Accidents.find({
                            bairro, tipo
                        })
                        const total = await Accidents.find({
                            tipo
                        })
                        contFilter = filter.length
                        contTotal = total.length
                    } else { 
                        const total = await Accidents.find({
                            tipo
                        })
                        contTotal = total.length
                    }
                }else{
                    const total = await Accidents.find({
                        bairro
                    })
                    contTotal = total.length
                }
            }
            return res.status(200).json({
                filter:contFilter,
                total:contTotal,
                percentual:(100*contFilter)/contTotal
            })
        } catch (err) {
            return res.status(400).json(err)
        }
    }
}

module.exports = Filtering;