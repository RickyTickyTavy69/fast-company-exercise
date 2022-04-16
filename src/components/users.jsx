import React, { useState, useEffect } from "react";
import api from "../api";
import User from "./user";
import Frase from "./frase";
import Pagination from "./pagination";
import paginate from "../utils/paginate";
import GroupList from "./groupList";

const Users = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfessions] = useState();
    const [users, setUsers] = useState();
    const pageSize = 4;
    const [chosenProfession, setChoosenProfession] = useState();

    useEffect(() => {
        api.users.fetchAll().then((data) => {
            if (typeof data === "object") {
                const dataArr = Object.values(data);
                console.log(dataArr, typeof dataArr);
                setUsers(dataArr);
            } else {
                setUsers(data);
            }
        });
    }, []);

    useEffect(() => {
        api.professions.fetchAll().then((data) => {
            setProfessions(data);
        });
    }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [chosenProfession]);

    const handleProfessionSelect = (item) => {
        setChoosenProfession((prevState) => item);
    };

    const showAllProfessions = () => {
        setChoosenProfession();
    };

    function handlePageChange(page) {
        setCurrentPage((prevState) => page);
    }

    function handleDelete(userId) {
        const usersFiltered = users.filter((user) => {
            return user._id.toString() !== userId.toString();
        });
        setUsers((prevState) => usersFiltered);
    }

    let userCrop;
    let itemsCount;
    if (users) {
        const filteredUsers = chosenProfession ? users.filter((user) => user.profession._id === chosenProfession._id) : users;
        itemsCount = filteredUsers.length;
        userCrop = paginate(filteredUsers, pageSize, currentPage);
    }

    return (
        <div style={{ justifyContent: "center" }} className="d-flex">

            {professions && (
                <div className="d-flex flex-column flex-shrink-0 p-3">
                    <GroupList items={professions}
                        onItemSelect={handleProfessionSelect}
                        choosenProfession={chosenProfession}
                    />
                    <button
                        className="btn btn-secondary mt-2"
                        onClick={showAllProfessions}
                    >
                        {" "}все профессии
                    </button>
                </div>
            )}

            <div className="d-flex flex-column">

                { users &&
                <>
                    <Frase number={itemsCount} />

                    <table className="table m-2">
                        <thead>
                            {users.length
                                ? (
                                    <tr>
                                        <th scope="col">Имя</th>
                                        <th scope="col">Качества</th>
                                        <th scope="col">Профессия</th>
                                        <th scope="col">Встретился, раз</th>
                                        <th scope="col">Оценка</th>
                                        <th scope="col">Избранное</th>
                                        <th></th>
                                    </tr>
                                )
                                : (
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
                    </table></>
                }
                {users && <div style={{ display: "flex", justifyContent: "space-around" }}>
                    <Pagination
                        currentPage={currentPage}
                        itemsCount={itemsCount}
                        pageSize={pageSize}
                        onPageChange={handlePageChange}
                    />
                </div>}
            </div>
        </div>
    );
};

export default Users;
