const  { OCApp,  OC, Application} = require('../models/models')
const  ApiError = require('../error/ApiError')


class  VersionController {
    async create (req, res, next){
        try{
            const {name, categoryOC} = req.body
        const  oc = await OC.create({name, categoryOC})
        return res.json(oc)}

    catch (e){
            next(ApiError.badRequest(e.message))
        }

    }

    async qetAll (req, res){
        let{OCId, applicationId} = req.query
        let OCLicense;
         if (!OCId && !applicationId) {
             OCLicense = await OCApp.findAll({  include: [
                     {model: OC},
                     {model: Application}
                 ]})
         }

        if (!OCId && applicationId) {
            OCLicense = await OCApp.findAll({
                where: {applicationId} ,
                include: [
                    {model: OC},
                    {model: Application}
                ]})
        }
        if (OCId && applicationId) {
            OCLicense = await OCApp.findAll({
                where: {OCId, applicationId} ,
                include: [
                    {model: OC},
                    {model: Application}
                ]})
        }
        return res.json(OCLicense)
    }

    async getOne(req,res)
    {
        try {
            const {id} = req.params;
            let OCLicense = await OCApp.findOne({
                where: {id},
                include: [
                    {model: Application},
                    {model: OC},
                ]
            });
            return res.json(OCLicense);
        } catch (e) {

        }

    }
}
module.exports = new VersionController()