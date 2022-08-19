import style from './index.module.scss';

export const HOUSE_PACKAGE = [
    {
        id: 1,
        name: '衣柜',
        icon: 'icon-wardrobe'
    },
    {
        id: 2,
        name: '洗衣机',
        icon: 'icon-wash'
    },
    {
        id: 3,
        name: '空调',
        icon: 'icon-air'
    },
    {
        id: 4,
        name: '天然气',
        icon: 'icon-gas'
    },
    {
        id: 5,
        name: '冰箱',
        icon: 'icon-ref'
    },
    {
        id: 6,
        name: '暖气',
        icon: 'icon-Heat'
    },
    {
        id: 7,
        name: '电视',
        icon: 'icon-vid'
    },
    {


        id: 8,
        name: '热水器',
        icon: 'icon-heater'
    },
    {
        id: 9,
        name: '宽带',
        icon: 'icon-broadband'
    },
    {
        id: 10,
        name: '沙发',
        icon: 'icon-sofa'
    }
]
let defualt = () => {
}

function HouseIcon({children, click = defualt, setSelected, selected}) {
    let obj = HOUSE_PACKAGE.find(v => v.name === children)
    return (
        <div className={[style.root, selected && selected.findIndex(v => v === children) > -1 ? 'green' : ''].join(' ')}
             onClick={(obj) => {
                 setSelected && setSelected(Array.from(new Set([...selected, children])))
                 click(children)
      
             }}>
            <i className={[`iconfont`, `${obj.icon}`, selected && selected.findIndex(v => v === children) > -1 ? 'green' : ''].join(' ')}/>
            <span className={selected && selected.findIndex(v => v === children) > -1 ? 'green' : ''}>{children}</span>
        </div>
    );
}

export default HouseIcon;