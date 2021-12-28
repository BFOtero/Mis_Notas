import moment from 'moment';
import 'moment/locale/es-mx';
import React from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { startSaveNote, startUploading } from '../../actions/note';

export const NotesAppBar = () => {

    const { active:note } = useSelector(state => state.notes)
    const dispatch = useDispatch();


    const handleSave = () => {
        dispatch( startSaveNote(note) )
    }

    const handlePictureClick = () => { 
        document.querySelector('#fileSelector').click()
    }

    const handleInputFile = ({ target }) => {
        const file = target.files[0]
        
        if( file ){ 
            dispatch( startUploading( file ))
        }
    }

    const date = moment().format('LL')

    return (
        <div className="notes__appbar">
            <span> {date} </span>           

            <input
                id="fileSelector"
                type="file"
                name="file"
                style={{display: 'none'}}
                onChange={handleInputFile}
            />    

            <div>
                <button 
                    className="btn"
                    onClick={handlePictureClick}
                >
                    Imagen
                </button>
                
                <button 
                    className="btn"
                    onClick={handleSave}
                
                >
                    Guardar
                </button>
            </div>
        </div>
        
    )
}
