import React, { useState } from "react";
import api from "../api";

import User from "./user";
import Frase from "./frase";
import Pagination from "./pagination";
import paginate from "../utils/paginate";

const Users = () => {
    const [users, setUsers] = useState(api.users.fetchAll());

    const itemsCount = users.length;
    const pageSize = 4;
    const [currentPage, setCurrentPage] = useState(1);

    function handlePageChange(page) {
        setCurrentPage((prevState) => page);
    }

    function handleDelete(userId) {
        const usersFiltered = users.filter((user) => {
            return user._id.toString() !== userId.toString();
        });

        setUsers((prevState) => usersFiltered);
    }

    const userCrop = paginate(users, pageSize, currentPage);

    return (
        <>
            <Frase number={users.length} />

            <table className="table m-2">
                <thead>
                    {users.length ? (
                        <tr>
                            <th scope="col">Имя</th>
                            <th scope="col">Качества</th>
                            <th scope="col">Профессия</th>
                            <th scope="col">Встретился, раз</th>
                            <th scope="col">Оценка</th>
                            <th scope="col">Избранное</th>
                            <th></th>
                        </tr>
                    ) : (
                        <tr></tr>
                    )}
                </thead>
                <tbody>
                    {userCrop.map((user) => {
                        return (
                            <User
                                key={user._id}
                                {...user}
                                onDelete={() => {
                                    handleDelete(user._id);
                                }}
                            />
                        );
                    })}
                </tbody>
            </table>
            <Pagination
                currentPage={currentPage}
                itemsCount={itemsCount}
                pageSize={pageSize}
                onPageChange={handlePageChange}
            />
        </>
    );
};

export default Users;
