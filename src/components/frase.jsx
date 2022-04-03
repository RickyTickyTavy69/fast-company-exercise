import React from 'react';

const Frase = (props) => {

    let number = props.number;

    let classes = number? `badge bg-primary m-2`: `badge bg-warning m-2`;

    let people = number > 1 && number < 5? `человека` : `человек`;

    let makeparty = number === 1? `тусанёт` : `тусанут`;
    
    let frase = number ? `${number} ${people} ${makeparty} с тобой сегодня` : `никто не тусанёт с тобой сегодня`;

    return (
        <h2><span className={classes}>{frase}</span></h2>
    )
}

export default Frase;