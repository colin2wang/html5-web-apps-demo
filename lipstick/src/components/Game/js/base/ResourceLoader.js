import Resource from './Resources';
/*
    作者: 石兴龙
    联系方式: 微信 Codingxiaoshi

    ResourceLoader 类的职责是[加载静态资源]

    在游戏开始之前加载静态资源
*/
export default class ResourceLoader {
    constructor() {
        this.map = new Map();
        for (let [k, v] of Resource) {
            const img = new Image()
            img.src = v;
            this.map.set(k, img)
        }
    }
    onLoaded = (callback) => {
        let loadedCount = 0;
        for (let imgItem of this.map.values()) {
            imgItem.onload = () => {
                loadedCount++
                callback((loadedCount / this.map.size) * 100, this.map)
            }
        }
    }

    static create() {
        return new ResourceLoader();
    }
}