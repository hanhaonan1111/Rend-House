import styles from './index.module.scss'
import FooterBtn from "@/components/FooterBtn";
import {useDispatch, useSelector} from "react-redux";
import {Tag} from "antd-mobile";
import {useState} from "react";
import {ClearNowHouseList, setHasMore} from "@/store/actions/HouseAction";


function FilterMore({showMore, setSelected, onsetQuery}) {
    let [init, setInit] = useState([])
    let {floor, oriented, roomType, characteristic} = useSelector(v => v.House.filterHouse)
    let dispatch = useDispatch()

    function changeInit(index, value) {
        init[index - 1] = value.value
        setInit([...init])
    }

    if (!showMore) return <></>
    return <div className={styles.root}>
        {/* 遮罩层 */}
        <div className={styles.mask}
             onClick={() => {
                 setSelected('')
             }}
        />
        {/* 条件内容 */}
        <div className={styles.tags}>
            <dl className={styles.dl}>
                <dt className={styles.dt}>户型</dt>
                <dd>
                    {

                        roomType.map((v, i) => <Tag color='primary'
                                                    className={[styles.dd,
                                                        init[0] === v.value ? 'selected' : ''].join(' ')
                                                    }
                                                    onClick={() => changeInit(1, v)}
                                                    key={'户型' + i}
                        >{v.label}</Tag>)
                    }
                </dd>

                <dt className={styles.dt}>楼层</dt>
                <dd>
                    {
                        floor.map((v, i) => <Tag color='success'
                                                 className={[
                                                     styles.dd,
                                                     init[1] === v.value ? 'selected' : ''].join(' ')
                                                 }
                                                 key={'朝向' + i}
                                                 onClick={() => changeInit(2, v)}

                        >{v.label}</Tag>)
                    }

                </dd>

                <dt className={styles.dt}>朝向</dt>
                <dd> {
                    oriented.map((v, i) => <Tag color='default'
                                                className={[styles.dd,
                                                    init[2] === v.value ? 'selected' : ''].join(' ')
                                                }
                                                onClick={() => changeInit(3, v)}
                                                key={'楼层' + i}>
                        {v.label}</Tag>)
                }</dd>

                <dt className={styles.dt}>房屋亮点</dt>
                <dd> {
                    characteristic.map((v, i) => <Tag
                            className={[styles.dd,
                                init[3] === v.value ? 'selected' : ''].join(' ')
                            }
                            color='primary'
                            fill='outline'
                            style={{'--border-radius': '6px'}}
                            key={'亮点' + i}
                            onClick={() => changeInit(4, v)}
                        >
                            {v.label}
                        </Tag>
                    )
                }</dd>
            </dl>
            <div>
                <FooterBtn className='foot' onCancel={() => {
                    setSelected('')
                    setInit([[], [], [], []])
                    onsetQuery([[], [], [], []])
                    dispatch(ClearNowHouseList())
                    dispatch(setHasMore(true))

                }}
                           onConfirm={() => {
                               setSelected('')
                               onsetQuery(init)
                               dispatch(ClearNowHouseList())
                               dispatch(setHasMore(true))

                           }}

                />
            </div>
        </div>
    </div>


}

export default FilterMore
