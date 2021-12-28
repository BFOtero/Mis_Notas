import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { authtReducer } from '../reducers/authReducer';
import { uiReducer } from '../reducers/uiReducer';
import thunk from 'redux-thunk'
import { noteReducer } from '../reducers/noteReducer';

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const reducers = combineReducers({
    auth: authtReducer,
    ui: uiReducer,
    notes: noteReducer
})

export const store = createStore( 
    reducers, 
    composeEnhancers( 
        applyMiddleware( thunk )
    )
); 