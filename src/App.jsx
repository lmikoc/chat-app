import React, { useEffect, useRef, useState } from "react";
import Messages from "./components/Messages";
import { randomColor, randomName } from "./utils/generateRandomNameAndColor";
import styles from "../src/styles/Home.module.css";
import Input from "./containers/Input";
import Members from "./components/Members";
import TypingIndicators from "./components/TypingIndicators";
import toBase64 from "./utils/FileToBase64";

let drone = null;

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
        const room = drone.subscribe("observable-room");
        room.on("message", (message) => {
            const { data, member } = message;
            if (typeof data === "object" && typeof data.typing === "boolean") {
                const index = membersRef.current.findIndex(
                    (m) => m.id === member.id
                );
                membersRef.current[index].typing = data.typing;
                const newMembers = [...membersRef.current];
                setMembers(newMembers);
            } else {
                setMessages([...messagesRef.current, message]);
            }
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
    };
    useEffect(() => {
        if (drone === null) {
            connectToScaleDrone();
        }
    }, []);
    const onSendMessage = async (message, files) => {
        if (message || files.length > 0) {
            const filesBase64 = [];
            if (files.length > 0) {
                for (const file of files) {
                    filesBase64.push({
                        file: await toBase64(file),
                        fileName: file.name
                    });
                }
            }
            console.log(filesBase64);
            drone.publish({
                room: "observable-room",
                message: { message: message, files: filesBase64 }
            });
        }
    };
    const onChangeTypingState = (isTyping) => {
        drone.publish({
            room: "observable-room",
            message: { typing: isTyping }
        });
    };
    return (
        <main className={styles.app}>
            <div className={styles.appContent}>
                <Members members={members} me={me} />
                <Messages messages={messages} me={me} />
                <TypingIndicators
                    members={members.filter((m) => m.typing && m.id !== me.id)}
                />
                <Input
                    onSendMessage={onSendMessage}
                    onChangeTypingState={onChangeTypingState}
                />
            </div>
        </main>
    );
};

export default App;
