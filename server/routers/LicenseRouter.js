const Router = require('express')
const router = new Router()
const LicenseController = require('../controllers/LicenseController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/',  LicenseController.create)

module.exports = router





















