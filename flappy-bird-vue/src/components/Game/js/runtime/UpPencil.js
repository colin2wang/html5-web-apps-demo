import Pencil from './Pencil'
import Sprice from '../base/Sprite'

/*
    作者: 石兴龙
    联系方式: 微信 Codingxiaoshi

    UpPencil 类[上面的铅笔]
*/
export default class UpPencil extends Pencil {
    constructor(top) {
        const img = Sprice.getImage('pencilUp');
        super(img, top);
    }
    draw() {
        this.y = this.top - this.height;
        super.draw();
    }
}
