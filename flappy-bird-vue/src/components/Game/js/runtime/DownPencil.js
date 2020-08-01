import Pencil from './Pencil'
import Sprice from '../base/Sprite'
import DataStore from '../base/DataStore'

/*
    作者: 石兴龙
    联系方式: 微信 Codingxiaoshi

    DownPencil 类[下面的铅笔]
*/
export default class DownPencil extends Pencil {
    constructor(top) {
        const img = Sprice.getImage('pencilDown');
        super(img, top);
    }
    draw() {
        let gap = DataStore.getInstance().canvas.height / 5
        this.y = this.top + gap;
        super.draw();
    }
}
