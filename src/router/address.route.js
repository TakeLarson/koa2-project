const Router = require('koa-router')
const { auth } = require('../middleware/auth.middleware')
const { validator } = require('../middleware/address.middleware.js')

const { addAddress, findAllAddress, updateAddress, deleteAddress, setDefault } = require('../controller/address.controller')

const router = new Router({
    prefix: '/address',
})

router.post('/addAddress', auth, validator({
    consignee: 'string' ,
    address: 'string' ,
    phone: {type: 'string', format: /^1[3456789]\d{9}$/ },
}), addAddress)

router.get('/list', auth, findAllAddress)

router.post('/updateAddress', auth, updateAddress)
router.post('/delete', auth, validator({
    id: 'number'
}), deleteAddress)
router.post('/setDefault', auth, validator({
    id: 'number'
}), setDefault)


module.exports = router