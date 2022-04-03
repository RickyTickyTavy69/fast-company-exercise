import React, {useState} from 'react';

const Bookmark = (props) => {

    let [className, setClassName] = useState(`bi bi-bookmark`);

    function changeClass() {
        let changedClassName = className === `bi bi-bookmark`? `bi bi-bookmark-heart-fill` : `bi bi-bookmark`;

        setClassName( (prevstate) => changedClassName);
    }

    return (
        <button onClick={changeClass} type="button"><i className={className}></i></button>
    )
}

export default Bookmark;


