const models = require('./app/models/')

console.log('Mmeber :',models.member)

models.member.findAll().then((results)=>{
    for(let i = 0;i < results.length;i += 1){
        console.log(results[i].dataValues)
    }
})