import {Redirect, Route} from "react-router-dom";
import {hasToken} from "@/utils/storage";

export default function Index({component: Component, path, ...rest}) {
    return (
        <Route render={props => {
            if (hasToken()) {
                return <Component {...props}/>
            }
            return <Redirect
                to={{
                    pathname: '/login',
                    state: {from: path}
                }}
            ></Redirect>
        }}
               {...rest} ></Route>
    );
}