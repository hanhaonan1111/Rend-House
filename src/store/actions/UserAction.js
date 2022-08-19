import http from "@/utils/request";
import {Toast} from "antd-mobile";
import history from "@/utils/history";

export function setTokenReudx(data) {
    return {
        type: 'user/setToken',
        data
    }
}

export function AsyncGetToken(data) {
    return async dispatch => {
        let {body, status, description} = await http({
            url: 'user/login',
            method: 'POST',
            data
        })
        if (status !== 200) {
            return Toast.show({
                content: description,
            })
        }
        dispatch(setTokenReudx(body.token))
        
    }
}

export function setUserInfo(data) {
    return {
        type: 'user/setUserInfo',
        data
    }
}

export function AsyncGetUserInfo() {
    return async dispatch => {
        let {body, description, status} = await http({
            url: '/user'
        })
        if (status !== 200) {
            Toast.show({
                content: description,
            })
            return history.push('/login')
        }
        dispatch(setUserInfo(body))

    }
}




