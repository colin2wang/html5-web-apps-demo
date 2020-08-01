import DataStore from '../base/DataSotre'

/*
    作者: 石兴龙
    联系方式: 微信 Codingxiaoshi

    时间
*/
export default class Timer {
    constructor() {
        this.ctx = DataStore.getInstance().ctx;
        // 圆的半径
        this.r = 30
    }
    draw(x, y, text) {
        x = x - this.r - 10;
        y = this.r + 10 + y;
        this.ctx.beginPath();
        // 绘制圆形
        this.ctx.arc(x, y, this.r, 0, Math.PI * 2)
        this.ctx.fillStyle = '#FF6895'
        this.ctx.fill();
        // 绘制文字
        this.ctx.font = '30px Microsoft YaHei';
        this.ctx.fillStyle="#fff";
        this.ctx.fillText(text, x, y + 10);
        this.ctx.closePath();
    }
}