import http from "@/utils/request";
import {Toast} from "antd-mobile";
import history from '@/utils/history'

export function SetHousesList(data) {
    return {
        type: 'rent/AllSendHousesList',
        data
    }
}


export function AsyncGetHousesList() {
    return async dispatch => {
        let {status, body, description} = await http({
            url: 'user/houses'
        })
        if (status !== 200) return Toast.show({
            content: description
        })
        dispatch(SetHousesList(body))

    }
}

export function setCommunityList(data) {
    return {
        type: 'rent/setCommunityList',
        data
    }
}

export function AsyncGetCommunityList(data) {
    return async dispatch => {
        let {status, body, description} = await http({
            url: 'area/community',
            params: data
        })
        if (status !== 200) return Toast.show({
            content: description
        })
        dispatch(setCommunityList(body))
    }
}

export function setNowCommunity(data) {
    return {
        type: 'rent/setNowCommunity',
        data
    }
}

export function SubmitHouseData(data) {
    return {
        type: 'rent/SubmitHouseData',
        data
    }
}


export function AsyncSendHouseData(data) {
    return async dispatch => {
        let {status, description} = await http({url: '/user/houses', method: 'POST', data})
        if (status !== 200) return Toast.show({
            content: description
        })
        history.replace('/rend')


    }
}