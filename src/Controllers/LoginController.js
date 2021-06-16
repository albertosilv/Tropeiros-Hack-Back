const yup = require('yup')
const User = require('../Models/UserModel')
const Token = require('../Models/TokenModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
class Login{
    static async login(req,res){
        try{
            const {cpf,senha} = req.body

            const numberRegExp = /^[0-9]*$/

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

            if (! await bcrypt.compare(senha, user.senha)) {
                return res.status(400).json({ error: 'Senha Inválida' })
            }
            user.senha = undefined

            return res.status(200).json({
                user: user,
                token: jwt.sign({ id: user.id }, process.env.SECRET , {
                    expiresIn: '7d',
                }),
            })

        }catch(err){
            return res.status(400).json(err)
        }

    }

    static async logout(req,res){
        try{
            const tokenBearer = req.headers.authorization
            const [bearer,token] = tokenBearer.split(' ')
            const registro = Token.create({ token })
            res.status(200).json({
                sucess:"Logout efetuado"
            })
        }catch(err){
            return res.status(400).json(err)
        }
    }
}

module.exports = Login;