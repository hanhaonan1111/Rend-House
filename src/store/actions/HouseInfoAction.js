import http from "@/utils/request";

export function setHouseId(data) {
    return {
        type: 'info/setKey',
        data
    }
}

export function setHouseInfo(data) {
    return {
        type: 'info/setHouseInfo',
        data
    }
}

export function AsyncGetHouseInfo(id) {
    return async dispatch => {
        let {body} = await http({
            url: '/houses/' + id
        })
        dispatch(setHouseInfo(body))
    }
}


