import http from '@/utils/request'
import {Toast} from "antd-mobile";

export function setHouseData(data) {
    return {
        type: 'house/houseData',
        data
    }
}

export function AsyncGetHouseData(id) {
    return async dispatch => {
        let {body} = await http({
            url: '/area/map',
            method: 'GET',
            params: {
                id
            }
        })
        dispatch(setHouseData(body))
    }

}

export function setIndexCity(data) {
    return {
        type: "house/IndexCity",
        data
    }
}

export function setHouseList(data) {
    return {
        type: 'house/List',
        data
    }
}

export function AsyncSetHouseList(params) {
    return async dispatch => {
        let {body: {list}} = await http({
            url: '/houses',
            method: 'GET',
            params
        })
        dispatch(setHouseList(list))
    }
}

export function setFilterHouse(data) {
    return {
        type: 'house/filterHouse',
        data
    }
}

export function AsyncSetFilterHouse(params) {
    return async dispatch => {
        let {body} = await http({
            url: '/houses/condition',
            method: 'GET',
            params
        })
        body && dispatch(setFilterHouse(body))
    }
}

export function setFindHouseList(data,) {
    return {
        type: 'house/setFindHouseList',
        data,
    }
}

export function setQuerys(params) {
    let data = {}
    data.mode = params?.mode
    data.price = params?.price
    data.cityId = params?.cityId
    data.more = params?.more1
    data.start = params.start
    data.end = params.end
    if (params.subway) {
        data.subway = params.subway
    } else {
        data.area = params.area
    }
    return {
        type: 'house/setQuery',
        data
    }

}

export function AsyncGetHouseList(params) {

    return async (dispatch) => {
        let {body: {list}} = await http({
            url: '/houses',
            params
        })
        if (list.length === 0) {
            dispatch(setHasMore(false))
        } else {
            dispatch(setFindHouseList(list))
        }

    }
}

export function ClearNowHouseList() {
    return {
        type: 'house/ClearNowHouseList',

    }
}

export function setHasMore(data) {
    return {
        type: 'house/setHasMore',
        data
    }
}

export function changePage(data) {
    return {
        type: 'house/changePage',
        data
    }
}

export function setIsCollected(data) {
    return {
        type: 'house/setIsCollected',
        data
    }
}

export function AsyncGetIsCollected(id) {
    return async dispatch => {
        let {status, body, description} = await http({
            url: 'user/favorites',
            params: id
        })
        if (status !== 200) {
            return Toast.show({
                icon: 'fail',
                content: description
            })
        }
        dispatch(setIsCollected(true))
    }

}

export function AsyncPostCollected(id) {
    return async dispatch => {
        let {status, body, description} = await http({
            url: 'user/favorites/' + id,
            method: "POST"
        })
        if (status !== 200) {
            return Toast.show({
                icon: 'fail',
                content: description
            })
        }
        dispatch(setIsCollected(true))
    }

}

export function AsyncDeleteCollected(id) {
    return async dispatch => {
        let {status, body, description} = await http({
            url: 'user/favorites/' + id,
            method: "DELETE"
        })
        if (status !== 200) {
            return Toast.show({
                icon: 'fail',
                content: description
            })
        }
        dispatch(setIsCollected(false))
    }

}

export function setQueryCity(data) {
    return {
        type: 'house/setQueryCity',
        data
    }
}

