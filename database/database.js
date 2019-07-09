require('dotenv').config()
const Sequelize = require('sequelize')

const sequelize = new Sequelize(process.env.DATABASE,process.env.DB_USERNAME,process.env.PASSWORD,{
	host:process.env.HOST,
	port:3306,
	dialect:'mysql'
})

module.exports = sequelize