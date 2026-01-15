const { createUser, getUser } = require('../service/user.service');
class UserController {
    async register(ctx, next) {
        console.log(ctx.request.body);
        const {user_name, password} = ctx.request.body;
        if(!user_name || !password) {
            ctx.status = 400;
            ctx.body = {
                code: '10001',
                msg: '用户名或密码不能为空',
                result: null,
            };
            return;
        }
        if(await getUser({user_name})) {
            ctx.status = 409;
            ctx.body = {
                code: '10002',
                msg: '用户名已存在',
                result: null,
            };
            return;
        }
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