import DataStore from './base/DataSotre'
import BulletSircelRotation from './runtime/BulletSircelRotation'

// 游戏基本配置
let getConfig = () => ({
    currentLive: 1,
    liveConf: {
        1: {
            bullet: {
                max: 5,
                used: 0,
            }
        },
        2: {
            bullet: {
                max: 6,
                used: 0,
            }
        },
        3: {
            bullet: {
                max: 7,
                used: 0,
            }
        },
    },
    // 靶子旋转状态
    liveSpeed: [
        [-5, -4, -2, 2, 4, 5],
        [-6, -3, -2, 2, 4, 6],
        [-9, -7, -5, 6, 8, 9],
    ],
    maxTime: 30
})

/*
    作者: 石兴龙
    联系方式: 微信 Codingxiaoshi

    导演类
*/
export default class Director {
    constructor() {
        console.log('init Director')
        this.dataStore = DataStore.getInstance();
        DataStore.getInstance().config = getConfig();
        this.ctx = this.dataStore.ctx;
        this.canvas = this.dataStore.canvas;
        // 游戏基础配置
        this.config = getConfig();
        // 开始时间
        this.startTime = new Date();
        // 子弹配置
        this.bullet = {
            width: 20,
            height: 80,
            insertHeight: 20
        }
        // 子弹Y轴位置
        this.bulletY = this.canvas.height - this.bullet.height - 10;
        // 是否开始发射子弹
        this.bulletStart = false
        // 靶子旋转角度
        this.rotate = 1;
        // 旋转速度
        this.speed = Math.floor(
            Math.random() * this.config.liveSpeed[this.config.currentLive - 1].length
        )
        this.seconds = 0
        // 定时器
        this.timer = setInterval(() => this.changeSpeed(), 1000)
        this.isGameOver = false
        this.pause = false
        // 绑定事件
        this.tap()
    }
    isCollision() {
        const { r, height } = DataStore.getInstance().circular
        let circular = this.dataStore.get('circular');
        // 中靶
        if (this.bulletY < height + r) {
            console.log('中靶')
            this.bulletStart = false
            // 遍历所有口红, 判断角度
            for (let b of circular.arrow) {
                let delta = b.delta
                if (Math.abs(delta - this.rotate) < 10) {
                    return { res: true }
                }
            }
            return { res: false }
        }
    }
    // 口红与靶子的碰撞检测
    checkCollision() {
        /*
            三种结果
            1. 中靶
            3. 晋级
            2. 撞靶
        */
        // 中靶
        const isCollision = this.isCollision()
        if (isCollision) {
            if (isCollision.res === false) {
                // 是否晋级
                const { currentLive, liveConf } = this.config
                liveConf[currentLive].bullet.used++
                const { used, max } = liveConf[currentLive].bullet
                if (used >= max) {
                    // 晋级
                    this.liveUp()
                } else {
                    // 上靶
                    let circular = this.dataStore.get('circular');
                    circular.push(
                        new BulletSircelRotation(this.rotate)
                    )
                    this.bulletY = this.canvas.height - this.bullet.height - 10;
                }
            } else if (isCollision.res === true) { 
                alert('失误! 撞到了其他口红, 游戏结束!')
                this.gameOver()
                let bullet = this.dataStore.get('bullet');
                bullet.flying()
            }
        }
    }
    // 重置游戏状态
    reset() {
        // 开始时间
        this.startTime = new Date();
        // 子弹配置
        this.bullet = {
            width: 20,
            height: 80,
            insertHeight: 20
        }
        // 子弹Y轴位置
        this.bulletY = this.canvas.height - this.bullet.height - 10;
        // 是否开始发射子弹
        this.bulletStart = false
        // 靶子旋转角度
        this.rotate = 1;
        // 旋转速度
        this.speed = Math.floor(
            Math.random() * this.config.liveSpeed[this.config.currentLive - 1].length
        )
        // 定时器
        this.isGameOver = false
        this.pause = false
        
        let circular = this.dataStore.get('circular');
        let bullet = this.dataStore.get('bullet');
        bullet.reset()
        circular.reset()
        circular.arrow = []
        this.seconds = 0
    }
    gameOver = () => {
        this.isGameOver = true
        document.querySelector('.restart').style.display = 'block';
        clearInterval(this.timer)
        setTimeout(() => {
            cancelAnimationFrame(this.dataStore.get('timer'));
        }, 1000)
    }
    // 发射子弹
    launchBullet() {
        if (this.isGameOver) {
            return;
        }
        console.log('发射子弹');
        this.bulletStart = true;
    }
    liveUpTimeOut() {
        const { liveSpeed, liveConf } = this.config
        this.config.currentLive++
        // 通关
        if (this.config.currentLive > liveSpeed.length) {
            alert('您已通关! 记得给我的视频号点赞!')
            this.gameOver()
        }
        if (this.config.currentLive > Object.keys(liveConf).length) {
            this.config.currentLive = Object.keys(liveConf).length;
        }
        this.reset();
    }
    // 晋级
    liveUp() {
        let circular = this.dataStore.get('circular');
        let bullet = this.dataStore.get('bullet');
        this.pause = true
        circular.flying(this.rotate, this.config.currentLive)
        circular.arrow = []
        bullet.flying()
        setTimeout(() => this.liveUpTimeOut(), 1000)
    }
    // 旋转增量
    changeSpeed() {
        if (this.isGameOver) {
            clearInterval(this.timer)
            return
        }
        this.seconds = parseInt((new Date().getTime() - this.startTime.getTime()) / 1000)
        if (this.seconds > this.config.maxTime) {
            this.seconds = this.config.maxTime
            alert('时间到')
            this.gameOver('时间到')
            return
        }
        const { currentLive } = this.config
        let live = currentLive - 1
        if (this.config.liveSpeed[live]) {
            let index = Math.floor(Math.random() * this.config.liveSpeed[live].length)
            this.speed = this.config.liveSpeed[live][index]
        }
    }
    // 旋转速度
    getSpeed() {
        this.rotate += this.speed * 0.5;
        if (this.rotate > 360) {
            this.rotate = 0;
        }
        return this.rotate;
    }
    run() {

        const { currentLive, liveConf } = this.config
        let time = this.dataStore.get('time');
        let bulletClip = this.dataStore.get('bulletClip');
        let canvas = this.dataStore.canvas;
        let bullet = this.dataStore.get('bullet');
        let circular = this.dataStore.get('circular');
        let bg = this.dataStore.get('bg');
        let live = this.dataStore.get('live');
        
        // 绘制背景
        bg.draw();
        // 绘制当前等级
        live.draw(currentLive);
        // 时间
        time.draw(canvas.width, 0, this.seconds)
        
        if (this.pause) {
            console.log('暂停')
            // 子弹夹
        } else if(this.isGameOver === false && this.pause === false) {
            // 旋转角度
            this.getSpeed()
            // 碰撞检测
            if (this.bulletStart) {
                this.checkCollision()
            }
            if (this.bulletStart) {
                this.bulletY -= 60
            }
        }
        // 子弹夹
        bulletClip.draw(liveConf[currentLive].bullet, currentLive)
        // 子弹
        bullet.draw(this.bullet.width, this.bullet.height, currentLive, this.bulletY)
        for (let b of circular.arrow) {
            b.draw(
                this.bullet.width, this.bullet.height, currentLive,
                this.bullet.insertHeight, this.rotate
            )
        }
        // 靶子
        circular.draw(this.rotate, currentLive);
        let raf = requestAnimationFrame(() => this.run());
        this.dataStore.put('timer', raf);
    }
    tap = () => {
        let tap = () => {
            if (this.isGameOver === false && this.pause === false) {
                this.launchBullet();
            }
        }
        if (this.dataStore.isPhone) {
            this.dataStore.canvas.addEventListener('touchend', tap);
        } else {
            this.dataStore.canvas.addEventListener('click', tap);
        }
    }
}
