const  { Version,  License} = require('../models/models')
const  ApiError = require('../error/ApiError')

class  VersionController {
    async create (req, res){
        const {name} = req.body
        const  version = await Version.create({name})
        return res.json(version)
    }
    async qetAll (req, res){
        const versionL = await Version.findAll()
        return res.json(versionL)
    }

    async getOne(req,res)
    {
        const  {id} = req.params
        const version = await Version.findOne(
            {
                where: {id},

            }
        )
        return res.json(version)

    }
}
module.exports = new VersionController()