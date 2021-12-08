import { ActionTypes } from "../Constants/ActionTypes";

const initialState = {
    pets: []
}

export const petsReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case ActionTypes.SET_PETS:
            return { ...state, pets: payload }
        default:
            return state
    }
}

export const userReducer = (state = {}, { type, payload }) => {
    switch (type) {
        case ActionTypes.SET_USER:
            return { ...state, user: payload }
        default:
            return state
    }
}

export const selectedPetReducer = (state = {}, { type, payload }) => {
    switch (type) {
        case ActionTypes.SET_SELECTED_PET:
            return { ...state, pet: payload }
        case ActionTypes.REMOVE_SELECTED_PET:
            return {}
        default:
            return state
    }
}


export const navLoginReducer = (state = {}, { type, payload }) => {
    switch (type) {
        case ActionTypes.NAV_LOGIN:
            return { ...state, login: payload }
        default:
            return state
    }
}

export const searchReducer = (state = [], { type, payload }) => {
    switch (type) {
        case ActionTypes.SEARCH:
            return { ...state, items: payload }
        default:
            return state
    }
}

export const categorisedPetsReducer = (state = [], { type, payload }) => {
    switch (type) {
        case ActionTypes.SET_CATEGORISED_PETS:
            return { ...state, pets: payload }
        default:
            return state
    }
}

export const userPostReducer = (state = [], { type, payload }) => {
    switch (type) {
        case ActionTypes.SET_USER_POST:
            return { ...state, pets: payload }
        default:
            return state
    }
}

export const limitReducer = (state = { flimit: 12, climit: 12, glimit:12 }, { type, payload }) => {
    switch (type) {
        case ActionTypes.SET_F_LIMIt:
            return { ...state, flimit: payload }
        case ActionTypes.SET_C_LIMIt:
            return { ...state, climit: payload }
        case ActionTypes.SET_G_LIMIt:
            return { ...state, glimit: payload }
        default:
            return state
    }
}

export const userImageReducer = (state = {}, { type, payload }) => {
    switch (type) {
        case ActionTypes.SET_USER_IMAGE:
            return { ...state, image: payload }
        default:
            return state
    }
}

