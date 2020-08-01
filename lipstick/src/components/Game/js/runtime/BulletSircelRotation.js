import Sprite from '../base/Sprite'
import DataStore from '../base/DataSotre'

/*
    作者: 石兴龙
    联系方式: 微信 Codingxiaoshi

    跟随靶子旋转的子弹
*/
export default class BulletSircelRotation extends Sprite {
    constructor(delta) {
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
        this.ctx = DataStore.getInstance().ctx;
        this.width = width
        this.height = height
        this.delta = delta
    }
    draw(
        w, h, live,
        insertHeight,
        rotate,
    ) {
        // 子弹的三种等级
        let liveMap = [
            [0, 0],
            [66, 0],
            [132, 0],
        ]
        let [x, y] = liveMap[live - 1];
        const { 
            width, 
            height,
            r
         } = DataStore.getInstance().circular

        this.ctx.save()
        this.ctx.translate(width, height)
        // 跟随靶子旋转
        this.ctx.rotate((rotate - this.delta) * Math.PI/180)
        super.draw(
            this.img,
            x, y,
            this.srcW, this.srcH,
            -(w / 2), r - insertHeight,
            w, h
        )
        this.ctx.restore()
    }
}
