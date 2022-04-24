import React, { useState, useContext } from "react";
import Context from "../context";

const Bookmark = ({ user, userId }) => {
    const { changeBookmarkStatus } = useContext(Context);

    return (
        <button onClick={() => changeBookmarkStatus(userId)} type="button">
            <i
                className={
                    user.bookmark
                        ? "bi bi-bookmark-star-fill"
                        : "bi bi-bookmark"
                }
            ></i>
        </button>
    );
};

export default Bookmark;
