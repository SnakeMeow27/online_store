const {Rating, Application} = require('./../models/models');

const jwt = require('jsonwebtoken');

module.exports = async function (req, res, next) {
    try {
        const {applicationId} = req.body;
        const token = req.headers.authorization.split(' ')[1];
        const user = jwt.verify(token, process.env.SECRET_KEY);
        const checkRating = await Rating.findOne({where: {applicationId, userId: user.id}});
        const checkDevices =  await Application.findOne({where: {id: applicationId}});

        if (!checkDevices) {
            return res.json("Приложение не существует в базе данных");
        } else if(checkRating && checkDevices) {
            return res.json("Вы оставили оценку для этого приложения");
        }
        return next();
    } catch (e) {
        return res.status(401).json("Что-то пошло не так в checkAddRatingMiddleware.js");

    }
};