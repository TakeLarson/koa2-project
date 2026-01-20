const bcrypt = require('bcryptjs');
const { getUser } = require('../service/user.service');
const { userFormatError, userAlreadyExisted, userRegisterError, userDoesNotExist, invalidPassword, userLoginError } = require('../constant/err.type');

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
    try {
        const res = await getUser({ user_name });
        if (res) {
            logger.error('用户 ', user_name, ' 已存在');
            ctx.app.emit('error', userAlreadyExisted, ctx);
            return;
        }
    } catch (err) {
        ctx.app.emit('error', userRegisterError, ctx);
        return;
    }
    await next();
}

const crpytPassword = async (ctx, next) => {
    const { password } = ctx.request.body;
    const salt = bcrypt.genSaltSync(10);
    ctx.request.body.password = await bcrypt.hash(password, salt);
    await next();
}

const verifyLogin = async (ctx, next) => {
    const { user_name, password } = ctx.request.body;
    try {
        const res = await getUser({ user_name });
        if (!res) {
            console.error('用户 ', user_name, ' 不存在');
            ctx.app.emit('error', userDoesNotExist, ctx);
            return;
        }
        console.log('开始密码验证:', {
            inputPassword: password,
            storedPassword: res.password,
            passwordsMatch: bcrypt.compareSync(password, res.password)
        });
        
        if(!bcrypt.compareSync(password, res.password)){
            console.error('密码验证失败');
            ctx.app.emit('error', invalidPassword, ctx);
            return;
        }
        console.log('密码验证成功');
    } catch (err) {
        return ctx.app.emit('error', userLoginError, ctx);
    }

    await next();
}

module.exports = {
    userValidate,
    verifyUser,
    crpytPassword,
    verifyLogin,
}