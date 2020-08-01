import DataStore from '../base/DataStore'
import Sprite from '../base/Sprite'
import Director from '../Director'

/*
    作者: 石兴龙
    联系方式: 微信 Codingxiaoshi

    Pencil 类[铅笔的基类]

    实现铅笔基本的绘制和移动接口
*/
export default class Pencil extends Sprite {
    constructor(image, top) {
        super(
            image,
            0, 0,
            image.width, image.height,
            // 从最右侧开始
            DataStore.getInstance().canvas.width, 0,
            image.width, image.height
        )
        this.top = top;
    }
    draw() {
        this.x = this.x - Director.getInstance().moveSpeed;
        super.draw(
            this.img,
            0, 0,
            this.width, this.height,
            this.x, this.y,
            this.width, this.height
        )
    }
}
