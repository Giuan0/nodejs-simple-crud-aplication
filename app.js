const express = require('express');
const app = express();

const logger = require('morgan');
const chalk = require('chalk');

const bodyParser= require('body-parser');

const cors = require('cors');

var server = require('./src/');

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(cors());
app.use(logger('combined'))

app.use('/',server);

app.listen(process.env.PORT || 3000 ,()=>{
	console.log(chalk.green('✓')+' running on port 3000');
})

module.exports = app; // for testing