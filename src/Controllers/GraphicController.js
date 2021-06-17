const Accidents = require('../Models/AccidentsModel');

const _ = require('lodash')
const mesesExtenso = new Array("Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez");

class Graphic{
    static async bairros(req,res){
        try{
            const data = await Accidents.find({})
            const bairros = data.map(e=>{
                return e.bairro
            })
            const bairrosCount = _.countBy(bairros)
            const bairrosArray = []
            for (let [key, value] of Object.entries(bairrosCount)) {
                bairrosArray.push({
                    bairro:key,
                    count:value
                })
            }
            const bairrosFilter = bairrosArray.slice(0,10)
            bairrosFilter.forEach(e=>{
                if(e.bairro=="null"){
                    e.bairro="OUTROS"
                }
            })
            return res.status(200).json(bairrosFilter)
        }catch(err){
            return res.status(400).json(err.message)
        }
    }
    static async tipos(req,res){
        try{
            const data = await Accidents.find({})
            const tipos = data.map(e=>{
                return e.tipo
            })
            const tipoCount = _.countBy(tipos)
            const tipoArray = []
            for (let [key, value] of Object.entries(tipoCount)) {
                tipoArray.push({
                    tipo:key,
                    count:value
                })
            }
            const tipoFilter = tipoArray.slice(0,10)
            tipoFilter.forEach(e=>{
                if(e.tipo=="null"){
                    e.tipo="OUTROS"
                }
            })
            
            return res.status(200).json(tipoFilter)
        }catch(err){
            return res.status(400).json(err.message)
        }
    }
    static async meses(req,res){
        try{
            const data = await Accidents.find({})
            const meses = data.map(e=>{
                return e.data.getMonth()+1
            })
            const mesesCount = _.countBy(meses)
            const mesesArray = []
            for (let [key, value] of Object.entries(mesesCount)) {
                mesesArray.push({
                    mes:mesesExtenso[key-1],
                    count:value
                })
            }
            return res.status(200).json(mesesArray)

        }catch(err){
            return res.status(400).json(err.message)
        }
    }

}

module.exports = Graphic;