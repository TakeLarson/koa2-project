const { createUser, getUser } = require('../service/user.service');
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
        ctx.body = '登录成功';
    }
}
module.exports = new UserController();