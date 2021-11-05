import {combineReducers} from 'redux'
import {petsReducer} from './PetsReducer'

const reducers = combineReducers({
    allPets:petsReducer,
})

export default reducers