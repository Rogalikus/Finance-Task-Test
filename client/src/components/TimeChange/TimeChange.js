import React from "react";
import styles from "./TimeChange.module.css";

const TimeChange = ({ time }) => {
  return (
    <div className={styles.lastTradeTime}>
      <div className={styles.date}>
        Data: {new Date(time).toLocaleDateString()}
      </div>
      <div className={styles.time}>
        Time: {new Date(time).toLocaleTimeString()}
      </div>
    </div>
  );
};

export default TimeChange;
