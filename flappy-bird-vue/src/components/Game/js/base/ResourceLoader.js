import Resource from './Resources'

/*
    作者: 石兴龙
    联系方式: 微信 Codingxiaoshi

    ResourceLoader 类的职责是[资源加载]

    游戏开始之前, 把所有的静态资源加载一遍
*/

export default class ResourceLoader {
    constructor() {
        this.map = new Map();
        for (let [k, v] of Resource) {
            const image = new Image();
            console.log(v)
            image.src = v;
            this.map.set(k, image);
        }
    }

    onLoaded(callback) {
        console.log('开始加载资源')
        let loadedCount = 0;
        for (let image of this.map.values()) {
            image.onload = () => {
                console.log('onLoaded')
                loadedCount++
                if (loadedCount >= this.map.size) {
                    callback(this.map);
                }
            }
        }
    }

    static create() {
        return new ResourceLoader();
    }
}