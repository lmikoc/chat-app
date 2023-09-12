import React, { useEffect, useRef } from "react";

const Messages = ({ messages, me }) => {
    const bottomRef = useRef(null);
    useEffect(() => {
        if (bottomRef && bottomRef.current) {
            bottomRef.current.scrollIntoView({ behavior: "smooth" });
        }
    });
    return (
        <ul>
            {messages.map()}
            <div ref={bottomRef}></div>
        </ul>
    );
};

export default Messages;
