import React, {useEffect, useState} from 'react';
import styles from './index.module.scss'
import FilterTitle from "../FilterTitle";
import FilterPicker from "@/pages/FindHouse/component/FilterPicker";
import FilterMore from "@/pages/FindHouse/component/FilterMore";
import {useDispatch, useSelector} from "react-redux";
import {setQuerys} from "@/store/actions/HouseAction";

const titleList = [
    {title: '区域', type: 'area'},
    {title: '方式', type: 'mode'},
    {title: '租金', type: 'price'},
    {title: '筛选', type: 'more'}
]

function Index() {
    let dispatch = useDispatch()
    let [show, setShow] = useState(false)
    let [showMore, setShowMore] = useState(false)
    let [selected, setSelected] = useState('')
    let {IndexCity} = useSelector(v => v.House)
    let {findHouseList} = useSelector(v => v.House)
    useEffect(() => {
        if (selected === 'more') {
            setShow(false)
            setShowMore(true)
        } else if (selected === '') {
            setShow(false)
            setShowMore(false)
        }
    }, [selected])


    function setQuery(data) {
        let query1 = {
            ...findHouseList.query
        }
        query1.cityId = IndexCity.value || ''

        if (data instanceof Array) {
            query1 = {
                ...query1,
                more1: [...data]
            }
        } else {
            for (let k in data) {
                if (k === 'more') continue
                if (k) {
                    query1[k] = data[k]
                }
            }
        }
        if (query1.area !== undefined && query1?.area[0]?.value === "area") {
            query1.subway = null
            if (query1['area'].length === 4) {
                let area = query1['area'].filter(v => {
                    if (v && v.value !== 'null') return v
                })
                query1.area = area[area.length - 1].value
            }
        }
        if (query1.area !== undefined && query1?.area[0]?.value === "subway") {
            query1.subway = query1.area
            if (query1['subway'].length === 4) {
                let subway = query1['subway'].filter(v => {
                    if (v && v.value !== 'null') return v
                })
                query1.subway = subway[subway.length - 1].value
            }

        }
        if (query1.mode instanceof Array) {
            query1.mode = query1.mode[0]?.value
        }
        if (query1.price instanceof Array) {
            query1.price = query1.price[0]?.value
        }


        if (!query1.more1) {
            query1.more1 = query1.more
        }
        if (query1.more1 && query1.more1 instanceof Array) {
            let more = query1.more1.filter(v => {
                return v !== undefined
            })
            query1.more1 = more.join(',')
        }
        dispatch(setQuerys(query1))

    }


    return (
        <div className={styles.root}>
            {/* 前三个菜单的遮罩层 */}
            {/*<div className={'mask'}/>*/}
            <div className='content'>
                {/* 标题栏 */}
                <FilterTitle
                    setShow={setShow}
                    titleList={titleList}
                    selected={selected}
                    setSelected={setSelected}
                />

                {/* 前三个菜单对应的内容： */}
                <FilterPicker show={show}
                              selected={selected}
                              setSelected={setSelected}
                              setShow={setShow}
                              onsetQuery={setQuery}
                />

                {/* 最后一个菜单对应的内容： */}
                <FilterMore showMore={showMore}
                            onsetQuery={setQuery}
                            setSelected={setSelected}
                />
            </div>
        </div>
    );
}

export default Index;