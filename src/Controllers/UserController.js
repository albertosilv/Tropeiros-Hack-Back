const yup = require('yup')
const User = require('../Models/UserModel')
class User{
    static async registerUser(req,res){
        try{

            const numberRegExp = /^[0-9]*$/

            const {nome,cpf,senha,tipo} = req.body

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
                tipo: yup.string().required('Tipo Obrigatário')
            })

            await schema.validate(req.body)

            if (await User.findOne({cpf})) {
                return res.status(400).json({ error: 'CPF já Cadastrado' });
            }

            const userConst = await Student.create(
                {
                    cpf,
                    nome,
                    senha,
                    tipo
                }
            );

            userConst.senha = undefined;

            return res.status(200).json(userConst)



        }catch(err){

            return res.status(400).json({'Error':err})
            
        }
    }
}

module.exports = User