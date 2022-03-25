import React, { useState } from 'react';
import api from "../api";

const Users = () => {
    
    let [users, setUsers] = useState(api.users.fetchAll());
    
    let [phrase, setPhrase] = useState(`12 человек тусанут с тобой сегодня`);
    let [classes, setClasses] = useState(`badge bg-primary m-2`);
    

    function renderPhrase (number) {
        if(number){
        let makeParty = number === 1? `тусанёт`:
        `тусанут`;
        let humans = number > 1 && number < 5 ?
        `человека`:
        `человек`;
        setPhrase( (prevState) => `${number} ${humans} ${makeParty} с тобой сегодня` );

        } else{
            setClasses( (prevState) => `badge bg-danger m-2`);
            setPhrase( (prevState) => `никто с тобой не тусанёт`);
        }
    }

    function handleDelete(userId){
        
        let usersFiltered = users.filter( (user) => {
            return user._id.toString() !== userId.toString();
        })

        setUsers( (prevState) => usersFiltered);

        renderPhrase (usersFiltered.length);
    }

    function renderTable(){
        let thead = users.length?  <tr>
        <th scope="col">Имя</th>
        <th scope="col">Качества</th>
        <th scope="col">Профессия</th>
        <th scope="col">Встретился, раз</th>
        <th scope="col">Оценка</th>
        <th></th>
    </tr> : <tr></tr>;
        
        let tbody = users.map( (user) => {

            let qulalities = user.qualities.map( (quality) => {
                let className = `badge bg-${quality.color} m-2`;
                return <span className={className} key={quality._id}>{quality.name}</span>;
            })
            
            let rate = `${user.rate}/5`

            return <tr key={user._id}>
                <td key={user._id}>{user.name}</td>
                <td>{qulalities}</td>
                <td>{user.profession.name}</td>
                <td>{user.completedMeetings}</td>
                <td>{rate}</td>
                <td><button onClick={() => {handleDelete(user._id)}} type="button" className="btn btn-danger">Delete</button></td>
            </tr>
        })
        
        return {tbody: tbody, thead: thead};
    }
    
    return(
        <div>
            <span className={classes}><h2>{phrase}</h2></span>
            <table className="table m-2">
                <thead>
                {renderTable().thead}
                </thead>
                <tbody>
                    {renderTable().tbody}
                </tbody>
            </table>
        </div>
    );


}

export default Users;

