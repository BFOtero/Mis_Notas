import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startLogout } from '../../actions/auth';
import { startNewNote } from '../../actions/note';
import JournalEntries from './JournalEntries'

const Sidebar = () => {

    const dispatch = useDispatch();
    const {name} = useSelector(state => state.auth)

    const handleNewNote = () => {
        dispatch( startNewNote() )
    }

    const handleLogout = () => { 
        dispatch( startLogout() )
    }

    return (
        <aside className="journal__sidebar">

            <div className="journal__sidebar-navbar">

                <h3 className="mt-5">
                    <i className="far fa-moon"/>
                    <span>{name}</span>
                </h3>

                <button 
                    className="btn"
                    onClick={ handleLogout}    
                >
                    Logout
                </button>

            </div>

            <div 
                className="journal__new-entry"
                onClick={ handleNewNote }
            >

                <i className="far fa-calendar-plus fa-5x" />
                <p className="mt-5">
                    Nueva nota
                </p>
            </div>

            <JournalEntries/>
        </aside>
    )
}

export default Sidebar
