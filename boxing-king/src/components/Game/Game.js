import DataStore from './base/DataStore';
import ResourceLoader from './base/ResourceLoader';
import Director from './Director'

import HeroFactory from './model/Hero/HeroFactory';
import GameConf from '../../Enum/gameConf';
import RoleConf from '../../Enum/roleConf';

/*
    作者: 石兴龙
    联系方式: 微信 Codingxiaoshi

    Game 类[游戏入口类]
    
    负责游戏的转配工作
    1. 加载资源
    2. 创建对象
    3. 绑定动作

    拳皇出招表: https://www.zhihu.com/question/311521952/answer/1028854562
*/

export default class Game {
    constructor(canvas) {
        console.log('start game');
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.dataStore = DataStore.getInstance();
        this.director = new Director();
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
            .put('keybordList', [])
            .put('gameConf', GameConf)
            .put('roleConf', RoleConf)
            .put('role', HeroFactory.make({ role: 'Iori', keybord: 'p1' }))

        console.log(
            this.dataStore.get('gameConf')
        )

        // 开始运行游戏
        this.director.run();
    }
}