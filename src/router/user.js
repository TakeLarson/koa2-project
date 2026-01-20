const Router = require('koa-router');
const { register, login, changePassword } = require('../controller/user.controller');
const { userValidate, verifyUser, crpytPassword, verifyLogin } = require('../middleware/user.middleware');
const { auth } = require('../middleware/auth.middleware');
const router = new Router({
    prefix: '/users',
});
//注册接口
router.post('/register', userValidate, verifyUser, crpytPassword, register);
//登录接口
router.post('/login', userValidate, verifyLogin,login);

router.patch('/', auth, crpytPassword, changePassword);
module.exports = router;
