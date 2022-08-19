import React from 'react';
import style from './index.module.scss'
import history from "@/utils/history";
import {useSelector} from "react-redux";


function Index({className}) {
    let House = useSelector(v => v.House.IndexCity.name)
    return (
        <div className={[style.box, className].join(' ')}>
            <div className="search">
                <div className="location" onClick={() => {
                    history.push('/citylist')
                }}>
                    <span className="name">{House}</span>
                    <i className="iconfont icon-arrow"/>
                </div>
                <div className="form">
                    <i className="iconfont icon-seach"/>
                    <span className="text">请输入小区或地址</span>
                </div>
            </div>
            <i onClick={() => history.push('/map')} className="iconfont icon-map"/>
        </div>)
}


export default Index