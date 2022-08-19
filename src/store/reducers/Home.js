let home = {
    swiper: [],
    groups: [],
    news: [],
    city: {
        nowCity: {
            name: '北京',
            center: {
                lng: 116.23,
                lat: 39.54
            }
        },
        allCity: [],
        hotCity: []
    },
    
}

export function HomeRedux(state = home, action) {
    switch (action.type) {
        case 'home/setSwiperData':
            return {
                ...state,
                swiper: [...action.data]
            }
        case 'home/SetGroup':
            return {
                ...state,
                groups: [...action.data]
            }
        case 'home/SetNews':
            return {
                ...state,
                news: [...action.data]
            }
        case 'home/setNowCity':
            return {
                ...state,
                city: {
                    ...state.city,
                    nowCity: action.data
                }
            }
        case 'city/setAllcity':
            const charCodeOfA = 'A'.charCodeAt(0)
            let data = Array(26)
                .fill('')
                .map((_, i) => (
                    {
                        title: String.fromCharCode(charCodeOfA + i),
                        items: []
                    }
                ))

            action.data.map(v => {
                let index = data.find(val => val.title === v.short[0].toUpperCase())
                index.items.push(v)
            })
            data.unshift({title: '当前城市', items: [{label: state.city.nowCity.name}]})
            data.unshift({title: '热门城市', items: [...state.city.hotCity]})
            return {
                ...state,
                city: {
                    ...state.city,
                    allCity: [...data]
                }
            }

        case 'city/setHotcity':
            return {
                ...state,
                city: {
                    ...state.city,
                    hotCity: [...action.data]
                }
            }
    }

    return state

}