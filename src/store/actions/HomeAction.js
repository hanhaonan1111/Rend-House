import http from "@/utils/request";

export function setSwiper(data) {
    return {
        type: 'home/setSwiperData',
        data
    }
}

export function AsyncSetSwiper(data) {
    return async (dispatch) => {
        let {body} = await http({
            url: '/home/swiper',
        })
        return dispatch(setSwiper(body))
    }
}

export function SetGroup(data) {
    return {
        type: 'home/SetGroup',
        data
    }
}

export function AsyncSetGroup(data) {
    return async (dispatch) => {
        let {body} = await http({
            url: '/home/groups',
        })
        return dispatch(SetGroup(body))
    }
}

export function setNews(data) {
    return {
        type: 'home/SetNews',
        data
    }
}

export function AsyncSetNews(data) {
    return async dispatch => {
        let data = await http({
            url: '/home/news'
        })
        dispatch(setNews(data.body))
    }
}

export function setNowCity(data) {
    return {
        type: 'home/setNowCity',
        data
    }
}

export function setAllcity(data) {
    return {
        type: 'city/setAllcity',
        data
    }
}

export function AsyncGetAllcity() {
    return async dispatch => {
        let res = await http({
            url: '/area/city?level=1'
        })
        dispatch(setAllcity(res.body))
    }
}

export function setHotcity(data) {
    return {
        type: 'city/setHotcity',
        data
    }
}

export function AsyncGetHostcity() {
    return async dispatch => {
        let res = await http({
            url: '/area/hot'
        })
        dispatch(setHotcity(res.body))
    }
}

