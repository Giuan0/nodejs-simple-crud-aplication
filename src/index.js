const express = require('express');
const app     = express();
const chalk   = require('chalk');


const mongoose =   require('mongoose');

mongoose.Promise = global.Promise;


const userRoutes = require('./user/user.routes');


const db   =   require('../config/db.connect').connect();

//
// mongoose.connect(db.database , (err) => {
// 	console.log("Establishing Connection with the database...");
// 	if (err) {
// 		console.log(chalk.red('✗')+" Connection with database failed!");
// 	}
// 	else{
// 		console.log(chalk.green('✓')+" Connection with the database established...");
// 	}
// });

app.use('/', userRoutes);

module.exports = app;