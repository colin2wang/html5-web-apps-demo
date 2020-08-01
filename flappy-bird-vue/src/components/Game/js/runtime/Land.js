import DataStore from '../base/DataStore';
import Director from '../Director';
import Sprite from '../base/Sprite';

/*
    作者: 石兴龙
    联系方式: 微信 Codingxiaoshi

    Land 类[不断移动的地板]
*/
export default class Land extends Sprite {
    constructor() {
        const image = Sprite.getImage('land');
        super(
            image,
            0,0,
            image.width, image.height,
            0, DataStore.getInstance().canvas.height - image.height,
            image.width, image.height,
        )
        // 地板的 X 坐标
        this.landX = 0;
        // 地板移动的速度
        this.landSpeed = Director.getInstance().moveSpeed;
    }
    draw() {
        this.landX = this.landX - this.landSpeed;
        if (Math.abs(this.landX) > (this.img.width - DataStore.getInstance().canvas.width)) {
            this.landX = 0;
        }
        super.draw(
            this.img,
            this.srcX,
            this.srcY,
            this.srcW,
            this.srcH,
            this.landX,
            this.y,
            this.width,
            this.height
        )
    }
}
