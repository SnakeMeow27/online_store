const Router = require('express')
const router = new Router()
const DeveloperController = require('../controllers/DeveloperController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', checkRole('ADMIN'), DeveloperController.create)
router.get('/', DeveloperController.getAll)
    router.delete('/:id', checkRole("ADMIN"), DeveloperController.delete);


module.exports = router