import React, { useState, useEffect } from "react";
import api from "../api";
import Frase from "./frase";
import Pagination from "./pagination";
import paginate from "../utils/paginate";
import GroupList from "./groupList";
import UsersTable from "./usersTable";
import _ from "lodash";
import Context from "../context";

const Users = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfessions] = useState();
    const [users, setUsers] = useState();
    const pageSize = 8;
    const [chosenProfession, setChoosenProfession] = useState();
    const [sortBy, setSortBy] = useState({ iter: "name", order: "asc" });

    useEffect(() => {
        api.users.fetchAll().then((data) => {
            if (Array.isArray(data)) {
                setUsers(data);
            } else {
                const dataArr = Object.values(data);
                setUsers(dataArr);
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
        console.log(userId.target);
        const usersFiltered = users.filter((user) => {
            return user._id.toString() !== userId.toString();
        });
        setUsers((prevState) => usersFiltered);
    }

    const handleSort = (item) => {
        setSortBy(item);
    };

    const changeBookmarkStatus = (userId) => {
        const changedUsers = users.map((user) => {
            if (user._id === userId) {
                user.bookmark = user.bookmark ? false : true;
            }
            return user;
        });
        setUsers((prevState) => changedUsers);
    };

    let userCrop;
    let itemsCount;
    if (users) {
        const filteredUsers = chosenProfession
            ? users.filter(
                  (user) => user.profession._id === chosenProfession._id
              )
            : users;
        itemsCount = filteredUsers.length;

        const sortedUsers = _.orderBy(
            filteredUsers,
            [sortBy.path],
            [sortBy.order]
        );
        userCrop = paginate(sortedUsers, pageSize, currentPage);
    }

    if (userCrop) {
        return (
            <Context.Provider
                value={{
                    changeBookmarkStatus
                }}
            >
                <div style={{ justifyContent: "center" }} className="d-flex">
                    {professions && (
                        <div className="d-flex flex-column flex-shrink-0 p-3">
                            <GroupList
                                items={professions}
                                onItemSelect={handleProfessionSelect}
                                choosenProfession={chosenProfession}
                            />
                            <button
                                className="btn btn-secondary mt-2"
                                onClick={showAllProfessions}
                            >
                                {" "}
                                все профессии
                            </button>
                        </div>
                    )}

                    <div className="d-flex flex-column">
                        {users && (
                            <>
                                <Frase number={itemsCount} />

                                <UsersTable
                                    onDelete={handleDelete}
                                    currentSort={sortBy}
                                    users={userCrop}
                                    handleDelete={handleDelete}
                                    onSort={handleSort}
                                />
                            </>
                        )}
                        {users && (
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-around"
                                }}
                            >
                                <Pagination
                                    currentPage={currentPage}
                                    itemsCount={itemsCount}
                                    pageSize={pageSize}
                                    onPageChange={handlePageChange}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </Context.Provider>
        );
    } else {
        return <h1>Loading...</h1>;
    }
};

export default Users;
