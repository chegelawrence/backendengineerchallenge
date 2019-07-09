const Sequelize = require('sequelize')
const sequelize = require('../database/database')

const Model = Sequelize.Model

class User extends Model{}
User.init({
	personnel_onames:{
		type:Sequelize.STRING(45),
		allowNull:false
	},
	personnel_fname:{
		type:Sequelize.STRING(20),
		allowNull:false
	},
	personnel_email:{
		type:Sequelize.STRING(45),
		allowNull:false
	},
	personnel_phone:{
		type:Sequelize.STRING(45),
		allowNull:false
	},
	personnel_password:{
		type:Sequelize.STRING(100),
		allowNull:false
	},
	personnel_status:{
		type:Sequelize.INTEGER(1),
		allowNull:false
	},
	last_login:{
		type:Sequelize.DATE,
		allowNull:false
	},
	personnel_type_id:{
		type:Sequelize.INTEGER(11),
		allowNull:false
	},
	reset_password:{
		type:Sequelize.INTEGER(1),
		allowNull:false
	},

},{sequelize,modelName:'personnel',timestamps:false})

module.exports = User