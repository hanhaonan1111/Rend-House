import React, {useEffect, useRef, useState} from 'react';
import styles from './index.module.css'
import {useDispatch, useSelector} from "react-redux";
import {useHistory, useParams} from "react-router-dom";
import {AsyncGetHouseInfo, setHouseInfo} from "@/store/actions/HouseInfoAction";
import {SpinLoading, Swiper, Toast} from "antd-mobile";
import {BASE_URL} from '@/utils/request'
import HouseIcon from "@/components/HouseIcon";
import NavBar from "@/components/NavBar";
import {
    AsyncDeleteCollected,
    AsyncGetIsCollected,
    AsyncPostCollected,
    setIsCollected
} from "@/store/actions/HouseAction";
import {hasToken} from "@/utils/storage";


function Index(props) {
    let location = useParams()
    let dispatch = useDispatch()
    let {houseInfo} = useSelector(v => v.Info)

    useEffect(() => {
        location.id && dispatch(AsyncGetHouseInfo(location.id))
        hasToken() && location.id && dispatch(AsyncGetIsCollected(location.id))
        return () => {
            dispatch(setHouseInfo({}))
            dispatch(setIsCollected(false))

        }
    }, [location.id, dispatch])
    let MapContainer = useRef(null)
    useEffect(() => {
        if (!MapContainer.current || !houseInfo.coord) return
        let map = new window.BMapGL.Map(MapContainer.current);
        let point = new window.BMapGL.Point(houseInfo.coord.longitude, houseInfo.coord.latitude);  // 创建点坐标
        map.centerAndZoom(point, 17);

        let scaleCtrl = new window.BMapGL.ScaleControl();  // 添加比例尺控件
        let zoomCtrl = new window.BMapGL.ZoomControl();  // 添加缩放控件
        map.addControl(scaleCtrl);
        map.addControl(zoomCtrl);

        // 添加文本标注
        let content = houseInfo.community || ' ';
        let label = new window.BMapGL.Label(content, {       // 创建文本标注
            position: point,                          // 设置标注的地理位置
        })
        label.setStyle({                              // 设置label的样式
            color: 'blue',
            fontSize: '15px',
            border: '2px solid green',
            minWidth: '50px',
            backgroundColor: 'orange',
        })
        map.addOverlay(label);
    }, [MapContainer.current, houseInfo.coord])

    let {isCollected} = useSelector(v => v.House)
    let [load, setLoad] = useState(false)
    let history = useHistory()
    let collected = async () => {
        if (!hasToken()) {
            Toast.show({
                content: '请先登录!'
            }, 1)
            history.replace({
                pathname: '/login',
                state: {from: history.location.pathname}
            })
            return


        }
        setLoad(true)
        try {
            if (isCollected) {
                await dispatch(AsyncDeleteCollected(location.id))
            } else {
                await dispatch(AsyncPostCollected(location.id))
            }
        } finally {
            setLoad(false)
        }


    }

    // 渲染处理
    if (!houseInfo.title) return null
    return (
        <div className={styles.root}>
            <NavBar className='nav'>房屋详情</NavBar>
            {/* 轮播图 */}
            <div>
                <Swiper autoplay loop={true}>
                    {
                        houseInfo.houseImg ? houseInfo.houseImg.map((item, ind) => (
                                <Swiper.Item
                                    key={ind}
                                    style={{
                                        display: 'inline-block',
                                        width: '375px',
                                        height: '252px'
                                    }}
                                >
                                    <img
                                        src={BASE_URL + item}
                                        alt=""
                                        style={{width: '100%', verticalAlign: 'top', height: '100%'}}
                                    />
                                </Swiper.Item>
                            )) :
                            <Swiper.Item>
                                <div style={{
                                    width: '375px',
                                    height: '252px',
                                    lineHeight: '252px',
                                    textAlign: 'center',
                                    fontSize: '20px'
                                }}>加载中...
                                </div>
                            </Swiper.Item>
                    }
                </Swiper>
            </div>
            {/* 房屋基础信息 */}
            <div className={styles.info}>
                <h3 className={styles.infoTitle}>
                    {houseInfo.title}
                </h3>
                <div className={styles.tags}>
                    {
                        houseInfo.tags.map((v, i) => (
                            <span key={i + 'tags'} className={[styles.tag, styles.tag1].join(' ')}>
                                 {v}
                            </span>))
                    }
                </div>

                <div className={styles.infoPrice}>
                    <div className={styles.infoPriceItem}>
                        <div>
                            {houseInfo.price}
                            <span className={styles.month}>/月</span>
                        </div>
                        <div>租金</div>
                    </div>
                    <div className={styles.infoPriceItem}>
                        <div>{houseInfo.roomType}</div>
                        <div>房型</div>
                    </div>
                    <div className={styles.infoPriceItem}>
                        <div>{houseInfo.size}平米</div>
                        <div>面积</div>
                    </div>
                </div>

                <div className={styles.infoBasic} align="start">
                    <div>
                        <div>
                            <span className={styles.title}>装修：</span>
                            精装
                        </div>
                        <div>
                            <span className={styles.title}>楼层：</span>
                            {houseInfo.floor}
                        </div>
                    </div>
                    <div>
                        <div>
                            <span className={styles.title}>朝向：</span>{houseInfo.oriented.join('  ')}
                        </div>
                        <div>
                            <span className={styles.title}>类型：</span>{houseInfo.roomType}
                        </div>
                    </div>
                </div>
            </div>

            {/* 地图位置 */}
            <div className={styles.map}>
                <div className={styles.mapTitle}>
                    小区：
                    <span>{houseInfo.community}</span>
                </div>
                <div className={styles.mapContainer} id="map" ref={MapContainer}>
                </div>
            </div>

            {/* 房屋配套 */}
            <div className={styles.about}>
                <div className={styles.houseTitle}>房屋配套</div>
                <div className='icons'>
                    {houseInfo.supporting.map((v, i) => {
                        return <HouseIcon key={i + 'TAG'}>{v}</HouseIcon>
                    })}
                </div>

            </div>

            {/* 房屋概况 */}
            <div className={styles.set}>
                <div className={styles.houseTitle}>房源概况</div>
                <div>
                    <div className={styles.contact}>
                        <div className={styles.user}>
                            <img src={BASE_URL + '/img/avatar.png'} alt="头像"/>
                            <div className={styles.useInfo}>
                                <div>王女士</div>
                                <div className={styles.userAuth}>
                                    <i className="iconfont icon-auth"/>
                                    已认证房主
                                </div>
                            </div>
                        </div>
                        <span className={styles.userMsg}>发消息</span>
                    </div>

                    <div className={styles.descText}>
                        {houseInfo.description || '暂无介绍...'}
                    </div>
                </div>
            </div>
            {/* 底部收藏按钮 */}
            <div className={styles.fixedBottom}>
                <div>
                    {load ? <SpinLoading color='primary' className='loading'/> : (<>
                            <img
                                src={BASE_URL + (isCollected ? '/img/star.png' : '/img/unstar.png')}
                                className={styles.favoriteImg}
                                alt=""/>
                            <span className={styles.favorite} onClick={() => collected()}>收藏</span>
                        </>
                    )
                    }

                </div>
                <div>在线咨询</div>
                <div>
                    <a href="tel:400-618-4000" className={styles.telephone}>
                        电话预约
                    </a>
                </div>
            </div>
        </div>
    );
}

export default Index;