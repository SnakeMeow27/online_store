const Router = require('express')
const router = new Router()
const ApplicationController = require('../controllers/ApplicationController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/',checkRole('ADMIN'), ApplicationController.create)
router.get('/', ApplicationController.getAll)
router.get('/:id', ApplicationController.getOne)

module.exports = router