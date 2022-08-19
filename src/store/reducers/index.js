import {combineReducers} from 'redux'
import {HomeRedux} from './Home'
import HouseRedux from './House'
import Info from './Info'
import {UserReducer} from './User'
import {Rent} from "@/store/reducers/Rent";

export default combineReducers({
    Home: HomeRedux,
    House: HouseRedux, Info,
    User: UserReducer,
    Rent,
})