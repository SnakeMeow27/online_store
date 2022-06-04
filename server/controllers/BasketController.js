const {Basket, BasketApp, Application, AppInfo} = require('./../models/models');
const jwt = require('jsonwebtoken');
const { Op } = require("sequelize");


class BasketController {
    async addDevice(req, res) {
        try {
            const {id} = req.body;
            const token = req.headers.authorization.split(' ')[1];
            const user = jwt.verify(token, process.env.SECRET_KEY);
            const basket = await Basket.findOne({where: {userId: user.id}});
            await BasketApp.create({basketId : basket.id, applicationId: id});
            return res.json("Product added in card");
        } catch (e) {
            console.error(e);
        }
    }

    async getApplications(req, res) {
        try {
            const token = req.headers.authorization.split(' ')[1];
            const user = jwt.verify(token, process.env.SECRET_KEY);
            const {id} = await Basket.findOne({where: {userId: user.id}});
            const basket = await BasketApp.findAll({where: {applicationId: id}});

            const basketArr = [];
            for(let i = 0; i < basket.length; i++) {
                const BasketApp = await Application.findOne({
                    where: {
                        id: basket[i].applicationId,

                    },
                    include: {
                        model: AppInfo, as: "info",
                        where: {
                            applicationId: basket[i].applicationId,
                            [Op.or]: [
                                {
                                    applicationId: {
                                        [Op.not]: null
                                    }
                                }
                            ],
                        },
                        required: false}
                });
                basketArr.push(BasketApp);
            }

            return res.json(basketArr);
        } catch (e) {
            console.error(e);
            console.log("Ошибка контроллера вывода корзины")
        }
    }

    async deleteDevice(req, res) {
        try {
            const {id} = req.params;
            const user = req.user;

            await Basket.findOne({where: {userId: user.id}}).then(async userBasket => {
                if(userBasket.userId === user.id) {
                    await BasketApp.destroy({where: {basketId: userBasket.id, applicationId: id}})
                }
                return res.json(`You haven't access for delete the device(${id}) from basket that didn't belong to you`);
            });
            return res.json("Product deleted form your card");
        } catch (e) {
            console.error(e);
        }
    }
}

module.exports = new BasketController();