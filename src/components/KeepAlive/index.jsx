import React from 'react';
import {Route} from "react-router-dom";

function Index({component: Component, alive, ...rest}) {
    return (
        <Route {...rest}>
            {
                (props) => {
                    let {location} = props
                    let match = location.pathname.startsWith(alive)
                    return <div className={match ? 'show' : 'hide'}>
                        <Component {...props}  ></Component>
                    </div>


                }
            }
        </Route>
    );
}

export default Index;