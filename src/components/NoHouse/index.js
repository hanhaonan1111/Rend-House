import React from 'react'
import {BASE_URL} from '@/utils/request'
import styles from './index.module.css'

const NoHouse = ({children}) => (
    <div className={styles.root}>
        <img
            className={styles.img}
            src={BASE_URL + '/img/not-found.png'}
            alt="暂无数据"
        />
        <p className={styles.msg}>{children}</p>
    </div>
)


export default NoHouse
