const Router = require('express')
const router = new Router()
const LanguageController = require('../controllers/LanguageController')

router.post('/', LanguageController.create)
router.get('/', LanguageController.qetAll)
router.get('/:id', LanguageController.getOne)

module.exports = router