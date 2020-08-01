import DataStore from '../base/DataStore';
import Sprite from '../base/Sprite'
import RoleAction from '../../../Enum/roleAction'
import Handle from '../base/Handle'

/**
    角色基类, 
        控制位置
        不负责绘制图形

    静止
    走动
    左右
    跑
    跳
*/
class Role extends Sprite {
    constructor(props) {
        super(props)
        this.dataStore = DataStore.getInstance();
        this.ctx = this.dataStore.ctx;
        this.canvas = this.dataStore.canvas;
        this.gameConf = this.dataStore.get('gameConf');
        this.roleConf = this.dataStore.get('roleConf');
        this.handle = new Handle(props.keybord);

        this.inMotion = false
        // 坠落的时间
        this.time = 0;

        // 角色状态
        this.status = RoleAction[0]; // 默认静止
        this.direction = 'left';     // 方向

        // 初始化角色主体
        this.width = 74;
        this.height = 100;
        this.bodyCenter = this.width / 2;
        this.x = 0;
        this.y = this.canvas.height - this.height;
    }
    backward() {
        this.move(-1)
    }
    forward () {
        this.move(1)
        this.status = RoleAction[5];
        // this.move(2)
        // this.status = RoleAction[3];
    }
    move(num) {
        if (num > 0) {
            this.x += this.gameConf.moveSpeed * 1;
        } else {
            this.x -= this.gameConf.moveSpeed * 1;
            this.status = RoleAction[4];
        }
        this.draw();
    }
    stand() {
        this.status = RoleAction[0];
        this.draw();
    }
    draw(fn) {
        let staticRole = this.roleConf[this.roleKey][this.status];
        if (this.index >= staticRole.length - 1) {
            this.index = 0;
        }
        let maxH = Math.max(...staticRole.map(img => img.H));
        let currentImg = staticRole[Math.floor(this.index)];
        const { x, y, W, H } = currentImg;
        this.width = W;
        this.height = maxH;
        
        if (this.x > this.canvas.width - W) {
            this.x = this.canvas.width - W;
        }
        if (this.x < 0) {
            this.x = 0;
        }
        this.y = this.canvas.height - maxH;
        let currentX = this.x;
        if (fn instanceof Function) {
            currentX = fn(staticRole, currentImg)
        }
        this.ctx.drawImage(
            this.img,
            x, y - (maxH - H),
            W, this.height,
            currentX, this.y, W,
            this.height
        );
        this.index += this.gameConf.spriteSpeed;
    }
    jump() {
        if (this.status !== RoleAction[6]) {
            this.status = RoleAction[6];
        }
        this.draw();
    }
    /* 
        动作 
            1. 持续的
                前进, 后退, 跳跃, 跑
            2. 播放的
                a,b,c,d
    */
    instruction() {
        const { keyList, keydownList } = this.handle.getInstructions()
        let actionName = 'stand'
        // console.log(
        //     keydownList
        // )
        if (keydownList.length > 0) {
            if (keyList.length > 0 && keyList[0].type === 'keydown') {
                actionName = keyList[0].instruction
            }
        }
        // keydownList.length
        return actionName
    }
    run() {
        this.status = RoleAction[3];
        this.x += this.gameConf.moveSpeed * 2;
        this.draw((staticRole, currentImg) => {
            let maxW = Math.max(...staticRole.map(img => img.W));
            const { W } = currentImg
            if (this.x > this.canvas.width - W - (maxW - W)) {
                this.x = this.canvas.width - W;
                return this.x;
            }
            return this.x + (maxW - W);
        })
    }
    show() {
        let fnName = this.instruction();
        if (this[fnName] instanceof Function) {
            this[fnName]()
        }
        // this.run()

        // 绘制角色轮廓
        // this.ctx.strokeStyle = 'red'
        // this.ctx.strokeRect(
        //     this.x, this.y,
        //     this.width, this.height
        // )
    }
}

export default Role;
