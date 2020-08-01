import DataStore from './DataStore';

/*
    作者: 石兴龙
    联系方式: 微信 Codingxiaoshi

    Sprite 类是所有动图的基类

    实现最基础的绘图接口
*/
export default class Sprite {
    constructor({
        img = null,
        srcX = 0,
        srcY = 0,
        srcW = 0,
        srcH = 0,
        x = 0, y = 0,
        width = 0, height = 0,
    }) {
        this.dataStore = DataStore.getInstance();
        this.canvas = DataStore.getInstance().canvas;
        this.ctx = this.dataStore.ctx;
        this.img = img;
        this.srcX = srcX;
        this.srcY = srcY;
        this.srcW = srcW;
        this.srcH = srcH;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    // 获取某个静态资源: Image
    static getImage (key) {
        return DataStore.getInstance().res.get(key)
    }

    // 绘图
    draw(
        // 图像实例
        img = this.img,

        // 图像坐标
        srcX = this.srcX,
        srcY = this.srcY,
        // 绘制图像的面积
        srcW = this.srcW,
        srcH = this.srcH,
        
        // 绘制在画布上的坐标
        x = this.x,
        y = this.y,
        // 绘制在画布上的面积
        width = this.width,
        height = this.height,
    ) {
        this.ctx.drawImage(
            img,
            srcX,
            srcY,
            srcW,
            srcH,
            x,
            y,
            width,
            height,
        )
    }
}