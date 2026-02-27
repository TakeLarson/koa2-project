const {  orderFormatError } = require('../constant/err.type')
const validator = (rules) =>{
    return async (ctx, next) =>{
        try {
            ctx.verifyParams(rules)
        } catch (err) {
            orderFormatError.result = err
            ctx.app.emit('error', orderFormatError, ctx)
            return
        }
        await next()
    }
}

module.exports = {
    validator,
}