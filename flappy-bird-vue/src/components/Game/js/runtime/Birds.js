import Sprite from '../base/Sprite'
import DataStore from '../base/DataStore'

/*
    作者: 石兴龙
    联系方式: 微信 Codingxiaoshi

    Birds 类[绘制小鸟]

    绘制小鸟时要处理小鸟的"精灵图"逻辑和"坠落"逻辑
*/
export default class Birds extends Sprite {
    constructor() {
        const image = Sprite.getImage('birds');
        super(
            image,
            0,0,
            image.width, image.height,
            0,0,
            image.width, image.height
        )
        // 图片素材中 从左侧的空白
        let birdPaddingLeft = 9;
        // 每只小鸟的宽度
        let birdWidth = 34;

        // 在图片的 x 轴中找到小鸟的位置
        this.clippingX = [
            // 第一只小鸟的位置
            birdPaddingLeft, 
            // 第二只小鸟的位置
            birdPaddingLeft + birdWidth + (birdPaddingLeft * 2),
            // 第三只小鸟的位置
            birdPaddingLeft + birdWidth + (birdPaddingLeft * 2) + birdWidth + (birdPaddingLeft * 2)
        ]
        // 图片素材中 顶部的空白
        this.clippingY = [10, 10, 10]
        // 图片素材中 小鸟的宽度
        this.clippingWidth = [34,34,34]
        // 图片素材中 小鸟的高度
        this.clippingHeight = [24,24,24]
        const birdX = DataStore.getInstance().canvas.width / 4
        // 小鸟 x 轴的位置 注意: 小鸟的 X 轴是不变的
        this.birdsX = [birdX, birdX, birdX]
        const birdY = DataStore.getInstance().canvas.height / 2;
        // 小鸟 y 轴的位置
        this.birdsY = [birdY, birdY, birdY]
        this.birdsWidth = [birdWidth, birdWidth, birdWidth]
        const birdHeight = 24;
        this.birdsHeight = [birdHeight, birdHeight, birdHeight]
        // 小鸟实际的y轴位置
        this.y = [birdY, birdY, birdY]
        // 精灵图索引
        this.index = 0;
        // 索引累计
        this.count = 0;
        // 坠落的时间
        this.time = 0;
    }

    draw() {
        // 小鸟振翅的速度
        const speed = 0.2;

        this.count = this.count + speed;
        if (this.index >= 2) {
            this.count = 0;
        }
        // 精灵图索引逻辑
        this.index = Math.floor(this.count);

        // 每次点击, 小鸟跳跃的高度
        const offsetUp = 30

        // 重力加速度常量 (减轻重力 优化体验)
        const g = 0.98 / 2.5;
        // 小鸟 掉落的像素
        const offsetY = (g * this.time * (this.time - offsetUp)) / 2;

        for (let i = 0; i <= 2; i++) {
            this.birdsY[i] = this.y[i] + offsetY;
        }

        // 小鸟坠落的时间
        this.time++;

        super.draw(
            this.img,
            this.clippingX[this.index], this.clippingY[this.index],
            this.clippingWidth[this.index], this.clippingHeight[this.index],
            this.birdsX[this.index], this.birdsY[this.index],
            this.birdsWidth[this.index], this.birdsHeight[this.index]
        );
    }

}
