import DataSotre from '../base/DataSotre';
/*
    作者: 石兴龙
    联系方式: 微信 Codingxiaoshi

    Sprite 类的职责是[所有动图的负类]

    这里提供最基础的绘图方法
*/
export default class Sprite {
    constructor(
        img = null,
        srcX = 0,
        srcY = 0,
        srcW = 0,
        srcH = 0,
        x = 0, y = 0,
        width = 0, height = 0,
    ) {
        this.dataStore = DataSotre.getInstance();
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

    static getImage(k) {
        return DataSotre.getInstance().res.get(k);
    }

    draw(
        img = this.img,
        srcX = this.srcX,
        srcY = this.srcY,
        srcW = this.srcW,
        srcH = this.srcH,
        x = this.x,
        y = this.y,
        width = this.width,
        height = this.height,
    ) {
        this.ctx.drawImage(
            img,
            srcX, srcY,
            srcW, srcH,
            x, y,
            width, height,
        )
    }
}