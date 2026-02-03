const Goods = require('../model/good.model');
class GoodsService {
    async createGoods(goods) {
       const res = await Goods.create(goods)
       return res.dataValues
    }
    async updateGoods(id, goods) {
        const res = await Goods.update(goods, {
            where: {
                id,
            }
        })
        return res[0] > 0 ? true : false
    }
    async deleteGoods(id) {
        const res = await Goods.destroy({
            where: {
                id,
            }
        })
        return res ? true : false
    }
    async restoreGoods(id) {
        const res = await Goods.restore({
            where: {
                id,
            }
        })
        return res ? true : false
    }
}

module.exports = new GoodsService();