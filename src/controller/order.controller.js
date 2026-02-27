const { orderFormatError } = require('../constant/err.type')
const { addOrder, findAllOrders, updateOrder } = require('../service/order.service.js')
class OrderController {
    async addOrder(ctx) {

        const user_id = ctx.state.user.dataValues.id
        //操作数据库
        const { address_id, goods_info, total } = ctx.request.body
        if (!address_id || !goods_info || !total) {
          orderFormatError.msg = '地址ID、商品信息、总价不能为空'
          return ctx.app.emit('error', orderFormatError, ctx)
        }
      
        const order_number = 'XSC' + Date.now()
        
        const res = await addOrder(user_id, address_id, goods_info, total, order_number)
        console.log('打印2',res);
        if(res) {
            ctx.body = {
                code: 200,
                msg: '添加订单成功',
                result: res,
            }
        } else {
            orderFormatError.msg = '添加订单失败'
            ctx.app.emit('error', orderFormatError, ctx)
        }


    }
    
    async findAllOrders(ctx) {
        const { pageNum, pageSize } = ctx.query
        const user_id = ctx.state.user.dataValues.id
        const res = await findAllOrders(user_id, pageNum, pageSize)
        ctx.body = {
            code: 200,
            msg: '查询订单成功',
            result: res,
        }
    }
    
    async updateOrder(ctx) {
        const { id, address_id, goods_info, total } = ctx.request.body
        if (address_id === undefined && goods_info === undefined && total === undefined) {
          orderFormatError.msg = '地址、商品信息、总价不能为空'
          return ctx.app.emit('error', orderFormatError, ctx)
        }

        //操作数据库
        const res = await updateOrder({id, address_id, goods_info, total})
        if(res) {
            ctx.body = {
                code: 200,
                msg: '更新订单成功',
                result: res,
            }
        } else {
            orderFormatError.msg = '更新订单失败'
            ctx.app.emit('error', orderFormatError, ctx)
        }
    }
    
   
    
    
}

module.exports = new OrderController()
