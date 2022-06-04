const  { License} = require('../models/models')
const  ApiError = require('../error/ApiError')

class LicenseController {
    async create(req, res, next) {
        try {
            let {licenseApp, applicationId, VersionId, DateOfActionId} = req.body
            const license = await License.create({licenseApp, applicationId, VersionId, DateOfActionId})
            return res.json(license)

        } catch (e) {
            next(ApiError.badRequest(e.message))
        }

    }
}
module.exports = new LicenseController()