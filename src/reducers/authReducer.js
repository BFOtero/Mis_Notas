import { types } from "../types/types";

export const authtReducer = ( state = {}, action) => {

    switch (action.type) {
        case types.authlogin:
            return {
                uid: action.payload.uid,
                name: action.payload.displayName
            }
        case types.authlogout:
            return {}
        default:
            return state ;
    }
}