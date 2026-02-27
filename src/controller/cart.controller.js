const { cartFormatError } = require('../constant/err.type')
const { createOrUpdateCart, findCarts, updateCart, deleteCart, selectAll, unSelectAll, getBadge } = require('../service/cart.service')
class CartController {
    async addCart(ctx) {

        ctx.body = ctx.state.user.dataValues
        const user_id = ctx.state.user.dataValues.id
        const goods_id = ctx.request.body.goods_id
        const count = ctx.request.body.count
        //操作数据库

        const res = await createOrUpdateCart(user_id, goods_id, count)
        ctx.body = {
            code: 200,
            msg: '添加到购物车成功',
            result: res,
        }


    }
    
    async findAllcart(ctx) {
        const { pageNum, pageSize } = ctx.query
        const user_id = ctx.state.user.dataValues.id
        const res = await findCarts(user_id, pageNum, pageSize)
        ctx.body = {
            code: 200,
            msg: '查询购物车成功',
            result: res,
        }
    }
    
    async updateCart(ctx) {

        const { id } = ctx.request.params;
        
        const { number, selected } = ctx.request.body
        if (number === undefined && selected === undefined) {
          cartFormatError.msg = 'number和selected不能为空'
          return ctx.app.emit('error', cartFormatError, ctx)
        }

        //操作数据库
        const res = await updateCart({id, number, selected})
        ctx.body = {
            code: 200,
            msg: '更新购物车成功',
            result: res,
        }
    }
    
    async deleteCart(ctx) {
        const { ids } = ctx.request.body;
        if (ids.length === 0) {
          cartFormatError.msg = 'ids不能为空'
          return ctx.app.emit('error', cartFormatError, ctx)
        }
        //操作数据库
        const res = await deleteCart(ids)
        ctx.body = {
            code: 200,
            msg: '删除购物车成功',
            result: res,
        }
    }
    
    async selectAll(ctx) {
        const user_id = ctx.state.user.dataValues.id;
        
        //操作数据库
        const res = await selectAll(user_id)
        ctx.body = {
            code: 200,
            msg: '全选成功',
            result: res,
        }
    }

    async unSelectAll(ctx) {
        const user_id = ctx.state.user.dataValues.id;
        
        //操作数据库
        const res = await unSelectAll(user_id)
        ctx.body = {
            code: 200,
            msg: '取消全选成功',
            result: res,
        }
    }

    async getBadge(ctx) {
        const user_id = ctx.state.user.dataValues.id;
        const res = await getBadge(user_id)
        ctx.body = {
            code: 200,
            msg: '获取购物车数量成功',
            result: res,
        }
    }
}

module.exports = new CartController()