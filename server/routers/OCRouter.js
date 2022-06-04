const Router = require('express')
const router = new Router()
const OCController = require('../controllers/OCController')

router.post('/', OCController.create)
router.get('/', OCController.qetAll)
router.get('/:id', OCController.getOne)

module.exports = router