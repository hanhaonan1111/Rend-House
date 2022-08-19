import style from './index.module.scss'
import {BASE_URL} from "@/utils/request";

let defaultFun = () => {
}

export default function HouseList({v, OnClick = defaultFun}) {

    return (
        <div className={style.root} onClick={() => OnClick(v)}>
            <div className='house'>
                <div className='imgWrap'>
                    <img className='img' src={` ${BASE_URL + v.houseImg}`}
                         alt='' onError={(e) => {
                        e.target.src = BASE_URL + '/newImg/no.jpg'
                    }}

                    />
                </div>
                <div className='content'>
                    <h3 className='title'>{v.title}</h3>
                    <div className='desc'>{v.desc}</div>
                    <div>
                        {v.tags.map((tag, index) => {
                            const tagClass = 'tag' + (index + 1)
                            return (
                                <span
                                    className={['tag', tagClass].join(' ')}
                                    key={tagClass}
                                > {tag}
                                </span>
                            )
                        })}
                    </div>
                    <div className='price'>
                        <span className='priceNum'>{v.price}</span> 元/月
                    </div>
                </div>
            </div>
        </div>
    );
}