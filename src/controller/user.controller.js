const jwt = require('jsonwebtoken');
const { createUser, getUser, updateById } = require('../service/user.service');
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
        try {
            
            const id = ctx.state.user.dataValues.id;
            console.log('看看内容',id);
            const { password } = ctx.request.body;
            
            if (!password) {
                ctx.status = 400;
                ctx.body = {
                    code: '10001',
                    msg: '密码不能为空',
                    result: ''
                };
                return;
            }
            
            await updateById({id, password});
            
            ctx.body = {
                code: 0,
                msg: '密码修改成功',
                result: ''
            };
        } catch (err) {
            ctx.status = 500;
            ctx.body = {
                code: '10005',
                msg: '密码修改失败',
                result: ''
            };
        }
    }
}
module.exports = new UserController();