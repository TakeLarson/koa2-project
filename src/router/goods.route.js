const Router = require('koa-router')

const { upload, create, update, deleteGoods, restoreGoods, findAll } = require('../controller/goods.controller');
const { auth, hadAdminPermission } = require('../middleware/auth.middleware');
const { goodsValidate } = require('../middleware/goods.middleware');

const router = new Router({
    prefix: '/goods'
})

router.post('/upload', auth, hadAdminPermission, upload)
router.post('/create',  auth, hadAdminPermission, goodsValidate, create)
router.put('/update/:id', auth, hadAdminPermission, goodsValidate, update)
// router.delete('/delete/:id', auth, hadAdminPermission, deleteGoods)
router.post('/:id/off', auth, hadAdminPermission, deleteGoods)
router.post('/:id/on', auth, hadAdminPermission, restoreGoods)

router.get('/list', findAll)
module.exports = router