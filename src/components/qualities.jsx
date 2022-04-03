import React from 'react';

const Qualities = (props) => {

    let qualities = props.qualities.map((quality) => {
        let className= `m-2 badge bg-${quality.color}`
        return <span key={quality._id} className={className}>{quality.name}</span>
    })

    return (
        <>
        {qualities}
        </>
    )
}


export default Qualities;