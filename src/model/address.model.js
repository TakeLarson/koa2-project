const { DataTypes } = require('sequelize');
const seq = require('../db/seq');
const Goods = require('./good.model')

const Address  = seq.define('koa_address', {
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '用户id'
    },
    consignee: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: '收货人'
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: '地址'
    },
    phone: {
        type: DataTypes.CHAR(11),
        allowNull: false,
        comment: '手机号'
    },
    isDefault: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
        comment: '是否默认地址'
    },
},{
    paranoid: true,
});

Address.belongsTo(Goods, {
    foreignKey: 'goods_id',
    as: 'goods_info'
})

// Address.sync({ force: true });

module.exports = Address;
