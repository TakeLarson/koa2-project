  const {Op} = require('sequelize')
const Address = require('../model/address.model')
const { addressFormatError } = require('../constant/err.type')
  const Goods = require('../model/good.model')
  const { cartUpdateError, cartDeleteError } = require('../constant/err.type')
  class AddressService {
    async addAddress(user_id, consignee, address, phone) {
        //先查询地址是否存在
        const existingAddress = await Address.findOne({
            where: {
                user_id,
                consignee,
                address,
                phone,
            }
        })
        if(existingAddress) {
            //如果地址中已经有了该地址，就不加，并提示地址重复
            throw addressFormatError
        } else {
            //如果地址中没有该地址，就添加
           return await Address.create({
                user_id,
                consignee,
                address,
                phone,
            })
        }
        
    }

    async findAddresses(user_id, pageNum, pageSize) {
        const offset = (pageNum - 1) * pageSize
        const {rows, count} = await Address.findAndCountAll({
            attributes: ['id', 'consignee', 'address', 'phone', 'isDefault'],
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

    async updateAddress({id, consignee, address, phone, isDefault}) {
        const res = await Address.findByPk(id)
        if(res) {
            if(consignee !== undefined) {
                res.consignee = consignee
            }
            if(address !== undefined) {
                res.address = address
            }
            if(phone !== undefined) {
                res.phone = phone
            }
            if(isDefault !== undefined) {
                res.isDefault = isDefault
            }
            return await res.save()
        } else {
            return res
        }
    }

    async deleteAddress(id) {
        const res = await Address.destroy({
            where: {
                id
            }
        })
        console.log('删除地址打印',res);
        
        if(res) {
            return res
        } else {
            throw addressFormatError
        }
    }

    async setDefault(user_id, id) {
        const res = await Address.update({
            isDefault: true
        },{
            where: {
                user_id,
                id,
            }
        })
        if(res) {
            return res
        } else {
            throw addressFormatError
        }
    }

 
}
module.exports = new AddressService()
