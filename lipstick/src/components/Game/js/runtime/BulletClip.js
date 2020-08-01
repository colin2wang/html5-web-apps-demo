import Sprite from '../base/Sprite'
import DataStore from '../base/DataSotre'

/*
    作者: 石兴龙
    联系方式: 微信 Codingxiaoshi

    子弹夹
*/
export default class BulletClip extends Sprite {
    constructor() {
        const img = Sprite.getImage('lipstick_grey')
        super(
            img,
            0,0,
            img.width, img.height,
            0,0,
            img.width, img.height,
        )
        this.width = img.width / 2
        this.height = img.height / 2
        this.dataStore = DataStore.getInstance()
    }

    // 绘制彩色子弹
    drawLipstick(y, i, live) {
        let img = Sprite.getImage('lipstick_active')
        let liveBulletConf = [
            [0, 0,],
            [0, 36],
            [0, 36 * 2],
        ]
        let [imgX, imgY] = liveBulletConf[live - 1]
        super.draw(
            img,
            imgX, imgY,
            this.img.width, this.img.height,
            10, y - ((this.height + 5) * i),
            this.widht, this.height
        )
    }

    // 绘制黑白子弹
    drawGrey(y, i) {
        super.draw(
            this.img,
            0, 0,
            this.img.width, this.img.height,
            10, y - ((this.height + 5) * i),
            this.width, this.height,
        )
    }

    // 绘制子弹夹
    draw(buuletClip, live) {
        const { max, used } = buuletClip
        let y = this.dataStore.canvas.height - (this.height + 10)
        for (let i = 0; i < max; i++) {
            if (max - used <= i) {
                this.drawGrey(y, i);
            } else {
                this.drawLipstick(y, i, live);
            }
        }
    }
}
