import React, {useEffect, useState} from 'react'
import {CascadePickerView} from "antd-mobile";
import {useDispatch, useSelector} from "react-redux";
import {AsyncSetFilterHouse, ClearNowHouseList, setHasMore} from "@/store/actions/HouseAction";
import FooterBtn from "@/components/FooterBtn";
import style from './index.module.scss'

let query = {
    start: 1,
    end: 20
}

function FilterPicker({show, setSelected, setShow, selected, onsetQuery}) {
    let {IndexCity, filterHouse} = useSelector(v => v.House)
    let dispatch = useDispatch()
    useEffect(() => {
        dispatch(AsyncSetFilterHouse({id: IndexCity.value}))
    }, [dispatch, IndexCity.name])
    let [option, setOption] = useState([])
    let initVal = {
        'area': ["area", null, null, null],
        'mode': [null],
        'price': [null],
    }
    let [defaultVal, setDefaultVal] = useState(initVal)

    useEffect(() => {
        if (selected === 'area') {
            setOption([filterHouse['area'], filterHouse['subway']])
        } else if (selected === 'mode') {
            setOption(filterHouse['rentType'])
        } else if (selected === 'price') {
            setOption(filterHouse['price'])
        }
    }, [selected])


    return (
        <div className={style.root}>
            <div className={show ? 'show' : 'none'}>
                <CascadePickerView
                    options={option}
                    value={defaultVal[selected] && defaultVal[selected].map(v => {
                        return v ? v.value : ['null']
                    })}
                    onChange={(abc, extend) => {
                        setDefaultVal({...defaultVal, [selected]: extend.items})
                    }}
                />
                <FooterBtn
                    onCancel={() => {
                        setSelected(false)
                        setShow(false)
                        setDefaultVal(initVal)
                        onsetQuery(initVal)
                        dispatch(ClearNowHouseList())
                        dispatch(setHasMore(true))
                    }}
                    onConfirm={() => {
                        setSelected(false)
                        setShow(false)
                        onsetQuery(defaultVal)
                        dispatch(ClearNowHouseList())
                        dispatch(setHasMore(true))

                    }}
                />
            </div>

        </div>
    )

}

export default FilterPicker

