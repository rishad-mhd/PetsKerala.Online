import { combineReducers } from 'redux'
import { categorisedPetsReducer, editPostReducer, imageCropReducer, navLoginReducer, petsReducer, searchReducer, selectedPetReducer, userPostReducer, userReducer } from './PetsReducer'

const reducers = combineReducers({
    allPets: petsReducer,
    user: userReducer,
    selectedPet: selectedPetReducer,
    navLogin: navLoginReducer,
    categorisedPets: categorisedPetsReducer,
    search: searchReducer,
    userPost: userPostReducer,
    croppedImage: imageCropReducer,

})

export default reducers