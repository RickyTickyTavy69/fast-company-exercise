import React from "react";
import Bookmark from "./bookmark";
import Qualities from "./qualities";

import PropTypes from "prop-types";

const User = ({
    name,
    qualities,
    profession,
    completedMeetings,
    rate,
    onDelete
}) => {
    return (
        <tr>
            <td>{name}</td>
            <td>
                <Qualities qualities={qualities} />
            </td>
            <td>{profession.name}</td>
            <td>{completedMeetings}</td>
            <td>{rate}</td>
            <td>
                <Bookmark />
            </td>
            <td>
                <button
                    type="button"
                    className="btn btn-danger"
                    onClick={onDelete}
                >
                    Delete
                </button>
            </td>
        </tr>
    );
};

User.propTypes = {
    name: PropTypes.string.isRequired,
    qualities: PropTypes.array.isRequired,
    profession: PropTypes.object.isRequired,
    completedMeetings: PropTypes.number.isRequired,
    rate: PropTypes.number.isRequired,
    onDelete: PropTypes.func.isRequired
};

export default User;
