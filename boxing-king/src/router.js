import VueRouter from 'vue-router'

import Game from './components/Game'
import SpriteGenerator from './components/SpriteGenerator'

const routes = [
    { path: '/', component: Game },
    { path: '/spriteGenerator', component: SpriteGenerator},
]

export default new VueRouter({ 
    mode: 'history',
    routes 
});
