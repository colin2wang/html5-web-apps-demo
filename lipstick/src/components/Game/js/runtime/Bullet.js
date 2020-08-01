import Sprite from '../base/Sprite'
import DataStore from '../base/DataSotre'

let liveMap = [
    [0, 0],
    [66, 0],
    [132, 0],
]

 /*
    作者: 石兴龙
    联系方式: 微信 Codingxiaoshi

    子弹
*/
export default class Bullet extends Sprite {
    constructor() {
        const img = Sprite.getImage('lipstick')
        let canvas = DataStore.getInstance().canvas
        let width = img.width / 3
        let height = img.height
        super(
            img,
            0, 0,
            width, height,
            (canvas.width / 2) - (width / 2), canvas.height - img.height - 10,
            width, height,
        )
        this.width = width
        this.height = height
        this.time = 0
        this.isFlying = false
    }
    draw(w, h, live, currentY) {
        let [x, y] = liveMap[live - 1];
        let canvas = DataStore.getInstance().canvas;
        this.width = w;
        this.height = h;
        this.live = live
        this.currentY = currentY
        let offsetY = 0
        this.ctx.save()
        this.ctx.translate(
            (canvas.width / 2),
            currentY + offsetY + (h / 2)
        )
        if (this.isFlying) {
            let g = 0.98 / 1.5;
            offsetY = (g * this.time * (this.time - 30)) / 2
            this.time++;
        }
        super.draw(
            this.img,
            x, y,
            this.srcW, this.srcH,
            -w/2 , -h/2 + offsetY,
            w, h
        )
        this.ctx.restore();
    }
    // 子弹弹飞
    flying() {
        this.isFlying = true
    }
    // 重置弹飞状态
    reset() {
        this.isFlying = false
    }
}
