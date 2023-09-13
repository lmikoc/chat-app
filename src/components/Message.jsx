import React from "react";
import styles from "../styles/Home.module.css";

const Message = ({ member, data, id }, me) => {
    const { username, color } = member.clientData;
    const messageFromMe = member.id === me.id;
    const className = messageFromMe
        ? `${styles.messagesMessage} ${styles.currentMember}`
        : styles.messagesMessage;
    return (
        <li key={id} className={className}>
            <span
                className={styles.avatar}
                style={{ backgroundColor: color }}
            />
            <div className={styles.messageContent}>
                <div className={styles.username}>{username}</div>
                <div className={styles.text}>{data}</div>
            </div>
        </li>
    );
};

export default Message;
