import { ActionTypes } from '../Constants/ActionTypes';

export const setPets = (Pets) => {
    return {
        type: ActionTypes.SET_PETS,
        payload: Pets
    }
}

export const setUser = (User) => {
    return {
        type: ActionTypes.SET_USER,
        payload: User
    }
}

export const setSelectedPet = (pet) => {
    return {
        type: ActionTypes.SET_SELECTED_PET,
        payload: pet
    }
}

export const removeSelectedPet = (pet) => {
    return {
        type: ActionTypes.REMOVE_SELECTED_PET,
    }
}

export const navTologin = (login) => {
    return{
        type:ActionTypes.NAV_LOGIN,
        payload:login
    }
}

export const searchByname = (filteredItems) => {
    return{
        type:ActionTypes.SEARCH,
        payload:filteredItems
    }
}

export const setCategorisedPets = (Pets) => {
    return {
        type: ActionTypes.SET_CATEGORISED_PETS,
        payload: Pets
    }
}

export const setUserPost = (Pets) => {
    return {
        type: ActionTypes.SET_USER_POST,
        payload: Pets
    }
}

export const setFLimit = (limit) => {
    return {
        type: ActionTypes.SET_F_LIMIt,
        payload: limit
    }
}

export const setCLimit = (limit) => {
    return {
        type: ActionTypes.SET_C_LIMIt,
        payload: limit
    }
}

export const setGLimit = (limit) => {
    return {
        type: ActionTypes.SET_G_LIMIt,
        payload: limit
    }
}

export const setUserImage = (image) => {
    return {
        type: ActionTypes.SET_USER_IMAGE,
        payload: image
    }
}

