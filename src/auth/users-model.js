'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const users = new mongoose.Schema({
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  email: {type: String},
  role: {type: String, required:true, default:'user', enum:['admin','editor','user'] },
});
/**
 * Before the save function is run, hash the password so it can not be easily cracked.
 * @param  {} 'save'
 * @param  {} function(next
 * @param  {} {bcrypt.hash(this.password
 * @param  {} 10
 * @param  {} .then(hashedPassword=>{this.password=hashedPassword;next(
 * @param  {} ;}
 * @param  {} .catch(error=>{throwerror;}
 * @param  {} ;}
 */
users.pre('save', function(next) {
  bcrypt.hash(this.password,10)
    .then(hashedPassword => {
      this.password = hashedPassword;
      next();
    })
    .catch( error => {throw error;} );
});
/**
 * Search the database for the existing password and username values.
 * @param  {} auth
 * @param  {} {console.log('inauthbasic'
 * @param  {};returnthis.findOne(query} ;letquery={username
 */
users.statics.authenticateBasic = function(auth) {
  console.log('in auth basic');
  let query = {username:auth.username};
  return this.findOne(query)
    .then(user => user && user.comparePassword(auth.password))
    .catch(console.error);
};

/**
 * Compare a plain text password against the hashed one we have saved
 * @param  {} password
 * @param  {} {console.log('comparepassword'
 * @param  {} password
 * @param  {} ;returnbcrypt.compare(password
 * @param  {} this.password
 * @param  {} .then(valid=>valid?this
 */
users.methods.comparePassword = function(password) {
  console.log('compare password', password);
  return bcrypt.compare(password, this.password)
    .then(valid => valid ? this : null );
};

/**
 * Generate a JWT from the user id and a secret
 * @param  {} {lettokenData={id
 * @param  {} capabilities
 * @param  {} };returnjwt.sign(tokenData
 * @param  {} process.env.SECRET||'changeit'
 */
users.methods.generateToken = function() {
  let tokenData = {
    id:this._id,
    capabilities: (this.acl && this.acl.capabilities) || [],
  };
  return jwt.sign(tokenData, process.env.SECRET || 'changeit' );
};

module.exports = mongoose.model('users', users);
