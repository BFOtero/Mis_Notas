import { addDoc, collection, deleteDoc, doc, updateDoc } from "@firebase/firestore";
import Swal from "sweetalert2";
import { db } from "../firebase/firebase-config";
import { fileUpload } from "../helpers/fileUpload";
import { loadNotes } from "../helpers/loadNotes";
import { types } from "../types/types";


 
export const startNewNote = () => { 
  
    return async (dispatch, getState) => { 
        const uid = getState().auth.uid;
  
        const newNote = { 
            title: '',
            body: '',
            date: new Date().getTime()
        }
        const docRef = await addDoc(collection(db, `${uid}/journal/notes`), newNote)

        dispatch( activeNote( docRef.id, newNote ) )
        dispatch( addNewNote( docRef.id, newNote) )

   
    }
}


export const activeNote = ( id, note ) =>({ 

    type:types.noteActive,
    payload: {
        id, 
        ...note
    }
})

export const addNewNote = ( id, note) => ({

    type:types.noteAddNote, 
    payload: {
        id, 
        ...note
    }
})

export const startLoadingNotes = ( uid ) => { 
    return async( dispatch ) => { 

        const notes = await(loadNotes( uid ))
        dispatch(setNotes(notes))
    }
}

export const setNotes = ( note ) => ({ 
    type: types.noteLoad,
    payload: note
})

export const startSaveNote = ( note ) => { 

    return async (dispatch, getState) => {

        const {uid} = getState().auth;

        if(!note.url){
            delete note.url
        }

        const noteToFirestore = {...note}
        delete noteToFirestore.id

        const noteRef = doc(db,`${uid}/journal/notes/${note.id}`)   
        await updateDoc( noteRef, noteToFirestore)

        dispatch( refreshNote(note.id, noteToFirestore))
        Swal.fire('Guardado correctamente', note.title, 'success')
    }
}

export const refreshNote = (id, note) => ({

    type:types.noteUpdated, 
    payload: {
        id, 
        note:{
            id, 
            ...note
        }
    }


});


export const startUploading = ( file ) => { 

    return async (dispatch, getState) => {

        const { active: note } = getState().notes;

        Swal.fire({
            title: 'Uplading',
            text: 'Subiendo imagen...',
            allowOutsideClick: false, 

        })
        const fileUrl = await fileUpload( file );
        note.url = fileUrl

        dispatch( startSaveNote(note))
        Swal.close()

    }
}

export const startDeleteNote = (id) => {

    return async(dispatch, getState) => {


        const {uid} = getState().auth;
        const docDelete = doc(db, `${uid}/journal/notes/${id}`)
        await deleteDoc(docDelete)

        dispatch(deleteNote(id))

    }

}

export const deleteNote = (id) => ({
    type:types.noteDelete, 
    payload: id
})


export const userLogoutCleaning = () => ({
    type:types.noteLogoutCleaning
})