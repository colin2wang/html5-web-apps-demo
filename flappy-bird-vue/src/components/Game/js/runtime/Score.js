import DataStore from '../base/DataStore';


/*
    作者: 石兴龙
    联系方式: 微信 Codingxiaoshi

    Score 类[游戏得分]

    绘制分数
    记录游戏得分
*/
export default class Score {
    constructor() {
        this.ctx = DataStore.getInstance().ctx;
        this.scoreNumber = 0;
        this.isScore = true;
    }
    draw() {
        const { width, height } = DataStore.getInstance().canvas;
        this.ctx.font = '25px Arial';
        this.ctx.fillStyle = '#ffcbeb';
        this.ctx.fillText(
            this.scoreNumber,
            width / 2,
            height / 18,
            375,
        )
    }
}