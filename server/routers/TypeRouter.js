const Router = require('express')
const router = new Router()
const TypeController = require('../controllers/TypeController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', checkRole('ADMIN'), TypeController.create)
router.get('/', TypeController.getAll)
router.delete('/:id', checkRole("ADMIN"), TypeController.delete);


module.exports = router