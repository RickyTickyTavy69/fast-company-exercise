import React, { useState } from 'react';
import api from "../api";

import User from './user';
import Frase from './frase';



const Users = () => {
    
    let [users, setUsers] = useState(api.users.fetchAll());

    function handleDelete(userId){
        
        let usersFiltered = users.filter( (user) => {
            return user._id.toString() !== userId.toString();
        })

        setUsers( (prevState) => usersFiltered);
    }

    return(
        <>
            <Frase number={users.length} />

            <table className="table m-2">
                <thead>
                    {users.length? <tr>
                        <th scope="col">Имя</th>
                        <th scope="col">Качества</th>
                        <th scope="col">Профессия</th>
                        <th scope="col">Встретился, раз</th>
                        <th scope="col">Оценка</th>
                        <th scope="col">Избранное</th>
                        <th></th>
                    </tr> : <tr></tr> }
                    
                </thead>
                <tbody>{
                users.map( (user) => {
                    return <User key={user._id} {...user} onDelete={ () => {handleDelete(user._id)}}/>
                })}
                </tbody>
            </table>
        </>
    );

}

export default Users;

