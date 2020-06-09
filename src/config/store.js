import { createStore, combineReducers } from 'redux'
import playerReducer from '../features/player/reducer.js'
import mapReducer from '../features/map/reducer'
import modalReducer from '../features/combat/reducer'
import monsterReducer from '../features/combat/monsterReducer.js'

const rootReducer = combineReducers({
    player: playerReducer,
    map: mapReducer,
    combat: modalReducer,
    monster: monsterReducer
})

const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

export default store