const { cartFormatError } = require('../constant/err.type')
const validator = (rules) =>{
    return async (ctx, next) =>{
        try {
            ctx.verifyParams(rules)
        } catch (err) {
            cartFormatError.result = err
            ctx.app.emit('error', cartFormatError, ctx)
            return
        }
        await next()
    }
}

module.exports = {
    validator,
}