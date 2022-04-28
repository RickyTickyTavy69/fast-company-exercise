import React from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";
import PropTypes from "prop-types";

const Table = ({
    columns,
    selectedSort,
    onSort,
    data,
    handleDelete,
    children
}) => {
    return (
        <table className="table m-2">
            {children || (
                <>
                    <TableHeader
                        columns={columns}
                        selectedSort={selectedSort}
                        onSort={onSort}
                    />

                    <TableBody
                        data={data}
                        handleDelete={handleDelete}
                        columns={columns}
                    />
                </>
            )}
        </table>
    );
};

Table.propTypes = {
    columns: PropTypes.object,
    selectedSort: PropTypes.object,
    onSort: PropTypes.func,
    data: PropTypes.array,
    handleDelete: PropTypes.func,
    children: PropTypes.array
};

export default Table;
