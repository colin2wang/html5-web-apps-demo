import DataStore from '../base/DataStore'

class Handle {
    constructor(keybord) {
        this.dataStore = DataStore.getInstance();
        this.gameConf = this.dataStore.get('gameConf');
        this.keyMap = this.gameConf[keybord];
        this.keybord = keybord
        // 记录用户的所有操作，按下，松开。记录最近 20 个操作
        this.keyList = [];
        this.lastKeyCode = {};
        this.isDown = {
            // [keyCode]: false | true
        };
        this.tempList = []
        this.timeDiff = parseInt((1000 / 60) * this.gameConf.continuityFrame, 10);
        this.init();
        this.dataStore.get('keybordList').push(this)
    }

    init() {
        // 按下,弹起 这是一个动作
            // 按下: 动作做一次
            // 弹起
        window.addEventListener('keydown', (e) => {
            // if (this.isDown[e.keyCode] === false) {
            //     return;
            // }
            // this.isDown[e.keyCode] = true;
            this.pushKeyBordAction({
                time: Date.now(),
                type: 'keydown',
                instruction : this.gameConf[this.keybord][e.keyCode],
                keyCode: e.keyCode,
            })
        })
        window.addEventListener('keyup', (e) => {
            this.pushKeyBordAction({
                time: Date.now(),
                type: 'keyup',
                instruction : this.gameConf[this.keybord][e.keyCode],
                keyCode: e.keyCode
            })
        })
    }

    pushKeyBordAction(data) {
        // 限制长按
        if (data.type === 'keyup') {
            this.isDown[data.keyCode] = false
        }
        if (data.type === 'keydown') {
            if (this.isDown[data.keyCode] === true) {
                return;
            }
            this.isDown[data.keyCode] = true;
        }
        if (this.keyMap[data.keyCode] &&
            (this.lastKeyCode.keyCode !== data.keyCode ||
            this.lastKeyCode.type !== data.type)
        ) {
            this.lastKeyCode = data.keyCode;
            this.keyList.unshift(data);
            if (this.keyList.length > 40) {
                this.keyList.length = 40;
            }
        }
    }

    getInstructions() {
        let keyList = [];
        let keydownList = [];
        // 用户连续按键
        for (let i = 0; i < this.keyList.length; i++) {
            const keybord = this.keyList[i]
            if (i === 0) {
                keyList.push(keybord);
                keydownList.push(keybord);
            } else if (i > 0) {
                const beforeKeyBord = this.keyList[i - 1];
                if (beforeKeyBord.time - keybord.time < this.timeDiff) {
                    keyList.push(keybord);
                    keydownList.push(keybord);
                } else {
                    break;
                }
            }
        }
        return {
            keydownList,
            keyList
        }
    }
}

export default Handle;
