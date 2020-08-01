import Role from '../Role';
import Sprite from '../../base/Sprite'

const RoleKey = 'Iori'

export default class Iori extends Role {
    constructor(props) {
        let img = Sprite.getImage(RoleKey);
        super({ img, ...props });
        this.roleKey = RoleKey
        let staticRole = this.roleConf[this.roleKey][this.status]
        this.width = Math.max(...staticRole.map(img => img.W))
        this.height = Math.max(...staticRole.map(img => img.H))
        this.y = this.canvas.height - this.height;
        this.index = 0; // 图片索引
    }
    show() {
        super.show();
    }
}
