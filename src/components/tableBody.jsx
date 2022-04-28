import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import { Link } from "react-router-dom";

const TableBody = ({ data, handleDelete, columns }) => {
    const renderContent = (item, column) => {
        if (columns[column].component) {
            const component = columns[column].component;
            if (typeof component === "function") {
                return component(item);
            }
        }
        if (column === "name") {
            return (
                <Link to={`/user/${item._id}`}>
                    {_.get(item, columns[column].path)}{" "}
                </Link>
            );
        }
        return _.get(item, columns[column].path);
    };

    return (
        <tbody>
            {data.map((item) => (
                <tr key={item._id}>
                    {Object.keys(columns).map((column) => (
                        <td key={column}>{renderContent(item, column)}</td>
                    ))}
                </tr>
            ))}
        </tbody>
    );
};

TableBody.propTypes = {
    data: PropTypes.array.isRequired,
    handleDelete: PropTypes.func.isRequired,
    columns: PropTypes.object.isRequired
};

export default TableBody;
