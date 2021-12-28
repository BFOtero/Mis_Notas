import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import validator from 'validator';
import { setError } from '../../actions/ui';
import { useDispatch, useSelector } from 'react-redux';
import { startRegisterUser } from '../../actions/auth';

export const RegisterScreen = () => {

    const dispatch = useDispatch()
    const { msgError} = useSelector(state => state.ui )

    const [ formValues, handleInputChange ] = useForm({ 
        name:'Bastian',
        email:'Bastian.farias@hotmail.com',
        password:'pAPAMON0',
        password2:'pAPAMON0'
    })

    const { name, email, password, password2} = formValues;

    const handleRegister = ( e ) => {
        e.preventDefault();
        
        if( isFormValid() ){
            dispatch( startRegisterUser(email, password, name) )
        }
    }

    const isFormValid = () => {

        if(name.trim().length === 0 ){
            dispatch(setError('El nombre es obligatorio'))
            return false;
        } else if( !validator.isEmail( email ) ){
            dispatch(setError('Email no valido'))
            return false;
        }else if( password !== password2 || password.length < 6){
            dispatch(setError('Las constraseñas deben de ser iguales y tienen que tener un largo mayor a 5'))
            return false;
        }
        return true;
    }

    return (
        <>
            <h3 className="auth__title">Register</h3>

            {   
                msgError &&
                <div className="auth__alert-error " >
                    {msgError}       
                </div>
            
            }

            <form onSubmit={ handleRegister }>
                <input
                    className="auth_input"
                    type="text"
                    placeholder="Name"
                    name="name"
                    autoComplete="off"
                    value={ name }
                    onChange={ handleInputChange }
                />

                <input
                    className="auth_input"
                    type="text"
                    placeholder="Email"
                    name="email"
                    autoComplete="off"
                    value={ email }
                    onChange={ handleInputChange }
                />
            
                <input
                    className="auth_input"
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={ password }
                    onChange={ handleInputChange }
                />

                <input
                    className="auth_input"
                    type="password"
                    placeholder="Confirm password"
                    name="password2"
                    autoComplete="off" 
                    value={ password2 }
                    onChange={ handleInputChange }
                />

                <button
                    className="btn btn-primary btn-block mb-5"
                    type="submit"
                >
                    Login
                </button>
      
                <Link className="link" to="/auth/login">
                    Already registered?
                </Link>

            </form>
        </>
    )
}
