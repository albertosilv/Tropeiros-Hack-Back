const Accidents = require('../Models/AccidentsModel');
const Users = require('../Models/UserModel');
class Filtering {
    static async filterAccidents(req, res) {
        try {
            const { dataInicio, dataFim, tipo, bairro } = req.body
            let contFilter = 0;
            let contTotal = 0
            let filter;
            if (dataInicio != null && dataFim != null) {
                if (bairro != null) {
                    if (tipo != null) {
                        filter = await Accidents.find({
                            data:
                                { "$gte": dataInicio, "$lt": dataFim }
                            , bairro, tipo
                        })
                    } else {
                        filter = await Accidents.find({
                            data:
                                { "$gte": dataInicio, "$lt": dataFim }
                            , bairro
                        })
                    }
                } else {
                    if(tipo != null){
                        filter = await Accidents.find({
                            data:
                                { "$gte": dataInicio, "$lt": dataFim }
                            , tipo
                        })
                    }
                    else{
                        filter = await Accidents.find({
                            data:
                                { "$gte": dataInicio, "$lt": dataFim }
                        })
                    }
                }
            } else {
                if (tipo != null) {
                    if (bairro != null) {
                        filter = await Accidents.find({
                            bairro, tipo
                        })
                        console.log(filter.length)
                    } else { 
                        filter = await Accidents.find({
                            tipo
                        })
                    }
                }else{
                    if(bairro!=null){
                        filter = await Accidents.find({
                            bairro
                        })
                    }
                    else{
                        filter = [];   
                    }
                }
            }
            contFilter = filter.length
            const total = await Accidents.find()
            contTotal = total.length
            return res.status(200).json({
                filter:contFilter,
                total:contTotal,
                percentual:(100*contFilter)/contTotal
            })
        } catch (err) {
            return res.status(400).json(err.message)
        }
    }


    static async filterUsers(req, res) {
        try {
            const {terms} = req.body;
            if(terms == null) return res.status(400).json({message: "Não há termos passados para pesquisar"})

            const users = await Users.find()
            const userFilter = users.filter(item => item.nome.toLowerCase().includes(terms.toLowerCase()) || item.cpf.includes(terms))

            if(userFilter == null) return res.status(400).json({message: 'Não há usuários com o termo escolhido'})
            
            return res.status(200).json(userFilter);
        }catch(err){
            return res.status(400).json(err.message)
        }
    }
}

module.exports = Filtering;