const express = require('express')
const passport = require('passport')
require('../config/passport')(passport)
const sequelize = require('../database/database')
const Task = require('../models/task')

const router = express.Router()

router.get('/assigned',passport.authenticate('jwt',{session:false}),function(req,res){
	const authToken = getAuthenticationToken(req.headers)
	if(authToken){
		//user is authenticated
		Task.findAll({
			attributes:['task_status_id','task_status_name','customer_first_name','personnel_first_name','personnel_other_name',
			'customer_last_name','agentId','in_progress','completed','deferred','customer_location',
			'customer_gender','customer_age','customer_access_code','customer_splash_page','customer_mpesa','customer_autoplay','customer_comments'],
			offset:returnOffset(parseInt(req.query.page),parseInt(req.query.limit)),
			limit:parseInt(req.query.limit),
			order: sequelize.col(req.query.order)
		}).then((tasks)=>{
			if(!tasks){
				res.status(404).send({
					message:'No tasks found'
				})
			}else{
				response = {
					page:parseInt(req.query.page),
					perPage:parseInt(req.query.limit),
					tasks
				}
				res.json(response)
			}
		}).catch(err=>{
			console.log(err)
			res.status(500).send({
				message:'Internal server error'
			})
		})
	}else{
		res.status(403).send({
			error:{
				message:'Not authorized'
			}
		})
	}
})

//gets and checks if the authorization header is set
//in the request
function getAuthenticationToken(headers){
	if(headers && headers.authorization){
		let parted = headers.authorization.split(' ')
		if(parted.length === 2){
			return parted[1]
		}else{
			return null
		}
	}else{
		return null
	}
}
function returnOffset(page,limit){
	return (page * limit) - limit
}


module.exports = router