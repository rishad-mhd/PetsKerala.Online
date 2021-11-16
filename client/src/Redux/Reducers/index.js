import { combineReducers } from 'redux'
import { navCreateReducer, navLoginReducer, petsReducer, searchReducer, selectedPetReducer, userReducer } from './PetsReducer'

const reducers = combineReducers({
    allPets: petsReducer,
    user: userReducer,
    selectedPet: selectedPetReducer,
    navCreate: navCreateReducer,
    navLogin: navLoginReducer,
    search: searchReducer

})

export default reducers