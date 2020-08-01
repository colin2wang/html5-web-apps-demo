import Sprite from '../base/Sprite';
import DataStore from '../base/DataSotre';
/*
    作者: 石兴龙
    联系方式: 微信 Codingxiaoshi

    靶子
*/
export default class Circular extends Sprite{
    constructor() {
        const img = Sprite.getImage('live_1');
        let canvas = DataStore.getInstance().canvas
        let width = canvas.width * 0.5
        let height = canvas.width * 0.5
        // 靶子的参数
        DataStore.getInstance().circular = {
            width: width,
            height: height,
            r: width / 2
        }
        super(
            img,
            0, 0,
            img.width, img.height,
            0, 0,
            width, height,
        )
        this.width = width;
        this.height = height;
        this.ctx = DataStore.getInstance().ctx;
        // 靶子上的子弹
        this.arrow = [];
        // 掉落时重力加速度
        this.isFlying = false;
        this.time = 0;
        this.rotate = Math.PI * 2;
        this.shake = false
    }
    // 子弹上靶
    push(v) {
        this.arrow.push(v)
        this.shake = true
    }
    draw(rotate, live) {
        let imgs = [
            Sprite.getImage('live_1'),
            Sprite.getImage('live_2'),
            Sprite.getImage('live_3'),
        ]
        this.live = live
        const { r, height, width } = DataStore.getInstance().circular
        const img = imgs[live - 1];
        // 晋级时，靶子被扎破
        if (this.isFlying) {
            let flyingImg = [
                Sprite.getImage(`live_${live}_left`),
                Sprite.getImage(`live_${live}_right`)
            ]
            let g = 0.98 / 2.5;
            let offsetY = (g * this.time * (this.time - 30)) / 2;
            // 左边
            this.ctx.save();
            this.ctx.translate(width, height + offsetY);
            this.rotate -= 0.015;
            this.ctx.rotate(this.rotate);
            this.time++;
            super.draw(
                flyingImg[0],
                0, 0,
                flyingImg[0].width, flyingImg[0].height,
                -r * 1.4, -r,
                r * 2, r * 2,
            )
            this.ctx.restore();

            // 右边
            this.ctx.save();
            this.ctx.translate(width, height + offsetY);
            this.ctx.rotate(-this.rotate)
            super.draw(
                flyingImg[1],
                0, 0,
                flyingImg[1].width, flyingImg[1].height,
                -r / 2, -r / 2,
                r * 1.5, r * 2,
            )
            this.ctx.restore();
        } else {
            this.ctx.save();
            let shake = this.shake === true ? 5 : 0
            this.ctx.translate(this.width, this.height + shake)
            this.ctx.rotate(rotate * Math.PI/180)
            super.draw(
                img,
                this.srcX, this.srcY,
                this.srcW, this.srcH,
                -r, -r,
                width, height
            );
            this.shake = false
            this.ctx.restore();
        }
    }
    // 晋级时，靶子被扎破
    flying() {
        this.isFlying = true
    }
    // 重置靶子
    reset() {
        this.isFlying = false
        this.time = 0
    }
}
