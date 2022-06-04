const Router = require('express')
const router = new Router()
const ApplicationRouter = require('./ApplicationRouter');
const DeveloperRouter = require('./DeveloperRouter');
const TypeRouter = require('./TypeRouter');
const UserRouter = require('./UserRouter');
const basketRouter = require('./basketRouter')
const UserBuyRouter = require('./UserBuyRouter');
const ratingRouter = require('./ratingRouter');
const DateRouter = require('./DateRouter');
const VersionRouter = require('./VersionRouter')
const OCRouter = require('./OCRouter')
const LanguageRouter = require('./LanguageRouter')
const LicenseRouter = require('./LicenseRouter')

router.use('/user', UserRouter)
router.use('/type',TypeRouter)
router.use('/developer',DeveloperRouter)
router.use('/application', ApplicationRouter)
router.use('/basket', basketRouter)
router.use('/orders', UserBuyRouter)
router.use('/rating', ratingRouter)
router.use('/dateL', DateRouter)
router.use('/version', VersionRouter)
router.use('/OC', OCRouter)
router.use('/language', LanguageRouter)
router.use('/license', LicenseRouter)

module.exports = router