const {Rating, Application} = require('./../models/models');
const jwt = require('jsonwebtoken');

class RatingController {
    async addRating(req, res) {
        try {
            const {rate, applicationId} = req.body;
            const token = req.headers.authorization.split(' ')[1];
            const user = jwt.verify(token, process.env.SECRET_KEY);
            await Rating.create({rate, applicationId, userId: user.id});

            let rating = await Rating.findAndCountAll({
                where: {
                    applicationId
                },
            });

            let allRating = 0;
            let middleRating;
            rating.rows.forEach(item => allRating += item.rate);
            middleRating = Number(allRating) / Number(rating.count);

            await Application.update(
                {rating: middleRating},
                {where: {id: applicationId}}
            );

            return res.json("Добавлен рейтинг успеха");
        } catch (e) {
            console.error(e);
        }
    }

    async checkRating(req, res) {
        try {
            const {applicationId} = req.body;
            const token = req.headers.authorization.split(' ')[1];
            const user = jwt.verify(token, process.env.SECRET_KEY);
            const checkRating = await Rating.findOne({where: {applicationId, userId: user.id}});
            const checkDevices =  await Application.findOne({where: {id: applicationId}});
            if (!checkDevices) {
                return res.json({allow: false});
            } else if(checkRating && checkDevices) {
                return res.json({allow: false});
            }
            return res.json({allow: true});
        } catch (e) {
            return res.status(401).json("Что-то пошло не так в checkAddRatingMiddleware.js");
        }
    }
}

module.exports = new RatingController();