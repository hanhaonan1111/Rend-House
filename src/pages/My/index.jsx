import React, {useEffect} from 'react';
import {BASE_URL} from "@/utils/request";
import styles from './index.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {AsyncGetUserInfo, setTokenReudx, setUserInfo} from "@/store/actions/UserAction";
import {useHistory} from "react-router-dom";
import {Dialog, Toast} from "antd-mobile";
import {setToken} from "@/utils/storage";

const menus = [
    {id: 1, name: '我的收藏', iconfont: 'icon-coll', to: '/favorate'},
    {id: 2, name: '我的出租', iconfont: 'icon-ind', to: '/rent'},
    {id: 3, name: '看房记录', iconfont: 'icon-record'},
    {
        id: 4,
        name: '成为房主',
        iconfont: 'icon-identity'
    },
    {id: 5, name: '个人资料', iconfont: 'icon-myinfo'},
    {id: 6, name: '联系我们', iconfont: 'icon-cust'}
]

function Index(props) {
    let history = useHistory()
    let dispatch = useDispatch()
    useEffect(() => {
        dispatch(AsyncGetUserInfo())
    }, [dispatch])

    let {userInfo} = useSelector(v => v.User)

    return (
        <div className={styles.root}>
            {/* 个人信息 */}
            <div className={styles.title}>
                <img
                    className={styles.bg}
                    src={BASE_URL + '/img/profile/bg.png'}
                    alt="背景图"
                />
                <div className={styles.info}>
                    <div className={styles.myIcon}>
                        <img
                            className={styles.avatar}
                            src={BASE_URL + userInfo.avatar}
                            alt="icon"
                        />
                    </div>
                    <div className={styles.user}>
                        <div className={styles.name}>{userInfo.nickname}</div>
                        {/* 登录后展示： */}


                        <div className={styles.auth} onClick={() => {
                            Dialog.confirm({
                                content: '您确定要退出吗?',
                                closeOnMaskClick: true,
                                onConfirm: () => {
                                    history.push('/login')
                                    setToken('')
                                    dispatch(setUserInfo({}))
                                    dispatch(setTokenReudx(''))
                                    Toast.show({
                                        icon: 'success',
                                        content: '已退出',
                                    })
                                }

                            })


                        }}>
                            <span>退出</span>
                        </div>
                        <div className={styles.edit}>
                            编辑个人资料
                            <span className={styles.arrow}>
                          <i className="iconfont icon-arrow"/>
                        </span>
                        </div>


                        {/* 未登录展示： */}
                    </div>
                </div>
            </div>


            <div className={styles.ad}>
                <img src={BASE_URL + '/img/profile/join.png'} alt=""/>
            </div>

            <div className={styles.grid}>
                <div className='item'>
                    {
                        menus.map((item, i) => <div key={i} className='menuItem'
                                                    onClick={() => {
                                                        item.to && history.push(item.to)
                                                    }}
                        >
                            <i className={`iconfont ${item.iconfont}`}/>
                            <span className='name'>{item.name}</span>
                        </div>)
                    }

                </div>
            </div>
        </div>
    );
}

export default Index;