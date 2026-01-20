const User = require('../model/user.model');

class UserService {
    async createUser(user_name, password) {
        const res = await User.create({
            user_name,
            password
        });
        return res;
    }

    async getUser({id, user_name, password, is_admin}) {
        const whereOpt = {};
        
        id && Object.assign(whereOpt, {id});
        user_name && Object.assign(whereOpt, {user_name});
        password && Object.assign(whereOpt, {password});
        is_admin && Object.assign(whereOpt, {is_admin});
        const res = await User.findOne({
            attributes: ['id', 'user_name', 'password', 'is_admin'],
            where: whereOpt,
        });
        return res;
    }
    async login(ctx, next) {
        ctx.body = '登录成功';
    }
    async updateById({ id, user_name, password, is_admin }) {
        // const id = ctx.state.user.id;
        // console.log('用户 ', id, ' 尝试修改密码:', password);
        // ctx.body = {
        //     code: 0,
        //     msg: '修改密码成功',
        //     result: {},
        // };
    }
}
module.exports = new UserService();