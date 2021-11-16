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

export const navToCreate = (create) => {
    return{
        type:ActionTypes.NAV_CREATE,
        payload:create
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
