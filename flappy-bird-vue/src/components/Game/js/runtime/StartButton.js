import DataStore from '../base/DataStore'
import Sprite from '../base/Sprite'

/*
    作者: 石兴龙
    联系方式: 微信 Codingxiaoshi

    StartButton 类[开始按钮]

    绘制分数
    记录游戏得分
*/
export default class StartButton extends Sprite {
    constructor() {
        const image = Sprite.getImage('startButton');
        super(
            image,
            0,0,
            image.width, image.height,
            (DataStore.getInstance().canvas.width - image.width) / 2,
            (DataStore.getInstance().canvas.height - image.height) / 5,
            image.width, image.height
        )
    }
}