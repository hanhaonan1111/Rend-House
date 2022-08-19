import {applyMiddleware, createStore} from "redux";
import reducer from './reducers'
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";

let store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))

export default store