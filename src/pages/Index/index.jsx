import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AsyncSetGroup, AsyncSetNews, AsyncSetSwiper} from "@/store/actions/HomeAction";
import {Swiper} from "antd-mobile";
import styles from './index.module.scss'
import SearchNav from '@/components/searchNav'
// 导航栏图片
import nav1 from '@/assets/images/nav-1.png'
import nav2 from '@/assets/images/nav-2.png'
import nav3 from '@/assets/images/nav-3.png'
import nav4 from '@/assets/images/nav-4.png'

let NavData = [
    {
        image: nav1,
        title: '整租',
        path: '/home/findhouse'
    },
    {
        image: nav2,
        title: '合租',
        path: '/home/findhouse'
    },
    {
        image: nav3,
        title: '地图找房',
        path: '/map'
    },
    {
        image: nav4,
        title: '去出租',
        path: '/rend'
    },
]

function Index(props) {
    let Home = useSelector(v => v.Home)
    let dispatch = useDispatch()
    useEffect(() => {
        dispatch(AsyncSetSwiper())
        dispatch(AsyncSetGroup())
        dispatch(AsyncSetNews())
    }, [dispatch])


    return (
        <div className={styles.root}>
            {/*搜索栏*/}
            <SearchNav></SearchNav>
            {/*轮播图*/}
            {!Home.swiper[0] && <div className="placeholder" style={{height: 213 + 'px'}}></div>}
            <Swiper loop autoplay allowTouchMove autoplayInterval='2000'>
                {
                    Home.swiper.map(val => {
                        return (
                            <Swiper.Item key={val.id}>
                                <div className='swiper'>
                                    <img src={' http://127.0.0.1:8080' + val.imgSrc} alt='' className='img'/>
                                </div>
                            </Swiper.Item>)
                    })
                }
            </Swiper>
            {/*导航栏*/}
            <div className="nav">
                {
                    NavData.map(val => (
                        <div key={val.title} onClick={() => props.history.push(val.path)}>
                            <img src={val.image} alt=""/>
                            <h2>{val.title}</h2>
                        </div>))
                }
            </div>
            {/*小组 */}
            <div className="group">
                <h3 className="group-title">
                    租房小组 <span className="more">更多</span>
                </h3>
                <div className="group-item">
                    {
                        Home.groups.map(v => (
                            <div key={v.id}>
                                <div className="desc">
                                    <div className="title">{v.title}</div>
                                    <div className="info">{v.desc}</div>
                                </div>
                                <img src={'http://127.0.0.1:8080' + v.imgSrc} alt=""/>
                            </div>)
                        )
                    }

                </div>
            </div>
            {/* 最新资讯 */}
            <div className="news">
                <h3 className="group-title">最新资讯</h3>
                <div className="news-item">
                    {
                        Home.news.map(val => {
                            return <div className="imgwrap" key={val.id}>
                                <div className="img">
                                    <img src={'http://127.0.0.1:8080' + val.imgSrc} alt=""/>
                                </div>
                                <div className="desc">
                                    <div className="title">{val.title}</div>
                                    <div className="from">
                                        <div>{val.from}</div>
                                        <div>{val.date}</div>
                                    </div>

                                </div>
                            </div>
                        })
                    }


                </div>


            </div>
        </div>

    );
}

export default Index;