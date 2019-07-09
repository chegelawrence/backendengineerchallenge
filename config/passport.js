const JwtStrategy  = require('passport-jwt').Strategy,
     ExtractJwt  = require('passport-jwt').ExtractJwt

// load up the user model
const User = require('../models/user');

module.exports = function(passport) {
  let opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt')
  opts.secretOrKey = process.env.SECRET
  passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
  	//authenticate user

  	User.findOne({
  		where:{
  			id:jwt_payload.id
  		}
  	}).then(user=>{
  		if(user){
  			return done(null,user)
  		}else{
  			return done(null,false)
  		}
  	}).catch(err=>{
  		console.error(`Error: ${err.stack}`)
  		return done(err,false)
  	})

  })
  )
}