const Router = require('koa-router')
const { auth } = require('../middleware/auth.middleware')
const { validator } = require('../middleware/order.middleware.js')

const { addOrder, findAllOrders, updateOrder } = require('../controller/order.controller')

const router = new Router({
    prefix: '/orders',
})

router.post('/', auth, validator({
    address_id: 'number' ,
    goods_info: 'string' ,
    total:  'number',
}), addOrder)

router.get('/list', auth, findAllOrders)

router.post('/updateAddress', auth, updateOrder)

module.exports = router