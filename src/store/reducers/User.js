import {getToken, setToken} from '@/utils/storage'

let store = {
    token: getToken() || '',
    userInfo: {}
}

export function UserReducer(state = store, action) {
    switch (action.type) {
        case 'user/setToken':
            setToken(action.data)
            return {
                ...state,
                token: action.data
            }
        case 'user/setUserInfo':
            return {
                ...state,
                userInfo: {...action.data}
            }
        default :
            return {
                ...state,

            }
    }
}