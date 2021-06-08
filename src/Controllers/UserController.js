const yup = require('yup')
const User = require('../Models/UserModel')
const Token = require('../Models/TokenModel')
const bscrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
class User{

    static async store(req,res){
        try{

            const numberRegExp = /^[0-9]*$/
            const {id} = req.params
            const {nome,cpf,senha,admin} = req.body

            if(!( await User.findById(id)).admin){
                res.status(400).json({'Error':'unauthorized User'})
            }

            const schema = yup.object().shape({
                cpf: yup.string()
                    .matches(numberRegExp, 'O CPF deve conter apenas números')
                    .min(11, 'O CPF deve conter 11 números')
                    .max(11, 'O CPF deve conter 11 números')
                    .required('CPF Obrigatório'),
                nome: yup.string().required('Nome Obrigatório'),
                senha: yup.string()
                    .min(6, 'A sua senha deve conter entre 6 a 24 caracteres')
                    .max(24, 'A sua senha deve conter entre 6 a 24 caracteres')
                    .required('Senha Obrigatória'),
                admin: yup.boolean().required('Tipo Obrigatário')
            })
            if(!tipo){
                admin=false
            }

            await schema.validate(req.body)

            if (await User.findOne({cpf})) {
                return res.status(400).json({ error: 'CPF já Cadastrado' });
            }

            const userConst = await Student.create(
                {
                    cpf,
                    nome,
                    senha,
                    admin
                }
            );

            userConst.senha = undefined;

            return res.status(200).json(userConst)

        }catch(err){

            return res.status(400).json({'Error':err})

        }
    }
    static async show(req,res){
        try{
            const {id} = req.params
            if(!id){
                res.status(400).json('ID Obrigatório')
            }
            const user = await User.findById(id)
            user.senha = undefined;

            return res.status(200).json(user)
        }catch(err){
            return res.status(400).json({'Error':err})
        }
    }
    static async index(req,res){
        try{
            const users = await User.findAll()
            users.forEach(e=>{
                e.senha = undefined
            })
            return res.status(200).json(users)
        }catch(err){
            return res.status(400).json({'Error':err})
        }
    }
    static async update(req,res){
        try{
            const {id}  = req.params
            if(!( await User.findById(id)).admin){
                res.status(400).json({'Error':'unauthorized User'})
            }
            const user = await User.findByIdAndUpdate(req.body.id, { $set: req.body }, { new: true });
            return res.status(200).json(user);
        }catch(err){
            return res.status(400).json({'Error':err})
        }
    }
    static async destroy(req,res){
        try{
            const {id}  = req.params
            if(!( await User.findById(id)).admin){
                res.status(400).json({'Error':'unauthorized User'})
            }
            await User.findByIdAndRemove(req.body.id);
            return res.status(204).json();
        }catch(err){
            return res.status(400).json({'Error':err})
        }
    }
}

module.exports = User