const jwt = require('jsonwebtoken');
const { createUser, getUser } = require('../service/user.service');
const { JWT_SECRET } = require('../config/config.default');
const { userLoginError } = require('../constant/err.type');
class UserController {
    async register(ctx, next) {
        console.log(ctx.request.body);
        const {user_name, password} = ctx.request.body;
        const res = await createUser(user_name, password);
        ctx.body = {
            code: 0,
            msg: '注册成功',
            result: {
                id: res.id,
                user_name: res.user_name,
            }
        };
    }
    async login(ctx, next) {
        const { user_name } =ctx.request.body;
        try {
            const {password, ...res} = await getUser({ user_name });
           
            const token = jwt.sign(res, JWT_SECRET, { expiresIn: '100d' });
            ctx.body = {
                code: 0,
                msg: '登录成功',
                result: {
                    token,
                }
            };
        } catch (err) {
            return ctx.app.emit('error', userLoginError, ctx);
        }
        
    }

    async changePassword(ctx, next) {
        const id = ctx.state.user.id;
        const { password } = ctx.request.body;
        console.log('用户 ', id, ' 尝试修改密码:', password);
        // ctx.body = {
        //     code: 0,
        //     msg: '修改密码成功',
        //     result: {},
        // };
    }
}
module.exports = new UserController();