const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user',{
    id:{type:DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
    email:{type:DataTypes.STRING, unique:true},
    password: {type:DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: "USER"}
})

const Basket = sequelize.define('basket',{
    id:{type:DataTypes.INTEGER, primaryKey:true, autoIncrement:true}
})

const BasketApp = sequelize.define('BasketApp',{
    id:{type:DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
    applicationId:{type:DataTypes.INTEGER}
})

const Application = sequelize.define('application',{
    id:{type:DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
    name: {type:DataTypes.STRING, unique:true, allowNull:false},
    price: {type:DataTypes.INTEGER, allowNull: false},
    rating:{type:DataTypes.INTEGER, defaultValue: 0},
    img:{type:DataTypes.STRING, allowNull:false}
})

const Type = sequelize.define('type',{
    id:{type:DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
    name:{type:DataTypes.STRING, unique:true, allowNull:false},
})

const Developer = sequelize.define('developer',{
    id:{type:DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
    name:{type:DataTypes.STRING, unique:true, allowNull:false},
    email:{type:DataTypes.STRING, unique:true},
    INN:{type:DataTypes.STRING, unique:true},
    telephone:{type:DataTypes.STRING}
})

const Rating = sequelize.define('rating',{
    id:{type:DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
    rate:{type:DataTypes.INTEGER, allowNull:false},
})
const AppInfo = sequelize.define('AppInfo',{
    id:{type:DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
    title:{type:DataTypes.STRING, allowNull:false},
    description:{type:DataTypes.STRING,  allowNull:false},
})

const Language = sequelize.define('language',{
    id:{type:DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
    name:{type:DataTypes.STRING, unique:true, allowNull:false},
})

const OC = sequelize.define('OC',{
    id:{type:DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
    name:{type:DataTypes.STRING, allowNull:false},
    categoryOC:{type:DataTypes.STRING, allowNull:false},
})

const License = sequelize.define('license',{
    id:{type:DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
    licenseApp:{type:DataTypes.STRING, unique:true, allowNull:false},
})

const UserBuy = sequelize.define('UserBuy',{
    id:{type:DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
    date:{type:DataTypes.DATE,  allowNull:false},
})

const Version = sequelize.define('Version',{
    id:{type:DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
    name:{type:DataTypes.STRING, unique:true, allowNull:false},
})

const DateOfAction = sequelize.define('DateOfAction',{
    id:{type:DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
    name:{type:DataTypes.STRING, unique:true, allowNull:false},
})

const LanguageApp = sequelize.define('LanguageApp',{
    id:{type:DataTypes.INTEGER, primaryKey:true, autoIncrement:true}
})


const OCApp = sequelize.define('OCApp',{
    id:{type:DataTypes.INTEGER, primaryKey:true, autoIncrement:true}
})

const TypeDev = sequelize.define('TypeDev',{
    id:{type:DataTypes.INTEGER, primaryKey:true, autoIncrement:true}
})
//Внешние связи
User.hasOne(Basket)
Basket.belongsTo(User)

User.hasMany(Rating)
Rating.belongsTo(User)

Application.hasMany(Rating)
Rating.belongsTo(Application)

Basket.hasMany(BasketApp)
BasketApp.belongsTo(Basket)

Application.hasOne(BasketApp)
BasketApp.belongsTo(Application)

Type.hasMany(Application)
Application.belongsTo(Type)

Developer.hasMany(Application)
Application.belongsTo(Developer)

Type.belongsToMany(Developer, {through: TypeDev})
Developer.belongsToMany(Type, {through: TypeDev})

Application.hasMany(AppInfo, {as:'info'})
AppInfo.belongsTo(Application)

Language.hasMany(LanguageApp)
LanguageApp.belongsTo(Language)

Application.hasMany(LanguageApp)
LanguageApp.belongsTo(Application)

OC.hasMany(OCApp)
OCApp.belongsTo(OC)

Application.hasMany(OCApp)
OCApp.belongsTo(Application)

Application.hasMany(License, {as: 'license'})
License.belongsTo(Application)

Version.hasMany(License)
License.belongsTo(Version)

DateOfAction.hasMany(License, {as: 'data'})
License.belongsTo(DateOfAction)

Application.hasMany(UserBuy)
UserBuy.belongsTo(Application)

License.hasMany(UserBuy)
UserBuy.belongsTo(License)

module.exports = {
    User,
    Basket,
    BasketApp,
    Rating,
    Application,
    Type,
    Developer,
    TypeDev,
    AppInfo,
    LanguageApp,
    OCApp,
    Language,
    OC,
    License,
    UserBuy,
    Version,
    DateOfAction
}