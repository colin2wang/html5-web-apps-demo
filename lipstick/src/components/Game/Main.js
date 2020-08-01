import DataStore from './js/base/DataSotre';
import ResourceLoader from './js/base/ResourceLoader';

import Director from './js/Director';
import Background from './js/runtime/Background'
import Heart from './js/runtime/Heart'
import Live from './js/runtime/Live'
import Time from './js/runtime/Time'
import BulletClip from './js/runtime/BulletClip'
import Bullet from './js/runtime/Bullet'
import Circular from './js/runtime/Circular'

/*
    作者: 石兴龙
    联系方式: 微信 Codingxiaoshi

    游戏入口
*/
export default class Main {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.dataStore = DataStore.getInstance();
        this.dataStore.window = {
            width: window.innerWidth,
            height: window.height,
        }
        this.dataStore.ctx = this.ctx;
        this.dataStore.canvas = this.canvas;
        const loader = ResourceLoader.create();
        loader.onLoaded((progress, map) => {
            this.resourceLoader(progress, map);
        })
    }
    isPhone() {
        return window.navigator.userAgent.search(/iPhone|Android/) !== -1
    }
    resourceLoader(progress, map) {
        document.querySelector('#loading small').innerHTML = parseInt(progress) + '%';
        if (progress >= 100) {
            console.log('加载组件实例')
            document.querySelector('.loading-content').remove();
            this.dataStore.res = map;

            let live = new Live();
            live.push(new Heart(1));
            live.push(new Heart(2));
            live.push(new Heart(3));
            this.dataStore.isPhone = this.isPhone();
            // 加载组件实例
            this.dataStore
                .put('bg', new Background())
                .put('live', live)
                .put('time', new Time())
                .put('bulletClip', new BulletClip())
                .put('bullet', new Bullet())
                .put('circular', new Circular())
            this.init();
        }
    }
    init() {
        this.director = new Director();
        this.director.run()
    }
}
