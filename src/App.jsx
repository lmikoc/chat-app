import React, { useState } from "react";
import Messages from "./components/Messages";
import { randomColor, randomName } from "./utils/generateRandomNameAndColor";
import styles from "../src/styles/Home.module.css";
import Input from "./components/Input";
import Members from "./components/Members";

const App = () => {
    const [messages, setMessages] = useState([
        {
            id: "1",
            data: "This is a test message!",
            member: {
                id: "1",
                clientData: {
                    color: "blue",
                    username: "bluemoon"
                }
            }
        }
    ]);
    const [me, useMe] = useState({
        username: randomName(),
        color: randomColor()
    });
    const [members, setMembers] = useState([
        {
            id: "1",
            clientData: {
                color: "blue",
                username: "bluemoon"
            }
        }
    ]);
    const onSendMessage = (message) => {
        const newMessage = {
            data: message,
            member: {
                clientData: me
            }
        };
        setMessages([...messages, newMessage]);
    };
    return (
        <main className={styles.app}>
            <div className={styles.appContent}>
                <Members members={members} me={me} />
                <Messages messages={messages} me={me} />
                <Input onSendMessage={onSendMessage} />
            </div>
        </main>
    );
};

export default App;
