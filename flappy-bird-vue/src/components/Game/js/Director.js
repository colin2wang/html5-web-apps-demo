import DataStore from './base/DataStore';
import UpPencil from './runtime/UpPencil'
import DownPencil from './runtime/DownPencil'

/*
    作者: 石兴龙
    联系方式: 微信 Codingxiaoshi

    Director 类[导演类]
    
    调度所有对象, 实现游戏世界中的逻辑
*/

export default class Director {
    static getInstance() {
        if (!Director.instance) {
            Director.instance = new Director();
        }
        return Director.instance;
    }
    constructor() {
        this.dataStore = DataStore.getInstance();
        this.moveSpeed = 2;
        this.isGameOver = true;
    }
    createPencil() {
        const { height } = DataStore.getInstance().canvas
        const minTop = height / 8;
        const maxTop = height / 2;
        const top = minTop + Math.random() * (maxTop - minTop);
        this.dataStore.get('pencils').push(
            new UpPencil(top),
            new DownPencil(top)
        )
    }
    birdsEvent() {
        for (let i = 0; i <= 2; i++) {
            this.dataStore.get('birds').y[i] = this.dataStore.get('birds').birdsY[i];
        }
        this.dataStore.get('birds').time = 0;
    }
    static isStrike(bird, pencil) {
        if (
            bird.top > pencil.bottom ||
            bird.bottom < pencil.top ||
            bird.right < pencil.left ||
            bird.left > pencil.right
        ) {
            return false
        }
        return true
    }
    check() {
        const birds = this.dataStore.get('birds');
        const land = this.dataStore.get('land');
        const pencils = this.dataStore.get('pencils');
        const score = this.dataStore.get('score');

        // 是否碰到地面
        if (birds.birdsY[0] + birds.birdsHeight[0] >= land.y) {
            console.log('撞到地板, 游戏结束');
            this.isGameOver = true
            return
        }

        // 是否碰到铅笔
        // 小鸟边框模型
        const birdsBorder = {
            top: birds.y[0],
            bottom: birds.birdsY[0] + birds.birdsHeight[0],
            left: birds.birdsX[0],
            right: birds.birdsX[0] + birds.birdsWidth[0]
        }
        for (let i = 0; i < pencils.length; i++) {
            const pencil = pencils[i];
            const pencilBorder = {
                top: pencil.y,
                bottom: pencil.y + pencil.height,
                left: pencil.x,
                right: pencil.x + pencil.width
            }
            if (Director.isStrike(birdsBorder, pencilBorder)) {
                console.log('碰到水管了');
                this.isGameOver = true;
                return;
            }
        }
        if (birds.birdsX[0] > (pencils[0].x + pencils[0].width) && 
            score.isScore
        ) {
            score.isScore = false;
            score.scoreNumber++;
        }
    }
    run () {
        this.check();
        if (!this.isGameOver) {
            const { canvas } = this.dataStore
            const penciles = this.dataStore.get('pencils');

            this.dataStore.get('background').draw();

            // 第一组铅笔走到最左侧时，销毁第一组
            if (penciles[0].x + penciles[0].width <= 0 && 
                penciles.length === 4) {
                penciles.shift();
                penciles.shift();
                this.dataStore.get('score').isScore = true;
            }

            // 第一跟铅笔走到一半时, 创建第二组
            if (penciles[0].x <= (canvas.width - penciles[0].width) / 2 &&
                penciles.length === 2
            ) {
                this.createPencil()
            }

            this.dataStore.get('pencils').forEach((pencilItem) => {
                pencilItem.draw();
            })

            this.dataStore.get('land').draw();
            this.dataStore.get('score').draw();
            this.dataStore.get('birds').draw();
            
            let timer = requestAnimationFrame(() => this.run());
            this.dataStore.put('timer', timer);
        } else {
            console.log('游戏结束')
            this.dataStore.get('startButton').draw();
            cancelAnimationFrame(this.dataStore.get('timer'));
            this.dataStore.destroy();
        }
    }
}