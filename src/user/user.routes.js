const express  = require('express');
const router   = express.Router();

let constroller = require('./user.controller');

router.post('/v1/signup', constroller.create);
router.post('/v1/signin', constroller.login);
router.get('/v1/users', constroller.getAll);
router.get('/v1/users/:userId', constroller.getById);
router.put('/v1/users/:userId', constroller.putById);
router.delete('/v1/users/:userId', constroller.removeById);


module.exports = router;