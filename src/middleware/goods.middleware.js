
const { publishGoodsInfoError } = require('../constant/err.type');

const goodsValidate = async (ctx, next) => {
    const { goods_name, goods_price, goods_num, goods_img } = ctx.request.body;
    if (!goods_name || !goods_price || !goods_num || !goods_img) {
        ctx.app.emit('error', publishGoodsInfoError, ctx);
        return;
    }
    
    await next();
}


module.exports = {
    goodsValidate,
}