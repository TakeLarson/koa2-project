const Router = require('koa-router');
const { register, login } = require('../controller/user.controller');
const {userValidate, verifyUser} = require('../middleware/user.middleware');
const router = new Router({
    prefix: '/users',
});
//注册接口
router.post('/register', userValidate, verifyUser, register);
//登录接口
router.post('/login', login);

module.exports = router;
