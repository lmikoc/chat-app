import React from "react";
import styles from "../styles/Home.module.css";

const Member = ({ id, clientData }, isMe) => {
    const { username, color } = clientData;
    return (
        <div key={id} className={styles.member}>
            <div className={styles.avatar} style={{ backgroundColor: color }} />
            <div className={styles.username}>
                {username} {isMe ? " (you)" : ""}
            </div>
        </div>
    );
};

export default Member;
