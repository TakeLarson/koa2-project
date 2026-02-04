const path = require('path');
const fs = require('fs');
const { goodsImgUploadError, goodsImgFormatError, publishGoodsError, invalidGoodsID, deleteGoodsError, restoreGoodsError, findAllError } = require('../constant/err.type');
const { createGoods, updateGoods, deleteGoods, restoreGoods, findGoods } = require('../service/goods.service');

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

    async create(ctx, next) {
        try {
            const { updatedAt, createdAt, ...res } = await createGoods(ctx.request.body);
            ctx.body = {
                code: 0,
                msg: '发布商品成功',
                result: res,
            }
        } catch (error) {
            return ctx.app.emit('error', publishGoodsError, ctx);
        }
       
    }

    async update(ctx) {
        try {
            const res = await updateGoods(ctx.params.id, ctx.request.body);
            if(res){
                ctx.body = {
                    code: 0,
                    msg: '更新商品成功',
                    result: '',
                }
            }else{
                ctx.app.emit('error', invalidGoodsID, ctx);
                return;
            }
          
        } catch (error) {
            return ctx.app.emit('error', publishGoodsError, ctx);
        }
       
    }

    async deleteGoods(ctx) {
        try {
            const res = await deleteGoods(ctx.params.id);
            if(res){
                ctx.body = {
                    code: 0,
                    msg: '下架商品成功',
                    result: '',
                }
            }else{
                ctx.app.emit('error', invalidGoodsID, ctx);
                return;
            }
        } catch (error) {
            return ctx.app.emit('error', deleteGoodsError, ctx);
        }
    }
    async restoreGoods(ctx) {
        try {
            const res = await restoreGoods(ctx.params.id);
            if(res){
                ctx.body = {
                    code: 0,
                    msg: '上架商品成功',
                    result: '',
                }
            }else{
                ctx.app.emit('error', invalidGoodsID, ctx);
                return;
            }
        } catch (error) {
            return ctx.app.emit('error', restoreGoodsError, ctx);
        }
    }

    async findAll(ctx) {
        try {
            const { pageSize = 10, pageNum = 1 } = ctx.request.query;
            // const offset = (pageNum - 1) * pageSize;
            const res = await findGoods(pageSize, pageNum);
            
            ctx.body = {
                code: 0,
                msg: '查询商品列表成功',
                result: res
            }
        } catch (error) {
            return ctx.app.emit('error', findAllError, ctx);
        }
    }
}
module.exports = new GoodsController();