const xls = require('node-xlsx')
const planilha2019 = xls.parse('../xls/2019.xlsx')
const planilha2020 = xls.parse('../xls/2020.xlsx')
nova2020 = planilha2020[0].data.map(e=>{
    return e[17]
})
nova2020 = nova2020.filter(function(el, i) {
    return nova2020.indexOf(el) === i;
});

nova2019 = planilha2019[0].data.map(e=>{
    return e['7']
})
nova2019 = nova2019.filter(function(el, i) {
    return nova2019.indexOf(el) === i;
});
let dados = nova2020.concat(nova2019)

dados=dados.filter(function(el, i) {
    return dados.indexOf(el) === i;
});
dados.forEach((element,index) => {
    console.log(`${index}:'${element}',`)
});
