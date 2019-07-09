const express = require('express')
const sequelize = require('./database/database')
const bodyparser = require('body-parser')
const passport = require('passport')
const app = express()
const users = require('./users/users')
const tasks = require('./tasks/tasks')
const port = 3000 || process.env.PORT
//const User = require('./models/user')

//body parser middleware
app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json())
app.use(express.json());

//passport middleware configuration
app.use(passport.initialize())
//allow CORS policy
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//authenticate to the database and
//continue

sequelize.authenticate().
then(() => {
	console.log('Established a connection to the database')
	app.use('/personnel',users)
	app.use('/tasks',tasks)
	app.listen(port,()=>console.log(`Server running on port ${port}`))
}).catch(err=>console.error(`Error connecting to the database:${err.stack}`))
