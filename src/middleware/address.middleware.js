const {  addressFormatError } = require('../constant/err.type')
const validator = (rules) =>{
    return async (ctx, next) =>{
        try {
            ctx.verifyParams(rules)
        } catch (err) {
            addressFormatError.result = err
            ctx.app.emit('error', addressFormatError, ctx)
            return
        }
        await next()
    }
}

module.exports = {
    validator,
}