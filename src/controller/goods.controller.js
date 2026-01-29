const path = require('path');
const fs = require('fs');
const { goodsImgUploadError, goodsImgFormatError } = require('../constant/err.type');

class GoodsController {
    async upload(ctx, next) {
        const { file } = ctx.request.files;
        const fileTypes = ['image/jpeg', 'image/png', 'image/gif'];
        
        if (!fileTypes.includes(file.mimetype)) {
            ctx.app.emit('error', goodsImgFormatError, ctx);
            fs.unlinkSync(file.filepath);
            return;
        }
        
        console.log('上传文件:',file.filepath);
        if(file){
            ctx.body = {
                code: 0,
                msg: '商品图片上传成功',
                result: {
                    goods_img: path.basename(file.filepath),
                }
            };
        }else{
            ctx.app.emit('error', goodsImgUploadError, ctx);
        }
    }
}
module.exports = new GoodsController();