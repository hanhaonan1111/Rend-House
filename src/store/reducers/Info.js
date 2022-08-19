let store = {
    id: '',
    houseInfo: {}
}

function HouseInfo(state = store, action) {
    switch (action.type) {
        case 'info/setKey':
            return {
                ...state,
                id: action.data
            }
        case 'info/setHouseInfo':
            return {
                ...state,
                houseInfo: {...action.data}
            }

        default:
            return {...state}
    }
}

export default HouseInfo