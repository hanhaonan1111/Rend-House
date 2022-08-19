import React, {useEffect} from 'react';
import style from './index.module.scss'
import {IndexBar, List, Toast,} from "antd-mobile";
import {useDispatch, useSelector} from "react-redux";
import {AsyncGetAllcity, AsyncGetHostcity, setNowCity} from "@/store/actions/HomeAction";
import Nav from "@/components/NavBar";
import {setHasMore, setIndexCity, setQueryCity} from "@/store/actions/HouseAction";


function Index({history}) {

    let dispatch = useDispatch()
    let {city} = useSelector(v => v.Home)

    useEffect(() => {
        dispatch(AsyncGetAllcity())
        dispatch(AsyncGetHostcity())
    }, [dispatch])

    async function changeNowCity(city) {
        Toast.show({
            icon: 'loading',
            content: '位置信息重置中...',
            duration: 0,
            position: 'center',
        })
        let myGeo = new window.BMapGL.Geocoder();
        await myGeo.getPoint(city.label, function (point) {
            if (point) {
                let nowCity = {
                    name: city.label,
                    center: {
                        lng: point.lng,
                        lat: point.lat
                    },
                    value: city.value
                }
                dispatch(setNowCity(nowCity))
                dispatch(setIndexCity(nowCity))
                dispatch(setQueryCity(nowCity.value))
                dispatch(setHasMore(true))
                // 更新完数据之后才进行回退
                Toast.clear()
                history.goBack(-1)
            }
        }, city.label)


    }

    return (
        <div className={style.root}>
            <Nav className='nav'>城市选择</Nav>
            {
                city.allCity ? (<div style={{height: window.innerHeight, overflow: "auto"}}>
                    <IndexBar>
                        {city.allCity.map(group => {
                            const {title, items} = group
                            return (
                                <IndexBar.Panel
                                    index={title}
                                    title={`${title}`}
                                    key={`标题${title}`}
                                >
                                    <List>
                                        {items.map((item, index) => (
                                            <List.Item key={index} onClick={() => {
                                                changeNowCity(item)
                                            }}>{item.label}</List.Item>
                                        ))}
                                    </List>
                                </IndexBar.Panel>
                            )
                        })}
                    </IndexBar>
                </div>) : null
            }

        </div>
    );
}

export default Index;