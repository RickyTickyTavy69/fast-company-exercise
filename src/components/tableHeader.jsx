import React, { useState } from "react";
import PropTypes from "prop-types";

const TableHeader = ({ onSort, selectedSort, columns }) => {
    const handleSort = (key, item) => {
        setSortedItem(key);
        toggleCaretClass(key);
        if (selectedSort.path === item.path) {
            onSort({
                ...selectedSort,
                order: selectedSort.order === "asc" ? "desc" : "asc"
            });
        } else {
            onSort({ path: item.path, order: "asc" });
        }
    };

    const [sortedItem, setSortedItem] = useState("");
    const [caretClass, setCaretClass] = useState("");

    const toggleCaretClass = (key) => {
        if (key === sortedItem) {
            setCaretClass(
                caretClass === ""
                    ? "bi bi-caret-up-fill"
                    : caretClass === "bi bi-caret-up-fill"
                    ? "bi bi-caret-down-fill"
                    : "bi bi-caret-up-fill"
            );
        } else {
            setCaretClass("bi bi-caret-up-fill");
        }
    };

    return (
        <thead>
            <tr>
                {Object.keys(columns).map((key) => (
                    <th
                        className={
                            columns[key].path && sortedItem === key
                                ? caretClass
                                : ""
                        }
                        key={key}
                        onClick={
                            columns[key].path
                                ? () => handleSort(key, columns[key])
                                : undefined
                        }
                        scope="col"
                        role={columns[key].path ? "button" : ""}
                    >
                        {columns[key].name}
                    </th>
                ))}
            </tr>
        </thead>
    );
};

TableHeader.propTypes = {
    selectedSort: PropTypes.object.isRequired,
    onSort: PropTypes.func.isRequired,
    columns: PropTypes.object.isRequired
};

export default TableHeader;
