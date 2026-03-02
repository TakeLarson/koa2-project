  const {Op} = require('sequelize')
const Order = require('../model/order.model')
const { orderFormatError } = require('../constant/err.type')
  class OrderService {
    async addOrder(user_id, address_id, goods_info, total, order_number) {
        //先查询地址是否存在
        try {
            return await Order.create({
                    user_id,
                    address_id,
                    goods_info,
                    total,
                    order_number,
                })
        } catch (error) {
            console.error('创建订单失败:', error)
            throw orderFormatError
        }
        
    }

    async findAllOrders(user_id, pageNum, pageSize, status) {
        const offset = (pageNum - 1) * pageSize
        const {rows, count} = await Order.findAndCountAll({
            attributes: ['id', 'address_id', 'goods_info', 'total', 'createdAt'],
            where: { user_id, status: status || 0 },
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

    async updateOrder(id, status) {
        return  await Order.update({
            status,
        },{ 
            where: {
                id,
            }
        })
        
    }
 
}
module.exports = new OrderService()
