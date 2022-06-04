const  { DateOfAction,  License} = require('../models/models')
const  ApiError = require('../error/ApiError')

class  DateLicenseController {
    async create (req, res){
     const {name} = req.body
        const  date = await DateOfAction.create({name})
        return res.json(date)
    }
    async qetAll (req, res){
      const datesL = await DateOfAction.findAll()
        return res.json(datesL)
    }

    async getOne(req,res)
    {
        const  {id} = req.params
        const date = await DateOfAction.findOne(
            {
                where: {id},

            }
        )
        return res.json(date)

    }
}
module.exports = new DateLicenseController()