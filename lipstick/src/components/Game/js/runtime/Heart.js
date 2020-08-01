import Sprite from '../base/Sprite'
import DataStore from '../base/DataSotre'

/*
    作者: 石兴龙
    联系方式: 微信 Codingxiaoshi

    等级心脏
*/
export default class Heart extends Sprite {
    constructor(text) {
        const img = Sprite.getImage('heart')
        super(
            img,
            0, 0,
            img.width, img.height,
            0, 0,
            img.width, img.height,
        )
        this.text = text
    }
    
    draw(x, y, isActive) {
        const img = Sprite.getImage(isActive ? 'heart' : 'heart_grey')
        super.draw(
            img,
            this.srcX, this.srcY,
            this.img.width, this.img.height,
            x, y,
            this.img.width, this.img.height,
        )
        let ctx = DataStore.getInstance().ctx;
        ctx.font="16px Microsoft YaHei";
        ctx.fillStyle="#fff";
        ctx.textAlign = 'center';
        ctx.fillText(
            this.text,
            x + this.img.width / 2,
            y + this.img.height / 2 + 4,
        )
    }
}
