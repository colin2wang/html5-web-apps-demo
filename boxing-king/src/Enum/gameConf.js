export const HandleStr = {
    BACKWARD: 'backward',
    FORWARD: 'forward',
    JUMP: 'jump',
    SQUATDOWN: 'squatDown',
    A:'a',
    B:'b',
    C:'c',
    D:'d',
}
// 68: keydown,68: keyup,68: keydown

const actionConf = {
    [`${HandleStr.FORWARD}${HandleStr.FORWARD}`]: 'run', // 
}

// 0: {time: 1596205328972, type: "keydown", instruction: "forward", keyCode: 68}
// 1: {time: 1596205328908, type: "keyup", instruction: "forward", keyCode: 68}
// 2: {time: 1596205328812, type: "keydown", instruction: "forward", keyCode: 68}

export default {
    moveSpeed: 2.5,
    spriteSpeed: 0.2,
    continuityFrame: 20,
    actionConf,
    p1: {
        65: HandleStr.BACKWARD,     // a ←
        68: HandleStr.FORWARD,      // d →
        87: HandleStr.JUMP,         // w ↑
        83: HandleStr.SQUATDOWN,    // s ↓
        89: HandleStr.A,            // a 轻拳
        85: HandleStr.B,            // b 轻脚
        72: HandleStr.C,            // c 重拳
        74: HandleStr.D,            // d 重脚
    }
}