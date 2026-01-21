const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/config.default');
const auth = async (ctx, next) => {
    const { authorization } = ctx.request.header;
    const token = authorization.split(' ')[1];
    // console.log('认证请求:', token);
    try {
        const payload = jwt.verify(token, JWT_SECRET);
        ctx.state.user = payload;
    } catch (err) {
        switch (err.name) {
            case 'TokenExpiredError':
                ctx.app.emit('error', {
                    code: '10009',
                    msg: '认证过期',
                    result: '',
                }, ctx);
                return;
            case 'JsonWebTokenError':
                ctx.app.emit('error', {
                    code: '10008',
                    msg: '认证失败,token无效',
                    result: '',
                }, ctx);
                return;
            default:
                console.error('认证失败:', err.message);
                ctx.app.emit('error', {
                    code: '10008',
                    msg: '认证失败',
                    result: '',
                }, ctx);
                return;
        }
    }
    
    // 移除认证成功的响应，让后续的路由处理函数设置响应
    await next();
}

module.exports = {
    auth,
}