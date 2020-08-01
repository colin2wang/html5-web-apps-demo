/*
    作者: 石兴龙
    联系方式: 微信 Codingxiaoshi

    DataStore 类的职责是[内存管理]

    负责存储游戏运行过程中产生的实例
*/
export default class DataStore {
    static getInstance() {
        if (!DataStore.instance) {
            DataStore.instance = new DataStore
        }
        return DataStore.instance;
    }
    constructor() {
        this.map = new Map();
    }
    put(k, v) {
        this.map.set(k, v)
        return this
    }
    get(k) {
        return this.map.get(k);
    }
    destroy() {
        for (let k of this.map.keys()) {
            this.map.delete(k)
        }
    }
}