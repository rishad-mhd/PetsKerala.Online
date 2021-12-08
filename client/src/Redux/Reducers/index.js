import { combineReducers } from 'redux'
import { categorisedPetsReducer, limitReducer, navLoginReducer, petsReducer, searchReducer, selectedPetReducer, userImageReducer, userPostReducer, userReducer } from './PetsReducer'

const reducers = combineReducers({
    allPets: petsReducer,
    user: userReducer,
    selectedPet: selectedPetReducer,
    navLogin: navLoginReducer,
    categorisedPets: categorisedPetsReducer,
    search: searchReducer,
    userPost: userPostReducer,
    limit: limitReducer,
    userImage:userImageReducer,

})

export default reducers