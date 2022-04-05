import React from "react";
import PropTypes from "prop-types";

const Frase = ({ number }) => {
    const classes = number ? `badge bg-primary m-2` : `badge bg-warning m-2`;

    const people = number > 1 && number < 5 ? `человека` : `человек`;

    const makeparty = number === 1 ? `тусанёт` : `тусанут`;

    const frase = number
        ? `${number} ${people} ${makeparty} с тобой сегодня`
        : `никто не тусанёт с тобой сегодня`;

    return (
        <h2>
            <span className={classes}>{frase}</span>
        </h2>
    );
};

export default Frase;

Frase.propTypes = {
    number: PropTypes.number.isRequired
};
