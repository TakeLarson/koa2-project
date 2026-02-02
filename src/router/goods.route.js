const Router = require('koa-router')

const { upload, create, update } = require('../controller/goods.controller');
const { auth, hadAdminPermission } = require('../middleware/auth.middleware');
const { goodsValidate } = require('../middleware/goods.middleware');

const router = new Router({
    prefix: '/goods'
})

router.post('/upload', auth, hadAdminPermission, upload)
router.post('/create',  auth, hadAdminPermission, goodsValidate, create)
router.put('/update/:id', auth, hadAdminPermission, goodsValidate, update)
module.exports = router