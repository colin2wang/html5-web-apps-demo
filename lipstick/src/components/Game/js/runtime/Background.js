import DataStore from '../base/DataSotre'
import Sprite from '../base/Sprite'

/*
    作者: 石兴龙
    联系方式: 微信 Codingxiaoshi

    游戏背景
*/
export default class Background extends Sprite {
    constructor() {
        const img = Sprite.getImage('bg')
        super(
            img,
            0, 0,
            img.width, img.height,
            0,0,
            DataStore.getInstance().canvas.width,
            DataStore.getInstance().canvas.height
        )
    }
}