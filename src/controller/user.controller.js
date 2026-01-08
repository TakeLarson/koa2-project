class UserController {
    async register(ctx, next) {
        ctx.body = '注册成功';
    }
}
module.exports = new UserController();