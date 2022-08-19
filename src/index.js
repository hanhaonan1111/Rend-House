import React from 'react';
import './index.css';
import App from './App';
import './assets/fonts/iconfont.css'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import store from "@/store";

function Root() {
    return <Provider store={store}>
        <App/>
    </Provider>
}

ReactDOM.render(<Root/>, document.getElementById('root'))

