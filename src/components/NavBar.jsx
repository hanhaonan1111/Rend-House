import React from 'react';
import {NavBar} from "antd-mobile";
import history from "@/utils/history";
import propTypes from 'prop-types'

function Nav({children, className, onBack, ...rest}) {
    function onLeftClick() {
        history.goBack(-1)
    }

    return (
        <NavBar className={className} onBack={onBack || onLeftClick} {...rest}>{children}</NavBar>
    );
}

Nav.prototype = {
    children: propTypes.string.isRequired,
    className: propTypes.string,
    onBack: propTypes.func,


}
export default Nav;