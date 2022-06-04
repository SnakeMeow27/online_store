const { Type} = require('./../models/models');
const ApiError = require('../error/apiError');
const jwt = require('jsonwebtoken');
const {Application, UserBuy, Developer} = require("../models/models");

class UserBuyController {
    async create(req, res) {
        const auth = req.headers.authorization || "";
        const {mobile, basket} = req.body;

        try {
            let parseApplications = [];
            for (let key of basket) {
                parseApplications.push(key.id)
            }

            const isApplicationsInDB = await Application.findAndCountAll({
                where: {id: parseApplications},
                attributes: ["id"]
            });

            if(isApplicationsInDB.count === parseApplications.length) { //if all devices was found in DB
                const row = {mobile};
                if(auth) {
                    const token = auth.split(' ')[1];
                    const {id} = jwt.verify(token, process.env.SECRET_KEY);
                    row.userId = id;
                }

                await UserBuy.create(row).then(order => {
                    const {id} = order.get();
                    parseApplications.forEach( async (applicationId, i) =>  {

                        await UserBuyApplications.create({
                            UserBuyId: id,
                            applicationId,
                            count: basket[i].count
                        });
                    });
                });
            } else { //send msg about devices that didnt found in DB
                const notFoundIdApplications = [];
                const arrApplications = []; //found id
                isApplicationsInDB.rows.forEach(item => arrApplications.push(item.id));
                parseApplications.forEach(applicationId => {
                    if(!arrApplications.includes(applicationId)) {
                        notFoundIdApplications.push(applicationId);
                    }
                });
                return ApiError.badRequest(res.json(`Some Devices of id(${notFoundIdApplications.join(', ')}) not exist in DB`));
            }

            return res.json("Thank you for you order! We will contact you shortly");
        } catch (e) {
            return res.json(e);
        }
    }

    async updateUserBuy(req, res) {
        try {
            const { complete, id } = req.body;

            await UserBuy.findOne({where:{id}})
                .then( async data => {
                    if(data) {
                        await UserBuy.update({complete}, {where:{id}} ).then(() => {
                            return res.json("Order updated");
                        })
                    } else {
                        return res.json("This order doesn't exist in DB");
                    }
                })
        } catch (e) {
            return res.json("Updated didn't complete because was error: " + e);
        }

    }

    async deleteUserBuy(req, res) {
        try {
            const { id } = req.body;

            await UserBuy.findOne({where:{id}})
                .then( async data => {
                    if(data) {
                        await UserBuy.destroy({where:{id}}).then(() => {
                            return res.json("Order deleted");
                        })
                    } else {
                        return res.json("This order doesn't exist in DB");
                    }
                })
        } catch (e) {
            return res.json("Delete didn't complete because was error: " + e);
        }
    }

    async getAll(req, res) {
        let {limit, page, complete} = req.query;
        page = page || 1;
        limit = limit || 7;
        let offset = page * limit - limit;
        let applications;
        if(complete === "not-completed") {
            applications = await UserBuy.findAndCountAll({where:{complete: false}, limit, offset});
        } else if(complete === "completed") {
            applications = await UserBuy.findAndCountAll({where:{complete: true}, limit, offset});
        } else {
            applications = await UserBuy.findAndCountAll({limit, offset});
        }

        return res.json(applications);
    }

    async getOne(req, res) {
        const {id} = req.params;
        const order = {};
        try {
            let applications;
            let infoApplications = [];
            await UserBuy.findOne({where:{id}}).then(async data => {
                order.descr = data;
                applications = await UserBuyApplications.findAll({
                    attributes: ["applicationId", "count"],
                    where:{orderId: data.id},
                });

                for (let application of applications) {
                    await Application.findOne({
                        attributes: ["name", "img", "price"],
                        where: {id: applications.applicationId},
                        include: [
                            {
                                attributes: ["name"],
                                model: Type
                            },
                            {
                                attributes: ["name"],
                                model: Developer
                            },
                        ]
                    }).then(async item => {
                        let newObj = {
                            descr: item,
                            count: application.count
                        }
                        infoApplications.push(newObj);
                    });
                }
                order.applications = infoApplications;

                return res.json(order);
            }).catch(() => {
                return res.json("Order doesn't exist in data base");
            });

        } catch (e) {
            return res.json("Delete didn't complete because was error: " + e);
        }
    }
}

module.exports = new UserBuyController();