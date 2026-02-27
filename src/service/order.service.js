  const {Op} = require('sequelize')
const Order = require('../model/order.model')
const { orderFormatError } = require('../constant/err.type')
  class OrderService {
    async addOrder(user_id, address_id, goods_info, total, order_number) {
        //先查询地址是否存在
        console.log('打印',user_id, order_number,address_id, goods_info, total);
        try {
            //解析goods_info为JSON
            const parsedGoodsInfo = typeof goods_info === 'string' ? JSON.parse(goods_info) : goods_info
            return await Order.create({
                    user_id,
                    address_id,
                    goods_info: parsedGoodsInfo,
                    total,
                    order_number,
                })
        } catch (error) {
            console.error('创建订单失败:', error)
            throw orderFormatError
        }
        // const existingOrder = await Order.findOne({
        //     where: {
        //         user_id,
        //         order_number,
        //         address_id,
        //         goods_info,
        //         total,
        //     }
        // })
        // if(existingOrder) {
        //     //如果订单中已经有了该订单，就不加，并提示订单重复
        //     throw orderFormatError
        // } else {
        //     //如果订单中没有该订单，就添加
        //    return await Order.create({
        //         user_id,
        //         address_id,
        //         goods_info,
        //         total,
        //         order_number,
        //     })
        // }
        
    }

    async findAllOrders(user_id, pageNum, pageSize) {
        const offset = (pageNum - 1) * pageSize
        const {rows, count} = await Order.findAndCountAll({
            attributes: ['id', 'address_id', 'goods_info', 'total', 'createdAt'],
            where: { user_id },
            offset,
            limit: pageSize * 1,
        })

        
        return {
            pageNum,
            pageSize,
            total: count,
            list: rows,
        }
    }

    async updateOrder({id, address_id, goods_info, total}) {
        const res = await Order.findByPk(id)
        if(res) {
            if(address_id !== undefined) {
                res.address_id = address_id
            }
            if(goods_info !== undefined) {
                res.goods_info = goods_info
            }
            if(total !== undefined) {
                res.total = total   
            }
            return await res.save()
        } else {
            return res
        }
    }
 
}
module.exports = new OrderService()
