const yup = require('yup')
const User = require('../Models/UserModel')
const bscrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
class User{

    static async registerUser(req,res){
        try{

            const numberRegExp = /^[0-9]*$/

            const {nome,cpf,senha,admin} = req.body

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
    static async login(req,res){
        const {cpf,senha} = req.body

        const schema = yup.object().shape({
            cpf: yup.string()
                .matches(numberRegExp, 'O CPF deve conter apenas números')
                .min(11, 'O CPF deve conter 11 números')
                .max(11, 'O CPF deve conter 11 números')
                .required('CPF Obrigatório'),
            senha: yup.string()
                .min(6, 'A sua senha deve conter entre 6 a 24 caracteres')
                .max(24, 'A sua senha deve conter entre 6 a 24 caracteres')
                .required('Senha Obrigatória'),
        })
        await schema.validate(req.body)
        const user = await User.findOne({ cpf })

        if (!user) {
            return res.status(400).json({ error: 'Usuário não encontrado' })
        }

        if (! await bscrypt.compare(senha, user.senha)) {
            return res.status(400).json({ error: 'Senha Inválida' })
        }
        user.senha = undefined

        return res.status(200).json({
            user: user,
            token: jwt.sign({ id: user.id }, process.env.SECRET , {
                expiresIn: '7d',
            }),
        })

    }

    static async logout(req,res){
        try{

        }catch(err){
            return res.status(400).json(err)
        }
    }
}

module.exports = User