import styles from './index.module.scss'
import NavBar from "@/components/NavBar";
import {Link, useHistory} from "react-router-dom";
import {useEffect} from "react";
import {AsyncGetHousesList} from "@/store/actions/RentAction";
import {useDispatch, useSelector} from "react-redux";
import NoHouse from "@/components/NoHouse";
import HouseList from "@/components/HouseList";


function Index(props) {
    let history = useHistory()
    let dispatch = useDispatch()
    let {SendHousesList} = useSelector(v => v.Rent)
    useEffect(() => {
        dispatch(AsyncGetHousesList())
    }, [])
    return (
        <div className={styles.root}>
            <NavBar onBack={() => history.go(-1)}>房屋管理</NavBar>
            <div className={styles.houses}>
                {
                    SendHousesList.length > 0 ? (
                            SendHousesList.map((v, i) => <HouseList v={v} key={i + 'list'}/>)
                        )
                        : <NoHouse> </NoHouse>
                }
                <Link to="/rend/add" className={styles.link}>
                    去发布房源
                </Link>
            </div>
        </div>
    );
}

export default Index;