import React from 'react'
import styles from './index.module.scss'

// 条件筛选栏标题数组：


function FilterTitle({setShow, titleList, selected, setSelected}) {


    return (
        <div align="center" className={styles.root}>
            <div className='box'>
                {/* 选中类名： selected */}
                {
                    titleList.map(v => (
                        <div className={['dropdown', v.type === selected ? 'selected' : ''].join(' ')}
                             key={v.type} onClick={() => {
                            setSelected(v.type)
                            setShow(true)
                        }}
                        >
                            <span>{v.title}</span>
                            <i className="iconfont icon-arrow"/>
                        </div>

                    ))
                }

            </div>
        </div>
    )
}

export default FilterTitle;