const Accidents = require('../Models/AccidentsModel');
const Users = require('../Models/UserModel');
class Filtering {
   
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