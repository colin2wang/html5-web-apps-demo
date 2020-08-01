import Iori from './Iori';

let heroMap = {
    'Iori': Iori
}

class HeroFactory {
    static make({ key, ...props }) {
        if (heroMap[key]) {
            return new heroMap[key](props)
        }
        return new heroMap['Iori'](props)
    }
}

export default HeroFactory;
