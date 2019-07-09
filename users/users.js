const express = require('express')
const passport = require('passport')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('../config/passport')(passport)

const router = express.Router()
const User = require('../models/user')


router.post('/login', function(req, res) {
	User.findOne({
		where:{
			personnel_phone:req.body.phone.trim()
		}
	}).then((user)=>{
		//check if the user was found
		if(!user){
			res.status(401).send({
				error:{
					message:'Authentication failed.User not found'
				}
			})
		}else{
			//check if the passwords match
			bcrypt.compare(req.body.password,user.personnel_password,(err,isMatch) => {
				if(isMatch){
					//success login!!!YEAH
					//create access token and send back
					const token = jwt.sign(user.dataValues,process.env.SECRET,{
						expiresIn:process.env.ACCESS_TOKEN_LIFE
					})
					res.json({
						reset_password:user.reset_password,
						access_token:'JWT ' + token,
						expires_in:process.env.ACCESS_TOKEN_LIFE
					})
				}else{
					res.status(401).send({
						error:{
							password:'You entered an incorrect password'
						}
					})
				}
			})
		}
	})
	.catch(err=>console.error(err))
})


module.exports = router