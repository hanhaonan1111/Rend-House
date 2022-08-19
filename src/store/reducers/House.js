let store = {
    IndexCity: {
        name: "广州",
        center: {
            lng: 113.27143134445974,
            lat: 23.135336306695006
        },
        value: "AREA|e4940177-c04c-383d"
    },
    houses: [],
    houseList: [],
    filterHouse: {},
    findHouseList: {
        data: [],
        query: {},
    },
    hasMore: true,
    isCollected: false
}

function HouseRedux(state = store, action) {
    switch (action.type) {
        case 'house/houseData':
            return {
                ...state,
                houses: [...action.data]
            }
        case "house/IndexCity":
            return {
                ...state,
                IndexCity: {...action.data}
            }
        case 'house/List':
            return {
                ...state,
                houseList: [...action.data]
            }
        case 'house/filterHouse':
            if (!action.data) {
                action.data = []
            }
            return {
                ...state,
                filterHouse: {...action.data}
            }
        case 'house/setQuery':
            return {
                ...state,
                findHouseList: {
                    ...state.findHouseList,
                    query: {
                        ...state.findHouseList.query,
                        ...action.data,
                    }
                }
            }

        case 'house/setFindHouseList':
            return {
                ...state,
                findHouseList: {
                    query: {...state.findHouseList.query},
                    data: [...state.findHouseList.data, ...action.data],

                }

            }
        case 'house/ClearNowHouseList':
            return {
                ...state,
                findHouseList: {
                    ...state.findHouseList,
                    data: [],
                    query: {
                        ...state.findHouseList.query,
                        start: 1,
                        end: 20
                    }
                }
            }
        case 'house/changePage':
            return {
                ...state,
                findHouseList: {
                    ...state.findHouseList,
                    query: {
                        ...state.findHouseList.query,
                        ...action.data
                    }
                }
            }
        case 'house/setHasMore':
            return {
                ...state,
                hasMore: action.data
            }
        case 'house/setIsCollected':
            return {
                ...state,
                isCollected: action.data
            }
        case  'house/setQueryCity':

            return {
                ...state,
                findHouseList: {
                    ...state.findHouseList,
                    query: {
                        ...state.findHouseList.query,
                        cityId: action.data
                    }
                }

            }
        default:
            return {...state}
    }

}

export default HouseRedux