const Router = require('koa-router')
const { auth } = require('../middleware/auth.middleware')
const { validator } = require('../middleware/cart.middleware')

const { addCart, findAllcart, updateCart, deleteCart, selectAll, unSelectAll, getBadge } = require('../controller/cart.controller')

const router = new Router({
    prefix: '/carts',
})

router.post('/add', auth, validator({
    goods_id: 'number' ,
    count: 'number' ,
}), addCart)
router.get('/list', auth, findAllcart)

router.patch('/:id', auth, validator({
    number: { type: 'number', required: false } ,
    selected: { type: 'bool', required: false } ,
}), updateCart)

router.post('/delete', auth, validator({
    ids: { type: 'array'} 
}), deleteCart)

router.post('/selectAll', auth, selectAll)
router.post('/unSelectAll', auth, unSelectAll)
router.get('/getBadge', auth, getBadge)
module.exports = router