const router = require('express').Router();
const controller = require('../controllers/products');

router.get('/',controller.getAllProduct)
router.post('/',controller.postProduct)
router.patch('/:id',controller.getProductById)
router.put('/:id',controller.putProductById)
router.delete('/:id',controller.deleteProductById)

module.exports = router;
