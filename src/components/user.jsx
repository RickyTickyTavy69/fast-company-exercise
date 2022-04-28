import { useEffect, React, useState } from "react";
import { useParams, Redirect } from "react-router-dom";
import api from "../api";
import QualitiesList from "./qualitiesList";

const User = () => {
    const params = useParams();
    const userId = params.userId;
    const [user, setUser] = useState();

    const [redirectUsers, setRedirectUsers] = useState(false);

    const showAll = () => {
        console.log("all");
        setRedirectUsers((prevState) => true);
    };

    useEffect(() => {
        api.users.getById(userId).then((data) => {
            setUser(data);
        });
    }, []);

    if (!redirectUsers) {
        if (user) {
            return (
                <>
                    <h1>{user.name}</h1>
                    <h2>Профессия: {user.profession.name}</h2>
                    <QualitiesList qualities={user.qualities} />
                    <p>Встретился, раз: {user.completedMeetings}</p>
                    <h1>Оценка: {user.rate}</h1>
                    <button onClick={() => showAll()}>Все пользователи</button>
                </>
            );
        } else {
            return (
                <>
                    <h1>Loading...</h1>
                </>
            );
        }
    } else {
        return <Redirect to="/users" />;
    }
};

export default User;
