import React from "react";
import styles from "../styles/Home.module.css";

const TypingIndicators = ({ messages }) => {
    const names = messages.map((m) => m.member.clientData.username);
    if (names.length === 0) {
        return <div className={styles.typingIndicator}>aaaaaaaaaaaaaaa</div>;
    } else if (names.length === 1) {
        return (
            <div className={styles.typingIndicator}>{names[0]} is typing</div>
        );
    } else {
        const typingString =
            names.slice(0, -1).join(", ") + " and " + names.slice(-1);
        return (
            <div className={styles.typingIndicator}>
                {typingString} are typing
            </div>
        );
    }
};

export default TypingIndicators;
