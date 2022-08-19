import style from './index.module.scss'
import SearchNav from "@/components/searchNav";
import Filter from "@/pages/FindHouse/component/Filter";
import {useDispatch, useSelector} from "react-redux";
import HouseList from "@/components/HouseList";
import {useEffect, useState} from "react";
import {InfiniteScroll} from "antd-mobile";
import {AsyncGetHouseList, changePage, ClearNowHouseList, setQuerys} from "@/store/actions/HouseAction";
import {setHouseId} from "@/store/actions/HouseInfoAction";
import {useHistory} from "react-router-dom";


function Index(props) {
    let history = useHistory()
    let {findHouseList} = useSelector(v => v.House)

    let House = useSelector(v => v.House)
    let [loadMore, setLoadMore] = useState(true)
    let dispatch = useDispatch()
    let {IndexCity} = useSelector(v => v.House)

    let [id, setId] = useState('')
    let [query, setQuery] = useState({
        cityId: IndexCity.value,
        start: findHouseList.query?.start || 1,
        end: findHouseList.query?.end || 20
    })

    useEffect(() => {
        dispatch(setQuerys(query))
        dispatch(ClearNowHouseList())
    }, [dispatch])


    async function LoadMore() {
        if (loadMore) {
            let query = {
                start: findHouseList.query.end + 1 || 1,
                end: findHouseList.query.end + 20 || 20
            }
            setLoadMore(false)
 
            findHouseList.query.cityId && await dispatch(AsyncGetHouseList(findHouseList.query))
            dispatch(changePage(query))
            setLoadMore(true)
        }
    }

    useEffect(() => {
        if (findHouseList.query.cityId) {
            dispatch(ClearNowHouseList())
        }
        // return () => {
        //     dispatch(ClearNowHouseList())
        // }
    }, [House.IndexCity.value])


    function OnClick(e) {
        let id = e.houseCode || ''
        if (id) {
            dispatch(setHouseId(id))
            history.push('/detail/' + id)
        }

    }

    return (
        <div className={style.root}>
            <SearchNav className='nav'></SearchNav>
            <Filter></Filter>
            <div className='list'>
                {
                    findHouseList.data && findHouseList.data.map((v, i) => (
                        <HouseList v={v} i={'filter' + i} key={i + 'TabBar'}
                                   OnClick={OnClick}
                        ></HouseList>
                    ))
                }
                <InfiniteScroll hasMore={House.hasMore} loadMore={() => LoadMore()}/>
            </div>

        </div>
    );
}

export default Index;