
import DataStore from '../base/DataStore'
import Sprite from '../base/Sprite'

/*
    作者: 石兴龙
    联系方式: 微信 Codingxiaoshi

    BackGround 类[绘制游戏背景]
*/
export default class BackGround extends Sprite{
    constructor() {
        // 拿到静态资源, 传递给父类
        const image = Sprite.getImage('background');
        super(
            image,
            0, 0,
            image.width, image.height,
            0, 0,
            DataStore.getInstance().canvas.width,
            DataStore.getInstance().canvas.height
        )
    }
}