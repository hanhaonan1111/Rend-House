let store = {
    SendHousesList: [],
    SearchCommunity: [],
    NowCommunity: {
        city: "AREA|e4940177-c04c-383d",
        cityName: "广州",
        area: "AREA|d16f452d-1c17-9181",
        areaName: "天河",
        street: "AREA|b4a85192-8b8d-7dc2",
        streetName: "龙口西",
        community: "AREA|f603ce9c-0ac8-9268",
        communityName: "龙口花苑希尔顿阳光",
    },
    SubmitHouseData: {},


}

export function Rent(state = store, action) {
    switch (action.type) {
        case 'rent/AllSendHousesList':
            return {
                ...state,
                SendHousesList: [...action.data]
            }
        case 'rent/setCommunityList':
            return {
                ...state,
                SearchCommunity: [...action.data]
            }
        case 'rent/setNowCommunity':
            return {
                ...state,
                NowCommunity: {...action.data}
            }
        case 'rent/SubmitHouseData':
            return {
                ...state,
                SubmitHouseData: {...action.data}
            }
        
        default:
            return {
                ...state

            }
    }

}