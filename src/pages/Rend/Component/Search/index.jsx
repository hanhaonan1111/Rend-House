import React, {useEffect, useRef, useState} from 'react'
import {List, SearchBar} from 'antd-mobile'
import styles from './index.module.scss'
import {useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AsyncGetCommunityList, setCommunityList, setNowCommunity} from "@/store/actions/RentAction";

export default function Search() {
    let {IndexCity} = useSelector(v => v.House)
    let {SearchCommunity} = useSelector(v => v.Rent)
    let history = useHistory()
    let timer = useRef(null)
    let [key, setKey] = useState('')
    let dispatch = useDispatch()

    useEffect(() => {
        if (!key) {
            dispatch(setCommunityList([]))
        }
    }, [key])
    let getResultList = (e) => {
        if (timer.current) {
            clearTimeout(timer.current)
        }
        setKey(e)
        timer.current = window.setTimeout(() => {
            e.length > 0 && dispatch(AsyncGetCommunityList({name: e, id: IndexCity.value}))
        }, 120)
    }
    return (
        <div className={styles.root}>
            {/* 搜索框 */}
            <SearchBar
                placeholder="请输入小区或地址"
                showCancelButton={() => true}
                onChange={(e) => getResultList(e)}
                onCancel={() => history.replace('/rend/add')}
            />

            {/* 搜索提示列表 */}
            <List className={styles.tips}>

                {
                    SearchCommunity && SearchCommunity.map((v, i) => (<List.Item key={i + 'item'}>


                            <div dangerouslySetInnerHTML={
                                {
                                    __html: v.communityName.replace(new RegExp(key, 'gi'), `<span
                                 class="light">${key}</span>`)
                                }
                            }
                                 onClick={() => {
                                     dispatch(setNowCommunity(v))
                                     history.push('/rend/add')
                                 }}
                            ></div>


                        </List.Item>)
                    )
                }

            </List>
        </div>
    )

}
