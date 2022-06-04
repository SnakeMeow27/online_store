const Router = require('express')
const router = new Router()
const VersionController = require('../controllers/VersionController')

router.post('/', VersionController.create)
router.get('/', VersionController.qetAll)
router.get('/:id', VersionController.getOne)

module.exports = router