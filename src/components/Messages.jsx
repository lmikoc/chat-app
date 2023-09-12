import React, { useEffect, useRef } from "react";
import styles from "../styles/Home.module.css";

const Messages = ({ messages, me }) => {
    const bottomRef = useRef(null);
    useEffect(() => {
        if (bottomRef && bottomRef.current) {
            bottomRef.current.scrollIntoView({ behavior: "smooth" });
        }
    });
    return (
        <ul className={styles.messagesList}>
            <div>Hello</div>
            <div ref={bottomRef}></div>
        </ul>
    );
};

export default Messages;
