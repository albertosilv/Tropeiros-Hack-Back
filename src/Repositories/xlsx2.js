const xls = require('node-xlsx')
const planilha2019 = xls.parse('../xls/2019.xlsx')
const planilha2020 = xls.parse('../xls/2020.xlsx')
module.exports =()=> {
    nova2020 = planilha2020[0].data.map(e=>{
        return {
            id:e[1],
            origem:e[2],
            tipo:e[16],
            rua:e[3],
            bairro:e[10],
            data:new Date(e[13],e[12],2020,e[11]),
            cruzamento:e[8],
            semaforo:e[9],
            observacao:e[77]
        }
    })
    nova2019 = planilha2019[0].data.map(e=>{
        return {
            id:e[1],
            origem:e[2],
            tipo:e[16],
            rua:e[3],
            bairro:e[10],
            data:new Date(e[13],e[12],2020,e[11]),
            cruzamento:e[8],
            semaforo:e[9],
            observacao:e[77]
        }
    })
    return nova2020.concat(nova2019)
}