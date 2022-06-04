const Router = require('express');
const router = new Router();

const UserBuyController = require('./../controllers/UserBuyController');
const checkRole = require('./../middleware/checkRoleMiddleware');


router.post('/', UserBuyController.create)
router.get('/', checkRole("ADMIN"), UserBuyController.getAll)
router.get('/:id', checkRole("ADMIN"), UserBuyController.getOne)
router.put('/', checkRole("ADMIN"), UserBuyController.updateUserBuy)
router.delete('/', checkRole("ADMIN"), UserBuyController.deleteUserBuy);


module.exports = router;