var express = require('express');
var router = express.Router();
var validate = require('../validation/user.validate');
var controller = require('../controllers/user.controller');
var authMiddleware = require('../middlewares/auth.middleware');

//router.get('/',authMiddleware.requireAuth, controller.index);
router.get('/', controller.index);

router.get('/search', controller.search);
router.get('/create',controller.create);
router.get('/:id', controller.get);
//nhan data bang post
router.post('/create',validate.postCreate, controller.postCreate);
module.exports = router