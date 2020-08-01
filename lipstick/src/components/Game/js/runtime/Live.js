import Sprite from '../base/Sprite'

/*
    作者: 石兴龙
    联系方式: 微信 Codingxiaoshi

    等级
*/
export default class Live {
    constructor() {
        this.heartList = []
    }
    push(v) {
        this.heartList.push(v)
    }
    draw(live) {
        let img = Sprite.getImage('heart')
        for (let i = 0; i < this.heartList.length; i++) {
            let heart = this.heartList[i]
            let isActive = false
            if (live >= i + 1) {
                isActive = true
            }
            heart.draw(
                ((img.width + 5) * i) + 10, 10, 
                isActive
            )
        }
    }
}
