const yup = require('yup')
const UserModel = require('../Models/UserModel')
class User{

    static async store(req,res){
        try{

            const numberRegExp = /^[0-9]*$/
            const id = req.userId;
            const {nome,cpf,senha,admin} = req.body

            if(!( await UserModel.findById(id)).admin){
                return res.status(400).json({error:'Usuário não autorizado!'})
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

            await schema.validate(req.body)

            if (await UserModel.findOne({cpf})) {
                return res.status(400).json({ error: 'CPF já Cadastrado' });
            }

            
            const userConst = await UserModel.create(
                {
                    nome,
                    cpf,
                    senha,
                    admin
                }
            );

            userConst.senha = undefined;

            return res.status(201).json(userConst)

        }catch(err){

            return res.status(400).json({error:err.message})

        }
    }
    static async show(req,res){
        try{
            const idUserLogged = req.userId;

            if(!( await UserModel.findById(idUserLogged)).admin){
                return res.status(400).json({error:'Usuário não autorizado!'})
            }

            const {id} = req.params
            if(!id){
                return res.status(400).json({error: 'ID do usuário à ser mostrado é obrigatório'})
            }
            const user = await UserModel.findById(id)
            if(!user) return res.status(200).json({error: 'Usuário não existe!'})
            user.senha = undefined;

            return res.status(200).json(user)
        }catch(err){
            return res.status(400).json({error:err.message})
        }
    }

    static async index(req,res){
        try{
            const idUserLogged = req.userId;
            
            if(!( await UserModel.findById(idUserLogged)).admin){
                return res.status(400).json({error:'Usuário não autorizado!'})
            }

            const users = await UserModel.find()
            users.forEach(e=>{
                e.senha = undefined
            })
            return res.status(200).json(users)
        }catch(err){
            return res.status(400).json({error:err.message})
        }
    }
    
    static async update(req,res){
        try{
            const idUserLogged = req.userId;

            if(!( await UserModel.findById(idUserLogged)).admin){
                return res.status(400).json({error:'Usuário não autorizado!'})
            }

            const {id} = req.params
            const user = await UserModel.findByIdAndUpdate(id, { $set: req.body }, { new: true });
            return res.status(200).json(user);
        }catch(err){
            return res.status(400).json({error:err.message})
        }
    }
    static async destroy(req,res){
        try{
            const idUserLogged = req.userId;

            if(!( await UserModel.findById(idUserLogged)).admin){
                return res.status(400).json({error:'Usuário não autorizado!'})
            }

            const {id} = req.params;
            await UserModel.findByIdAndRemove(id);
            return res.status(200).json({sucess:"Usuário deletado"});
        }catch(err){
            return res.status(400).json({error:err.message})
        }
    }
}

module.exports = User