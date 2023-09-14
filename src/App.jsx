import React, { useState } from "react";
import Messages from "./components/Messages";
import { randomColor, randomName } from "./utils/generateRandomNameAndColor";
import styles from "../src/styles/Home.module.css";

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
    return (
        <main className={styles.app}>
            <div className={styles.appContent}>
                <Messages />
            </div>
        </main>
    );
};

export default App;
