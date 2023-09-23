import React, { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import IsTyping from "typing-indicator";

let typingIndicator = null;

const Input = ({ onSendMessage, onChangeTypingState }) => {
    const [text, setText] = useState("");
    const onChange = (e) => {
        const text = e.target.value;
        typingIndicator.onChange(text);
        setText(text);
    };
    const onSubmit = (e) => {
        e.preventDefault();
        onSendMessage(text);
        setText("");
    };
    useEffect(() => {
        if (typingIndicator === null) {
            typingIndicator = new IsTyping();
            typingIndicator.listen(onChangeTypingState);
        }
    }, []);
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
