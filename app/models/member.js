'use strict'
module.exports = function(sequelize, Sequelize){
    var Member = sequelize.define('member',{
        id: {autoIncrement:true, primaryKey:true, type:Sequelize.INTEGER},
        firstname: {type: Sequelize.STRING(50),notEmpty:true},
        lastname: {type: Sequelize.STRING(50),notEmpty:true},
        jurusan: {type: Sequelize.STRING(50),allowNull:true}
    })

    return Member;
}
