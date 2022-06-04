const Router = require('express');
const router = new Router();
const BasketController = require('./../controllers/basketController');
const authMiddleware = require('./../middleware/authMiddleware');
const checkDeleteAppFromBasket = require('./../middleware/checkDeleteAppFromBasket');

router.post('/', authMiddleware, BasketController.addDevice)
router.get('/', authMiddleware, BasketController.getApplications)
router.delete('/:id', authMiddleware, checkDeleteAppFromBasket, BasketController.deleteDevice);


module.exports = router;