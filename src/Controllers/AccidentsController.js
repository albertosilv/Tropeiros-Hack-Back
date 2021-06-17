const yup = require('yup');
const AccidentsModel = require('../Models/AccidentsModel');
class Accident{

    static async store(req,res){
        try{

            const numberRegExp = /^[0-9]*$/

            const {id, origem, tipo, local, bairro, data, cruzamento,
                semaforo, pavimento, vitima, observacao} = req.body;

            const schema = yup.object().shape({
                id: yup.string()
                .matches(numberRegExp, 'O id deve conter apenas números')
                .required('Id obrigatório'),
                origem: yup.string().required('Origem obrigatória'),
                tipo: yup.string().required('Tipo obrigatório'),
                local: yup.string().required('Local obrigatório'),
                bairro: yup.string().required('Bairro obrigatório'),
                data: yup.string().required('Data obrigatória'),
                cruzamento: yup.string(),
                semaforo: yup.string(),
                pavimento: yup.string(),
                vitima: yup.string().required('Vítima obrigatória'),
                observacao: yup.string(),
            });

            await schema.validate(req.body);

            const accidentRegistered = await AccidentsModel.findOne({id});
  
            if(accidentRegistered) return res.status(400).json({error: "Já foi registrado acidente com esse ID"})

            const accidentsConst = await AccidentsModel.create({
                id,
                origem,
                tipo,
                local,
                bairro,
                data,
                cruzamento,
                semaforo,
                pavimento,
                vitima,
                observacao
            });

            if(!accidentsConst) return res.status(400).json({error: "Não foi possível cadastrar o acidente"})

            return res.status(201).json(accidentsConst);
        }catch(err){
            return res.status(400).json(err.message);
        }
    }

    static async show(req, res) {
        try {
            const {id} = req.params;

            const accident = await AccidentsModel.findById(id);
            if(!accident) return res.status(200).json({error: 'Acidente não cadastrado'})

            return res.status(200).json(accident);
        } catch (err) {
            return res.status(400).json(err.message);
        }
    }

    static  async index(req,res){
        try{
            const {pag} = req.params
            const { dataInicio, dataFim } = req.query
            delete req.query.dataInicio
            delete req.query.dataFim
            let filter = 0
            let total = 0
            if(dataInicio!=null && dataFim){
                filter = (await Accidents.find({...req.query,
                    data:
                        { "$gte": dataInicio, "$lt": dataFim }
                })).length
            }else{
                const accidents = await AccidentsModel.find(req.query).skip((pag-1)*7).limit(7);
            }
            total = (await AccidentsModel.find()).length
            if(accidents.length == 0) return res.status(400).json({error: "Não há acidentes registrados"})
 
            return res.status(200).json({accidents,filter,total});
        }catch(err){
            return res.status(400).json(err.message);
        }
    }

    static  async update(req,res){
        try{
            const numberRegExp = /^[0-9]*$/

            const schema = yup.object().shape({
                id: yup.string()
                .matches(numberRegExp, 'O id deve conter apenas números')
                .required('Id obrigatório'),
                origem: yup.string().required('Origem obrigatória'),
                tipo: yup.string().required('Tipo obrigatório'),
                local: yup.string().required('Local obrigatório'),
                bairro: yup.string().required('Bairro obrigatório'),
                data: yup.string().required('Data obrigatória'),
                cruzamento: yup.string(),
                semaforo: yup.string(),
                pavimento: yup.string(),
                vitima: yup.string().required('Vítima obrigatória'),
                observacao: yup.string(),
            });

            await schema.validate(req.body);

            const idParams = req.params.id;

            const accident = await AccidentsModel.findByIdAndUpdate(idParams, { $set: req.body }, { new: true });
             
            return res.status(200).json(accident);

        }catch(err){
            return res.status(400).json(err.message);
        }
    }

    static async destroy(req,res){
        try{
            const {id} = req.params;
            const accident = await AccidentsModel.findByIdAndRemove(id);
            if(!accident) return res.status(400).json({error: "Acidente não encontrado"})
            return res.status(200).json({sucess: 'Acidente deletado'})

        }catch(err){
            return res.status(400).json({error:err.message})
        }
    }
    
}

module.exports = Accident;