const  { LanguageApp,  Language, Application} = require('../models/models')
const  ApiError = require('../error/ApiError')


class  VersionController {
    async create (req, res){
        const {name} = req.body
        const language = await Language.create({name})
        return res.json(language)

    }
    async qetAll (req, res){
        let{LangId, applicationId} = req.query
        let OCLicense;
        if (!LangId && !applicationId) {
            OCLicense = await LanguageApp.findAll({  include: [
                    {model: Language},
                    {model: Application}
                ]})
        }

        if (!LangId && applicationId) {
            OCLicense = await LanguageApp.findAll({
                where: {applicationId} ,
                include: [
                    {model: Language},
                    {model: Application}
                ]})
        }
        if (LangId && applicationId) {
            OCLicense = await LanguageApp.findAll({
                where: {LangId, applicationId} ,
                include: [
                    {model: Language},
                    {model: Application}
                ]})
        }
        return res.json(OCLicense)
    }

    async getOne(req,res)
    {
        try {
            const {id} = req.params;
            let OCLicense = await LanguageApp.findOne({
                where: {id},
                include: [
                    {model: Application},
                    {model: Language},
                ]
            });
            return res.json(OCLicense);
        } catch (e) {

        }

    }
}
module.exports = new VersionController()