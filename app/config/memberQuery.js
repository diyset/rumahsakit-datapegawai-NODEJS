'use strict'

module.exports = (member)=>{

    (res)=>{
   let Member = member
    Member.findAll().then((results)=>{
        if(!results){
            ((err)=>{
                console.log('error',err)
                return res(err)
            })
        }
        console.log('Isi Member',results.dataValues)
        return res(results)

    })
}
}
