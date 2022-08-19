import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import Nav from "@/components/NavBar";
import style from './index.module.scss'
import {AsyncGetHouseData, AsyncSetHouseList, setHouseData} from "@/store/actions/HouseAction";
import {setNowCity} from "@/store/actions/HomeAction";
import {Link} from "react-router-dom";
import HouseList from '@/components/HouseList'

function Index() {
    let container = useRef(null)
    let count = useRef(11)
    let Home = useSelector(v => v.Home)
    let dispatch = useDispatch()
    let Houses = useSelector(v => v.House.houses)
    let houseList = useSelector(v => v.House.houseList)
    let IndexCity = useSelector(v => v.House.IndexCity)
    let [h, setH] = useState([])
    let [showList, setShowList] = useState(false)
    useEffect(() => {
        setH(Houses)
    }, [Houses])

    useEffect(() => {
        let area = Home.city.nowCity.value
        let lng = Home.city.nowCity.center?.lng || Home.city.nowCity.coord.longitude
        let lat = Home.city.nowCity.center?.lat || Home.city.nowCity.coord.latitude
        dispatch(AsyncGetHouseData(area))
        if (container.current) {
            let map = new window.BMapGL.Map(container.current);
            let point = new window.BMapGL.Point(lng, lat);
            map.centerAndZoom(point, count.current);
            map.enableScrollWheelZoom(true)
            if (count.current === 17) {
                function addOverly(data, map) {
                    let label = new window.BMapGL.Label('', {
                        position: {lng: data.coord.longitude, lat: data.coord.latitude},
                    })
                    label.setContent(`
                                <div class="rect">
                                   <span >${data.label}</span>
                                   <span>${data.count}套</span>
                                </div>
                        `)
                    label.setStyle({
                        fontSize: '15px',
                        color: 'red',
                        textAlign: 'center'
                    })
                    label.addEventListener('click', () => {
                        setShowList(true)
                        dispatch(AsyncSetHouseList({cityId: data.value}))
                    })
                    map.addOverlay(label);
                }

                h.forEach(v => {
                    addOverly(v, map)
                })


            } else {
                if (Houses.length) {
                    Houses.forEach(data => {
                        let label = new window.BMapGL.Label('', {
                            position: {lng: data.coord.longitude, lat: data.coord.latitude},
                            offset: new window.BMapGL.Size(-35, -35)
                        })
                        label.setContent(`
                                    <div class='label' >
                                        <p style="font-size: 14px">${data.label}</p>
                                        <p style="font-size: 12px">${data.count}套</p>
                                    </div>
                                `)
                        // 设置标签样式
                        label.setStyle({
                            width: '70px',
                            height: '70px',
                            borderRadius: '50%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: '#A4F3A4FF',
                            border: '1px solid green',
                            textAlign: 'center',

                        })
                        label.addEventListener('click', () => {
                            map.clearOverlays()
                            dispatch(setHouseData([]))
                            dispatch(setNowCity(data))
                            count.current = count.current + 3
                        })
                        // 添加至地图
                        map.addOverlay(label);
                    })
                }
            }
        }


        return () => {
            if (!container.current) {
                dispatch(setNowCity(IndexCity))
                dispatch(setHouseData([]))
            }
        }
    }, [h.length])
    return (
        <div className={style.root}>
            <Nav className='map'>地图找房</Nav>
            {/*房源数据*/}
            <div className={['houseList', showList ? 'show' : ''].join(' ')}>
                <div className='titleWrap'>
                    <h1 className='listTitle'>房屋列表</h1>
                    <Link className='titleMore' to="/home/findhouse"> 更多房源</Link>
                </div>
                {/* 列表数据*/}
                <div className='houseItems'>
                    {
                        houseList && houseList.map((v, i) => (
                            <HouseList v={v} i={'map' + i}></HouseList>
                            
                        ))
                    }
                </div>
            </div>

            <div className='container' ref={container} onClick={() => {
                setShowList(false)
            }}></div>
        </div>
    );
}

export default Index;