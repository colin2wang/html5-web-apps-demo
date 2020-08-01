import DataStore from './js/base/DataStore';
import ResourceLoader from './js/base/ResourceLoader';
import Director from './js/Director'

import BackGround from './js/runtime/BackGround'
import Land from './js/runtime/Land'
import Score from './js/runtime/Score'
import StartButton from './js/runtime/StartButton'
import Birds from './js/runtime/Birds'
/*
    作者: 石兴龙
    联系方式: 微信 Codingxiaoshi

    Game 类[游戏入口类]
    
    负责游戏的转配工作
    1. 加载资源
    2. 创建对象
    3. 绑定动作
*/

export default class Game {
    constructor(canvas) {
        console.log('start game')
        this.canvas = canvas
        this.ctx = canvas.getContext('2d');
        this.dataStore = DataStore.getInstance();
        this.director = Director.getInstance();
        const loader = ResourceLoader.create();
        // 加载静态资源的回调
        loader.onLoaded(map => this.onResourceFirstLoaded(map))
    }
    onResourceFirstLoaded(map) {
        console.log('资源加载成功')
        this.dataStore.canvas = this.canvas;
        this.dataStore.ctx = this.ctx;
        this.dataStore.res = map;
        this.init()
    }
    init() {
        console.log('init')
        this.director.isGameOver = false;
        // 创建游戏中的对象实例
        this.dataStore
            .put('pencils', [])
            .put('background', new BackGround)
            .put('land', new Land)
            .put('score', new Score)
            .put('birds', new Birds)
            .put('startButton', new StartButton)

        // 绑定事件
        this.registerEvent()
        // 先创建两个铅笔
        this.director.createPencil();
        // 开始运行游戏
        this.director.run();
    }
    registerEvent() {

        // 游戏点击事件
        let fn = (e) => {
            e.preventDefault();
            console.log('touch canvas')
            // 游戏是否结束
            if (this.director.isGameOver) {
                console.log('game restart')
                // 重新启动游戏
                this.init();
            } else {
                // 每次点击，小鸟跳跃
                this.director.birdsEvent();
            }
        }

        this.canvas.addEventListener('touchstart', fn, false)
        this.canvas.addEventListener('click', fn, false)
    }
}
