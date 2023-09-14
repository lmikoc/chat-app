import React, { useEffect, useRef } from "react";
import styles from "../styles/Home.module.css";
import Message from "./Message";

const Messages = ({ messages, me }) => {
    const bottomRef = useRef(null);
    useEffect(() => {
        if (bottomRef && bottomRef.current) {
            bottomRef.current.scrollIntoView({ behavior: "smooth" });
        }
    });
    return (
        <ul className={styles.messagesList}>
            {messages.map((m) => Message(m, me))}
            <div ref={bottomRef}></div>
        </ul>
    );
};

export default Messages;
