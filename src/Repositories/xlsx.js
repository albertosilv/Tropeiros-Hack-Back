const xls = require('node-xlsx')
const pla = require('./xlsx2')()
const Accidents = require('../Models/AccidentsModel')
create = async ()=>{
    const data = await Accidents.collection.insert(pla)
    console.log(data)
}
create()

