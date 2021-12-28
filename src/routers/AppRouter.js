import { getAuth, onAuthStateChanged } from '@firebase/auth';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { 
    BrowserRouter as Router,
    Switch,
} from 'react-router-dom';
import { login } from '../actions/auth';
import { startLoadingNotes } from '../actions/note';
import { JournalScreen } from '../components/journal/JournalScreen';
import LoadScreen from '../components/Load/LoadScreen';
import AuthRouter from './AuthRouter';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

const AppRouter = () => {

    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);
    const [logged, setLogged] = useState(false)

    useEffect(() => { 

        const auth = getAuth();
        onAuthStateChanged(auth, async (user) => { 
            
            if(user?.uid){
                dispatch(login(user.uid, user.displayName) );
                setLogged(true);
                dispatch(startLoadingNotes(user.uid))
            }else(
                setLogged(false)
            )
            setIsLoading(false)
        })

    },[ dispatch, setLogged, setIsLoading ])
    
    if(isLoading){
        return(
            <LoadScreen/>
        )
    }

    return (
        <Router>
            <div>
                <Switch>

                    <PublicRoute
                        path="/auth"
                        component={AuthRouter}
                        isLogged={logged}
                    />
                    <PrivateRoute
                        path="/"
                        exact 
                        component={JournalScreen} 
                        isLogged={logged} 
                    />
                   
                </Switch>
            </div>
        </Router>
    )
}

export default AppRouter
