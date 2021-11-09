import {combineReducers} from 'redux'
import {petsReducer, userReducer} from './PetsReducer'

const reducers = combineReducers({
    allPets:petsReducer,
    user:userReducer,

})

export default reducers