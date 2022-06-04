const {Developer} = require('../models/models')
const  ApiError = require('../error/ApiError');

class DeveloperController{
    async create(req,res){
        const {name} = req.body
        const developer = await Developer.create({name})
        return res.json(developer)
    }

    async getAll(req,res){
 const developers = await  Developer.findAll()
        return res.json(developers)
    }
    async delete(req, res) {
        try {
            const {id} = req.params;

            await Developer.findOne({where:{id}})
                .then( async data => {
                    if(data) {
                        await Developer.destroy({where:{id}}).then(() => {
                            return res.json("Разработчик удален");
                        })
                    } else {
                        return res.json("Разработчик отсутствует в базе данных");
                    }
                })
        } catch (e) {
            return res.json(e);
        }
    }

}

module.exports = new DeveloperController()