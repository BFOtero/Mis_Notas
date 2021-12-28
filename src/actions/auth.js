import { 
    createUserWithEmailAndPassword, 
    getAuth, 
    signInWithEmailAndPassword, 
    signInWithPopup, 
    signOut, 
    updateProfile 
} from "@firebase/auth";
import { gooleProvider } from "../firebase/firebase-config";
import { types } from "../types/types"
import { finishLoading, startLoading } from "./ui";
import Swal from 'sweetalert2'
import { userLogoutCleaning } from "./note";



export const startLoginEmailPassword = ( email, password ) => {

    return ( dispatch ) => {
        
        dispatch(startLoading());
        const auth = getAuth();
        signInWithEmailAndPassword( auth, email, password )
            .then(({ user }) => { 
                dispatch( login(user.uid, user.displayName));
                dispatch(finishLoading());
                
            })
            .catch( error => {
                console.log(error)
                dispatch(finishLoading());
                Swal.fire({
                    title: 'Error!',
                    text: 'El usuario no existe',
                    icon: 'error',
                    confirmButtonText: 'Intentar otra vez'
                })
            })
    }
}

export const startRegisterUser = ( email, password, name ) => { 
    
    return ( dispatch ) => {

        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password )
            .then( async({user}) =>{
                
                await updateProfile(user, { displayName: name })
                dispatch(
                    login( user.uid, user.displayName)
                )
                console.log(user)       
            })
            .catch( e => {
                Swal.fire({
                    title: 'Error!',
                    text: 'El usuario ya existe',
                    icon: 'error',
                    confirmButtonText: 'Intentar otra vez'
                })
            })
    }
}

export const startGoogleLogin = () =>{

    return (dispatch) =>{
        const auth = getAuth();
        signInWithPopup(auth, gooleProvider)
            .then(({user}) =>{
                dispatch(login( user.uid, user.displayName))
            });
    }
}

export const login = ( uid, displayName ) =>({
    type: types.authlogin,
    payload: { 
        uid, 
        displayName
    }
})

export const logout = () =>({
    type: types.authlogout
})


export const startLogout = () => {

    return async (dispatch) => { 
        const auth = getAuth();
        await signOut(auth);
        dispatch( logout() )
        dispatch( userLogoutCleaning() )
    }
}

