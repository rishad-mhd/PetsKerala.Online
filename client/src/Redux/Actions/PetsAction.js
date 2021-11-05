import {ActionTypes} from '../Constants/ActionTypes';

export const setPets = (Pets) =>{
    return{
        type:ActionTypes.SET_PETS,
        payload:Pets
    }
}