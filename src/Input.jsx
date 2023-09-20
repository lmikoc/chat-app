import React, { useState } from "react";
import styles from "./styles/Home.module.css";

const Input = ({ onSendMessage }) => {
    const [text, setText] = useState("");
    const onChange = (e) => {
        const text = e.target.value;
        setText(text);
    };
    const onSubmit = (e) => {
        e.preventDefault();
        onSendMessage(text);
        setText("");
    };
    return (
        <div className={styles.input}>
            <form onSubmit={onSubmit}>
                <input
                    onChange={onChange}
                    value={text}
                    type="text"
                    placeholder="Enter your message and press ENTER"
                    autoFocus
                />
                <button type="submit">Send</button>
            </form>
        </div>
    );
};

export default Input;
