import { ActionTypes } from "../Constants/ActionTypes";

const initialState = {
    pets: []
}

export const petsReducer = (state = initialState, { type, payload })=>{
    switch(type){
        case ActionTypes.SET_PETS:
            return {...state,pets:payload}
        default:
            return state
    }
}

export const userReducer = (state={},{type,payload})=>{
    switch(type){
        case ActionTypes.SET_USER:
            return {...state,user:payload}
        default:
            return state
    }
}