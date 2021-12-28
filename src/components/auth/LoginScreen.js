import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { startGoogleLogin, startLoginEmailPassword } from '../../actions/auth'
import { useForm } from '../../hooks/useForm'

const LoginScreen = () => {

    const dispatch = useDispatch();
    const { loading } = useSelector(state => state.ui)

    const [formValues, handleInputChange, reset] = useForm({
        email: '',
        password: ''
    })

    const { email, password } = formValues

    const handleSubmit = ( e ) => {
        e.preventDefault();
        dispatch( startLoginEmailPassword(email, password) )
        reset();

        if( isLoginForm () ) { 
            console.log( 'Login completado' )
        }
    }

    const handleGoogleSingin = () => {
        dispatch(startGoogleLogin())
    }

    const isLoginForm = () => {

        if(email.trim().length === 0 || password.trim().length === 0 ) { 
            return false
        } 
        return true
    }

    return (
        <>
            <h3 className="auth__title">Login</h3>

            {
                loading && 
                <div className="auth__alert-error"> 
                    Cargando...
                </div>
            }

            <form
                
                onSubmit={handleSubmit}>
                <input
                    className="auth_input"
                    type="text"
                    placeholder="Email"
                    name="email"
                    autoComplete="off"
                    value={email}
                    onChange={handleInputChange}
                />
            
                <input
                    className="auth_input"
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={password}
                    onChange={handleInputChange}
                />

                <button
                    className="btn btn-primary btn-block"
                    type="submit"
                    disabled={loading}
                >
                    Login
                </button>

                <hr/>

                <div 
                    className="auth__social-networks"
                    onClick={handleGoogleSingin}
                >
                    <p> Login whith social networks</p>
                    <div 
                        className="google-btn"
                    >
                        <div className="google-icon-wrapper">
                            <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
                        </div>
                        <p className="btn-text">
                            <b>Sign in with google</b>
                        </p>
                    </div>
                </div>

                <Link className="link" to="/auth/register">
                    Crea una nueva cuenta
                </Link>

            </form>
        </>
    )
}

export default LoginScreen
