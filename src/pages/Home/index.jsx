import React, {Component} from 'react';
import {Switch} from "react-router-dom";
import News from "@/pages/News";
import My from "@/pages/My";
import HomeIndex from "@/pages/Index";
import {TabBar} from "antd-mobile";
import style from './index.module.scss'
import AuthRoute from '@/components/AuthRoute'
import FindHouse from "@/pages/FindHouse";
import KeepAlive from "@/components/KeepAlive";

class Index extends Component {
    tabs = [
        {
            key: '/home/index',
            title: '首页',
            icon: <i className='iconfont icon-ind'></i>
        },
        {
            key: '/home/findhouse',
            title: '找房',
            icon: <i className='iconfont icon-findHouse'></i>
        },
        {
            key: '/home/news',
            title: '资讯',
            icon: <i className='iconfont icon-infom'></i>
        },
        {
            key: '/home/my',
            title: '我的',
            icon: <i className='iconfont icon-my'></i>
        },
    ]
    changeTabBar = (key) => {
        this.props.history.push(key)
    }

    render() {
        return (
            <div className={style.root}>
                <KeepAlive alive='/home/index' path='/home/index' exact component={HomeIndex}> </KeepAlive>
                <KeepAlive alive='/home/findhouse' path='/home/findhouse' exact component={FindHouse}> </KeepAlive>
                <KeepAlive alive='/home/news' path='/home/news' exact component={News}> </KeepAlive>
                <Switch>
                    <AuthRoute path='/home/my' component={My} exact></AuthRoute>
                </Switch>
                <TabBar className='tabbar' onChange={this.changeTabBar}
                        activeKey={this.props.location.pathname}>

                    {this.tabs.map(item => (
                        <TabBar.Item key={item.key} icon={item.icon} title={item.title}
                        />
                    ))}
                </TabBar>
            </div>
        );
    }
}

export default Index;