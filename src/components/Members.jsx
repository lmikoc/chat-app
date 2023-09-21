import React from "react";
import styles from "../styles/Home.module.css";
import Member from "./Member";

const Members = ({ members, me }) => {
    return (
        <div className={styles.members}>
            <div className={styles.membersCount}>
                {members.lenght} user{members.lenght === 1 ? "" : "s"} online
            </div>
            <div className={styles.membersList}>
                {members.map((m) => Member(m, m.id === me.id))}
            </div>
        </div>
    );
};

export default Members;
