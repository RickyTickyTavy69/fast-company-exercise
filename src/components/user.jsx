import React from 'react';
import Bookmark from './bookmark';
import Qualities from './qualities';

const User = (props) => {

    

    return (
            <tr>
                <td>{props.name}</td>
                <td>
                    <Qualities qualities = {props.qualities}/>
                </td>
                <td>{props.profession.name}</td>
                <td>{props.completedMeetings}</td>
                <td>{props.rate}</td>
                <td><Bookmark/></td>
                <td><button type="button" className="btn btn-danger" onClick={props.onDelete}>Delete</button></td>
            </tr>
    )
}

export default User;