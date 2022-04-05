import React from "react";

import PropTypes from "prop-types";

const Qualities = ({ qualities }) => {
    qualities = qualities.map((quality) => {
        const className = `m-2 badge bg-${quality.color}`;
        return (
            <span key={quality._id} className={className}>
                {quality.name}
            </span>
        );
    });

    return <>{qualities}</>;
};

export default Qualities;

Qualities.propTypes = {
    qualities: PropTypes.array.isRequired
};
