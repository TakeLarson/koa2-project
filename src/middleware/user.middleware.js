const { getUser } = require('../service/user.service');
const { userFormatError, userAlreadyExisted } = require('../constant/err.type');

const userValidate = async (ctx, next) => {
    const { user_name, password } = ctx.request.body;
    if (!user_name || !password) {
        ctx.app.emit('error', userFormatError, ctx);
        return;
    }
    
    await next();
}

const verifyUser = async (ctx, next) => {
    const { user_name } = ctx.request.body;
    if (await getUser({ user_name })) {
        ctx.app.emit('error', userAlreadyExisted, ctx);
        return;
    }
    await next();
}

module.exports = {
    userValidate,
    verifyUser,
}