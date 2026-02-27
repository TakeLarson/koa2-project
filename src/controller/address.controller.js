const { addressFormatError } = require('../constant/err.type')
const { addAddress, findAddresses, updateAddress, deleteAddress, setDefault } = require('../service/address.service.js')
class AddressController {
    async addAddress(ctx) {

        ctx.body = ctx.state.user.dataValues
        const user_id = ctx.state.user.dataValues.id
        // const goods_id = ctx.request.body.goods_id
        // const count = ctx.request.body.count
        //操作数据库
        const { consignee, address, phone } = ctx.request.body
        if (!consignee || !address || !phone) {
          addressFormatError.msg = '收货人、地址、手机号不能为空'
          return ctx.app.emit('error', addressFormatError, ctx)
        }

        const res = await addAddress(user_id, consignee, address, phone)
        ctx.body = {
            code: 200,
            msg: '添加地址成功',
            result: res,
        }


    }
    
    async findAllAddress(ctx) {
        const { pageNum, pageSize } = ctx.query
        const user_id = ctx.state.user.dataValues.id
        const res = await findAddresses(user_id, pageNum, pageSize)
        ctx.body = {
            code: 200,
            msg: '查询地址成功',
            result: res,
        }
    }
    
    async updateAddress(ctx) {
        const { id, consignee, address, phone, isDefault } = ctx.request.body
        if (consignee === undefined && address === undefined && phone === undefined && isDefault === undefined) {
          addressFormatError.msg = '收货人、地址、手机号、是否默认地址不能为空'
          return ctx.app.emit('error', addressFormatError, ctx)
        }

        //操作数据库
        const res = await updateAddress({id, consignee, address, phone, isDefault})
        if(res) {
            ctx.body = {
                code: 200,
                msg: '更新地址成功',
                result: res,
            }
        } else {
            addressFormatError.msg = '更新地址失败'
            ctx.app.emit('error', addressFormatError, ctx)
        }
    }
    
    async deleteAddress(ctx) {
        const { id } = ctx.request.body;
        console.log('滴滴滴',id);
        if (!id) {
          addressFormatError.msg = 'id不能为空'
          return ctx.app.emit('error', addressFormatError, ctx)
        }
        
        //操作数据库
        const res = await deleteAddress(id)
        ctx.body = {
            code: 200,
            msg: '删除地址成功',
            result: res,
        }
    }
    
    async setDefault(ctx) {
        const { id } = ctx.request.body;
        if (!id) {
          addressFormatError.msg = 'id不能为空'
          return ctx.app.emit('error', addressFormatError, ctx)
        }
        const user_id = ctx.state.user.dataValues.id
        //操作数据库
        const res = await setDefault(user_id, id)
        ctx.body = {
            code: 200,
            msg: '设置默认地址成功',
            result: res,
        }
    }
}

module.exports = new AddressController()