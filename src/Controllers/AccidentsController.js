const yup = require('yup');
const AccidentsModel = require('../Models/AccidentsModel');

class Accident{

    static async store(req,res){
        try{
            const {bairro, rua, data, tipo, descricao} = req.body;

            const schema = yup.object().shape({
                bairro: yup.string()
                    .required('Bairro Obrigatório'),
                rua: yup.string().required('Rua Obrigatória'),
                data: yup.string()
                    .required('Data Obrigatória'),
                tipo: yup.string().required('Tipo Obrigatário'),
                descricao: yup.string().required('Descrição Obrigatória')
            });

            await schema.validate(req.body);

            const accidentsConst = await AccidentsModel.create({
                bairro,
                rua,
                data,
                tipo,
                descricao
            });

            return res.status(201).json(accidentsConst);
        }catch(err){
            return res.status(400).json(err);
        }
    }

    static async show(req, res) {
        try {
            const {id} = req.params;
            if(!id){
                return res.status(400).json('ID do acidente à ser mostrado é obrigatório');
            }

            const accident = await AccidentsModel.findById(id);

            return res.status(200).json(accident);
        } catch (err) {
            return res.status(400).json(err);
        }
    }

    static  async index(req,res){
        try{
            const accidents = await AccidentsModel.find();

            return res.status(200).json(accidents);
        }catch(err){
            return res.status(400).json(err);
        }
    }
}

module.exports = Accident;