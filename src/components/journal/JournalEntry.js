import moment from 'moment'
import 'moment/locale/es-mx'
import React from 'react'
import { useDispatch } from 'react-redux'
import { activeNote } from '../../actions/note'

export const JournalEntry = ({ id, title, body, date, url }) => {

    const dispatch = useDispatch();
    const day = moment(date).format('dddd')
    const dayNumber = moment(date).format('D')

    const handleEntryClick = () => {
        dispatch( activeNote(id, {
            title, 
            body, 
            date, 
            url
        }))
    }
   
    return (
        <div 
            className="journal__entry"
            onClick={handleEntryClick}    
        >

            {
                url
                    &&(
                        <div 
                            className="journal__entry-picture"
                            style={{
                                backgroundSize: 'cover',
                                backgroundImage: `url(${url})`
                            }}
                        >
                        </div>
                    )
            }

            <div className="journal__entry-body" >
                <p className="journal__entry-title" >
                    {title}
                </p>
                <p className="journal__entry-content" >
                    {body}
                </p>
            </div>
            <div className="journal__entry-date-box" >
                <span >{day}</span>
                <h4>{dayNumber}</h4>
            </div>
        </div>
    )
}
