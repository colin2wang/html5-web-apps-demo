import DataStore from './base/DataStore';
import GameConf from '../../Enum/gameConf'

/*
    作者: 石兴龙
    联系方式: 微信 Codingxiaoshi
    Director 类[导演类]
    
    调度所有对象, 实现游戏世界中的逻辑

    前端如何自学？
    前端书籍分享（PDF）
    程序员的简历是什么样的
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
        this.ctx = this.dataStore.ctx;
        this.canvas = this.dataStore.canvas;
        this.isGameOver = true;
        this.gameConf = GameConf;
        this.frime = 0;
    }
    run() {
        if (!this.isGameOver) {

            const { canvas, ctx } = this.dataStore;
            ctx.clearRect(0,0, canvas.width, canvas.height);
            // 游戏实体类
            let role = this.dataStore.get('role')
            role.show();

            // 循环绘制
            let timer = requestAnimationFrame(() => this.run());
            this.dataStore.put('timer', timer);
        } else {
            console.log('游戏结束')
            cancelAnimationFrame(this.dataStore.get('timer'));
            this.dataStore.destroy();
        }
    }
}