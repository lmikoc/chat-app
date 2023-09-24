import React from "react";
import styles from "../styles/Home.module.css";

const Message = ({ member, data, id }, me) => {
    const { username, color } = member.clientData;
    const messageFromMe = member.id === me.id;
    const className = messageFromMe
        ? `${styles.messagesMessage} ${styles.currentMember}`
        : styles.messagesMessage;
    return (
        <li key={id} className={className}>
            <span
                className={styles.avatar}
                style={{ backgroundColor: color }}
            />
            <div className={styles.messageContent}>
                <div className={styles.username}>{username}</div>
                <div className={styles.text}>
                    {data.message} <br />
                    {data.files !== undefined && data.files.length > 0
                        ? data.files.map((fileObj, index) => {
                              const binaryString = atob(
                                  fileObj.file.split(",")[1]
                              );
                              const byteNumbers = new Array(
                                  binaryString.length
                              );
                              for (let i = 0; i < binaryString.length; i++) {
                                  byteNumbers[i] = binaryString.charCodeAt(i);
                              }
                              const fileType = fileObj.file
                                  .split(";")[0]
                                  .split(":")[1];
                              const byteArray = new Uint8Array(byteNumbers);
                              const blob = new Blob([byteArray], {
                                  type: fileType
                              });
                              return (
                                  <div key={index}>
                                      <a
                                          className={styles.vn}
                                          href={window.URL.createObjectURL(
                                              blob
                                          )}
                                          download={fileObj.fileName}
                                      >
                                          {fileObj.fileName}
                                      </a>
                                  </div>
                              );
                          })
                        : ""}
                </div>
            </div>
        </li>
    );
};

export default Message;
