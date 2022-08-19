import React from 'react';
import RentManage from "./Component/RentManage";
import RentAdd from "./Component/RentAdd";
import Search from "./Component/Search";
import KeepAlive from "@/components/KeepAlive";

function Index(props) {
    return (<div>
            <KeepAlive alive='/rend/index' path='/rend/index' exact component={RentManage}></KeepAlive>
            <KeepAlive alive='/rend/add' path='/rend/add' exact component={RentAdd}></KeepAlive>
            <KeepAlive alive='/rend/search' path='/rend/search' exact component={Search}></KeepAlive>
        </div>
    );
}

export default Index;