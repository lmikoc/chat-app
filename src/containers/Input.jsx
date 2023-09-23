import React, { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import IsTyping from "typing-indicator";

let typingIndicator = null;

const Input = ({ onSendMessage, onChangeTypingState }) => {
    const [text, setText] = useState("");
    const [files, setFiles] = useState([]);
    const onChange = (e) => {
        const text = e.target.value;
        typingIndicator.onChange(text);
        setText(text);
    };
    const onChangeFile = (e) => {
        const files = e.target.files;
        console.log(files);
        setFiles(files);
    };
    const onSubmit = (e) => {
        e.preventDefault();
        onSendMessage(text, files);
        document.getElementById("files").value = null;
        setText("");
        setFiles([]);
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
                <input
                    type="file"
                    id="files"
                    onChange={onChangeFile}
                    multiple
                />
                <button type="submit">Send</button>
            </form>
        </div>
    );
};

export default Input;
