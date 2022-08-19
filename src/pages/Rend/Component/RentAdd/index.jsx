import React, {useEffect, useState} from 'react'
import {ImageUploader, Input, List, TextArea} from 'antd-mobile'
import styles from './index.module.scss'
import NavBar from "@/components/NavBar";
import {useHistory} from "react-router-dom";
import HouseIcon, {HOUSE_PACKAGE} from "@/components/HouseIcon";
import {useDispatch, useSelector} from "react-redux";
import Picker from "@/pages/Rend/Component/Picker";
import http from "@/utils/request";
import {AsyncSendHouseData} from "@/store/actions/RentAction";
// 房屋类型
const roomTypeData = [
    {label: '一室', value: 'ROOM|d4a692e4-a177-37fd'},
    {label: '二室', value: 'ROOM|d1a00384-5801-d5cd'},
    {label: '三室', value: 'ROOM|20903ae0-c7bc-f2e2'},
    {label: '四室', value: 'ROOM|ce2a5daa-811d-2f49'},
    {label: '四室+', value: 'ROOM|2731c38c-5b19-ff7f'}
]

// 朝向：
const orientedData = [
    {label: '东', value: 'ORIEN|141b98bf-1ad0-11e3'},
    {label: '西', value: 'ORIEN|103fb3aa-e8b4-de0e'},
    {label: '南', value: 'ORIEN|61e99445-e95e-7f37'},
    {label: '北', value: 'ORIEN|caa6f80b-b764-c2df'},
    {label: '东南', value: 'ORIEN|dfb1b36b-e0d1-0977'},
    {label: '东北', value: 'ORIEN|67ac2205-7e0f-c057'},
    {label: '西南', value: 'ORIEN|2354e89e-3918-9cef'},
    {label: '西北', value: 'ORIEN|80795f1a-e32f-feb9'}
]

// 楼层
const floorData = [
    {label: '高楼层', value: 'FLOOR|1'},
    {label: '中楼层', value: 'FLOOR|2'},
    {label: '低楼层', value: 'FLOOR|3'}
]

let data = {
    "title": "",
    "description": "",
    "houseImg": "",
    "oriented": "",
    "supporting": '',
    "price": "",
    "roomType": "",
    "size": "",
    "floor": "",
    "community": ""
}


export default function RentAdd() {
    let [form, setForm] = useState(data)
    let updateFormValue = (k, e) => {
        setForm({
            ...form,
            [k]: e
        })
    }


    let history = useHistory()
    let {NowCommunity} = useSelector(v => v.Rent)
    useEffect(() => {
        NowCommunity.community && (form.community = NowCommunity.community)
    }, [NowCommunity.community])
    let [visible, setVisible] = useState(false)
    let [columns, setColumns] = useState([])
    let [renderData, setRenderData] = useState({})
    let onConfirm = (e) => {
        let key = e[0].split('|')[0].toLowerCase()
        console.log(key)
        if (key === 'room') {
            key = 'roomType'
            console.log(roomTypeData.find(v => v.value === e[0]).label)
            setRenderData({
                ...renderData,
                [key]: roomTypeData.find(v => v.value === e[0]).label
            })

        } else if (key === 'orien') {
            key = 'oriented'
            setRenderData({...renderData, [key]: orientedData.find(v => v.value === e[0]).label})
        } else if (key === 'floor') {
            setRenderData({...renderData, [key]: floorData.find(v => v.value === e[0]).label})
        }
        setForm({...form, [key]: e[0]})

    }


    let [selected, setSelected] = useState([])
    let click = (e) => {
        form.supporting = selected.join('|')
    }
    let [fileList, setFileList] = useState([])
    let [url, setUrl] = useState([])
    let dispatch = useDispatch()
    useEffect(() => {
        console.log(url, 'url')
        url.length > 0 && setForm({
            ...form,
            houseImg: url.join('|')
        })
        console.log(form, 'imgs')
    }, [url])
    useEffect(() => {
        console.log('fileList', fileList)
        if (fileList.length > 0) {
            let urls = fileList.map(v => v.url)[0]
            if (urls[0] !== 'h') {
                setUrl([
                    ...url, urls
                ])

            }
        }
    }, [fileList])
    return (
        <div className={[styles.root, 'header'].join(' ')}>
            <NavBar onBack={() => {
                history.goBack()
            }}>发布房源</NavBar>

            <List
                className={styles.header}
                header='房源信息'
            >
                <List.Item
                    onClick={() => history.replace('/rend/search')}
                    extra={NowCommunity.communityName ? NowCommunity.communityName : '请选择'}
                >
                    小区名称
                </List.Item>

                <List.Item extra="￥/月">
                    <div className='money'>
                        <span>租金</span>
                        <Input
                            placeholder="请输入租金/月"
                            value={form.price}
                            onChange={(e) => {
                                updateFormValue('price', e)
                            }}
                        >
                        </Input></div>
                </List.Item>


                <List.Item extra="㎡">
                    <div className='money'>
                        <span>建筑面积</span>
                        <Input
                            placeholder="请输入建筑面积"
                            value={form.size}

                            onChange={(e) => {
                                updateFormValue('size', e)
                            }}
                        />
                    </div>
                </List.Item>

                <List.Item extra={renderData.roomType ? renderData.roomType : '请选择>'}>
                    <span
                        onClick={() => {
                            setColumns(roomTypeData)
                            setVisible(true)
                        }}
                    > 户&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;型</span>
                </List.Item>

                <List.Item extra={renderData.floor ? renderData.floor : '请选择>'}>
                    <span onClick={() => {
                        setColumns(floorData)
                        setVisible(true)
                    }}>所在楼层</span>

                </List.Item>

                <List.Item extra={renderData.oriented ? renderData.oriented : '请选择>'}>
                    <span
                        onClick={() => {
                            setColumns(orientedData)
                            setVisible(true)
                        }}
                    >朝向</span>
                </List.Item>

            </List>

            {/* 房屋标题 */}
            <List
                className={[styles.title, styles.header].join(' ')}
                header='房屋标题'
            >
                <div className='textarea'>
                    <TextArea
                        placeholder='请输入标题（例如：整租 小区名 2室 5000元）'
                        rows={5}
                        value={form.title}
                        onChange={(e) => {
                            updateFormValue('title', e)
                        }}
                    /></div>
            </List>

            {/* 房屋图像 */}
            <List
                className={styles.pics}
                header='房屋图像'
            >
                <div className='textarea'>
                    <ImageUploader
                        value={fileList}
                        multiple={true}
                        onChange={setFileList}
                        upload={async (file) => {
                            let fd = new FormData()
                            fd.append('file', file)
                            let res = await http.post('/houses/image', fd, {
                                headers: {
                                    'Content-Type': 'multipart/form-data'
                                }
                            })
                            setUrl([
                                ...url, res.body[0]
                            ])
                            return {url: 'http://127.0.0.1:8080' + res.body[0]}

                        }}
                    ></ImageUploader>
                </div>
            </List>

            {/* 房屋配置 */}
            <List
                className={styles.supporting}
                header='房屋配置'

            >
                <div className='package'>{
                    HOUSE_PACKAGE.map((v, i) => <HouseIcon
                        children={v.name} key={i} selected={selected} setSelected={setSelected}
                        click={click}
                    />)
                }</div>


            </List>

            {/* 房屋描述 */}
            <List
                className={styles.desc}
                header='房屋描述'
            >
                <div className="textarea">
                    <TextArea
                        rows={5}
                        placeholder="请输入房屋描述信息"
                        value={form.description}
                        onChange={(e) => {
                            updateFormValue('description', e)
                        }}
                    />
                </div>

            </List>
            <Picker visible={visible} setVisible={setVisible} columns={columns} onConfirm={onConfirm}></Picker>


            <div className={styles.bottom}>
                <div className={styles.cancel}>
                    取消
                </div>
                <div className={styles.confirm}
                     onClick={() => {
                         form.title && dispatch(AsyncSendHouseData(form))
                     }}
                >
                    提交
                </div>
            </div>
        </div>
    )

}
