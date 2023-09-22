import React, { useEffect, useRef, useState } from "react";
import Messages from "./components/Messages";
import { randomColor, randomName } from "./utils/generateRandomNameAndColor";
import styles from "../src/styles/Home.module.css";
import Input from "./containers/Input";
import Members from "./components/Members";

let drone = null;
let room = null;

const App = () => {
    const [messages, setMessages] = useState([]);
    const [me, setMe] = useState({
        username: randomName(),
        color: randomColor()
    });
    const [members, setMembers] = useState([]);
    const messagesRef = useRef();
    messagesRef.current = messages;
    const membersRef = useRef();
    membersRef.current = members;
    const meRef = useRef();
    meRef.current = me;
    const connectToScaleDrone = () => {
        drone = new window.Scaledrone(process.env.REACT_APP_CHANNELID, {
            data: meRef.current
        });
        drone.on("open", (error) => {
            if (error) {
                return console.error(error);
            }
            meRef.current.id = drone.clientId;
            setMe(meRef.current);
        });
    };
    useEffect(() => {
        if (drone === null) {
            connectToScaleDrone();
            room = drone.subscribe("observable-room");
            room.on("message", (message) => {
                const { data, member } = message;
                setMessages([...messagesRef.current, message]);
            });
            room.on("members", (members) => {
                setMembers(members);
            });
            room.on("member_join", (member) => {
                setMembers([...membersRef.current, member]);
            });
            room.on("member_leave", ({ id }) => {
                const index = membersRef.current.findIndex((m) => m.id === id);
                const newMembers = [...membersRef.current];
                newMembers.splice(index, 1);
                setMembers(newMembers);
            });
        }
    }, []);
    const onSendMessage = (message) => {
        drone.publish({
            room: "observable-room",
            message
        });
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
