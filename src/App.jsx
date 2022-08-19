import './App.css';
import {Redirect, Route, Router, Switch} from 'react-router-dom'
import React, {Suspense} from 'react'
import Map from "@/pages/Map";
import history from "@/utils/history";

import AuthRoute from '@/components/AuthRoute'
import Home from "@/pages/Home";
import KeepAlive from "@/components/KeepAlive";
// import Home from "@/pages/Home";
// import cityList from "@/pages/cityList";
// import HouseDetail from "@/pages/HouseDetail";
// import Login from "@/pages/Login";

let HouseDetail = React.lazy(() => import("@/pages/HouseDetail"))
let Login = React.lazy(() => import("@/pages/Login"))
let Rend = React.lazy(() => import("@/pages/Rend"))
// let Home = React.lazy(() => import("@/pages/Home"))
let cityList = React.lazy(() => import("@/pages/cityList"))

function App() {
    // let dispatch = useDispatch()
    // useEffect(() => {
    //     const current = new window.BMapGL.LocalCity()
    //     current.get(res => {
    //         dispatch(setNowCity(res))
    //     })
    // }, [])
    return (

        <div className="App">
            <Suspense fallback={<div>loading...</div>}>
                <Router history={history}>
                    <KeepAlive alive='/home' path='/home' component={Home}></KeepAlive>
                    <KeepAlive path='/citylist' alive='/citylist' component={cityList}></KeepAlive>
                    <KeepAlive alive='/login' path='/login' component={Login} exact></KeepAlive>
                    <KeepAlive path='/detail/:id' alive='/detail' component={HouseDetail} exact></KeepAlive>
                    <Switch>
                        <Redirect from='/' to='/home/index' exact></Redirect>
                        <Redirect from='/rend' to='/rend/index' exact></Redirect>
                        <Route path='/map' component={Map} exact></Route>
                        <AuthRoute path='/rend/index' component={Rend}></AuthRoute>
                    </Switch>


                </Router>
            </Suspense>
        </div>

    );
}

export default App;
