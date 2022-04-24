import React from "react";
import PropTypes from "prop-types";

const QualitiesList = ({ qualities }) => {
    return (
        <>
            {qualities.map((quality) => {
                const className = `m-2 badge bg-${quality.color}`;
                return (
                    <span key={quality._id} className={className}>
                        {quality.name}
                    </span>
                );
            })}
        </>
    );
};

QualitiesList.propTypes = {
    qualities: PropTypes.array.isRequired
};

export default QualitiesList;
