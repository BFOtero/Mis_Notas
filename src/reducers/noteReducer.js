import { types } from "../types/types";

const initialState = { 
    notes: [],
    active: null
}

export const noteReducer = (state = initialState, action) =>{ 

    switch (action.type) {

        case types.noteActive :

            return {
                ...state,
                active:{
                    ...action.payload
                }
            }
        
        case types.noteAddNote: 
            return {
                ...state,
                notes: [
                    action.payload, 
                    ...state.notes
                ]
            }
        case types.noteLoad: 

            return { 
                ...state, 
                notes: [...action.payload]
            }

        case types.noteUpdated: 
            return { 
                ...state, 
                notes: state.notes.map(
                    note => note.id === action.payload.id
                        ? action.payload
                        : note
                )
            }
        
        case types.noteDelete:
            return{ 
                ...state, 
                active: null, 
                notes: state.notes.filter(note => note.id !== action.payload)
            }


        case types.noteLogoutCleaning:
            return { 
                ...state, 
                active: null,
                notes: []
            }
        default:
            return state

    }


}