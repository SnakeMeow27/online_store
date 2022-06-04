const Router = require('express')
const router = new Router()
const DateLicenseController = require('../controllers/DateLicenseController')

router.post('/', DateLicenseController.create)
router.get('/', DateLicenseController.qetAll)
router.get('/:id', DateLicenseController.getOne)

module.exports = router