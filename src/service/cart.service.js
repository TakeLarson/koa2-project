  const {Op} = require('sequelize')
  const Cart = require('../model/cart.model')
  const Goods = require('../model/good.model')
  const { cartUpdateError, cartDeleteError } = require('../constant/err.type')
  class CartService {
    async createOrUpdateCart(user_id, goods_id, count) {
        const res = await Cart.findOne({
            where: {
                [Op.and]:{
                    user_id,
                    goods_id,
                }
            }
        })
        if(res) {
            //如果购物车中已经有了该商品，就更新数量
            await res.increment('number', {by: count})
            return await res.reload()
        } else {
            //如果购物车中没有该商品，就添加
           return await Cart.create({
                user_id,
                goods_id,
                number: count,
            })
        }
        
    }

    async findCarts(user_id, pageNum, pageSize) {
        const offset = (pageNum - 1) * pageSize
        const {rows, count} = await Cart.findAndCountAll({
            attributes: ['id', 'selected', 'number'],
            where: { user_id },
            offset,
            limit: pageSize * 1,
            include: {
                model: Goods,
                foreignKey: 'goods_id',
                as: 'goods_info',
                attributes: ['id', 'goods_name', 'goods_price', 'goods_img']
            },
        })

        
        return {
            pageNum,
            pageSize,
            total: count,
            list: rows,
        }
    }

    async updateCart({id, number, selected}) {
        const res = await Cart.findByPk(id)
        if(res) {
            if(number !== undefined) {
                res.number = number
            }
            if(selected !== undefined) {
                res.selected = selected
            }
            return await res.save()
        } else {
            throw cartUpdateError
        }
    }

    async deleteCart(ids) {
        const res = await Cart.destroy({
            where: {
                id: {
                    [Op.in]: ids,
                }
            }
        })
        if(res) {
            return res
        } else {
            throw cartDeleteError
        }
    }

    async selectAll(user_id) {
       
        
        const res = await Cart.update({
            selected: true
        },{
            where: {
                user_id,
            }
        })
        if(res) {
            return res
        } else {
            throw cartUpdateError
        }
    }

    async unSelectAll(user_id) {
       
        
        const res = await Cart.update({
            selected: false
        },{
            where: {
                user_id,
            }
        })
        if(res) {
            return res
        } else {
            throw cartUpdateError
        }
    }

    async getBadge(user_id) {
        const res = await Cart.count({
            where: {
                user_id,
            }
        })
        return res || 0
    }
}
module.exports = new CartService()