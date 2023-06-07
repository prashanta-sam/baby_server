const router = require('express').Router();
// const controller = require('../controllers/products');
const controller = require('../controllers/UserController');
const { validateToken } = require('../middleware/JWT');
const { validate } = require('../middleware/RequestValidator');

router.post('/signup',validate('signup'),controller.signUp)
router.post('/signin',controller.signIn)
router.all("*",[validateToken])
router.get('/',controller.getUser)

// router.put('/:id',controller.putUserById)
// router.delete('/:id',controller.deleteUserById)

module.exports = router;
