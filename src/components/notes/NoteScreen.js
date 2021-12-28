import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { activeNote, startDeleteNote } from '../../actions/note'
import { useForm } from '../../hooks/useForm'
import { NotesAppBar } from './NotesAppBar'

export const NoteScreen = () => {

    const { active: note } = useSelector(state => state.notes)
    const [ formValues, handleInputChange, reset ] = useForm( note )
    const activeId = useRef( note.id )
    const dispatch = useDispatch();
    const { title, body, url, id} =  formValues;

    const handleDelete = () => {
        dispatch( startDeleteNote(id))
    }


    useEffect(() => {
        if( note.id !== activeId.current){
            reset( note );
            activeId.current = note.id;
        }
    },[note, reset])

    
    useEffect(() => {

        dispatch(activeNote(formValues.id, {...formValues}))
        
    },[formValues, dispatch ])

    return (
        <div className="notes__main-content">
            <NotesAppBar/>

            <div className="notes__content">
                <input
                    type="text"
                    placeholder="Titulo"
                    className="notes__title-input"
                    autoComplete="off"
                    value={title}
                    name="title"
                    onChange={handleInputChange}
                />
                <hr/>
                <textarea
                    placeholder="Que sucede hoy"
                    className="notes__textarea mt-5"
                    name="body"
                    value={body}
                    onChange={handleInputChange}
                ></textarea>

                {
                    url 
                    &&(
                        <div className="notes__image">
                            <img
                                src={url}
                                alt="imagen"
                            />
                        </div>
                    )
                }
            </div>

            <button
                className="btn btn-danger"
                onClick={handleDelete}
            > 
                Borrar
            </button>
        </div>
    )
}
