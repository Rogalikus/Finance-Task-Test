import React from "react";
import styles from "./Header.module.css";
import TimeChange from "./../TimeChange/TimeChange";
import IntervalTime from "./../IntervalTime/Interval";

const Header = ({ lastTimeChange, intervalNumber }) => {
  return (
    <div className={styles.Header}>
      <div className={styles.IntervalTime}>
        <IntervalTime intervalNumber={intervalNumber} />
      </div>
      <div>
        <TimeChange time={lastTimeChange} />{" "}
      </div>
    </div>
  );
};

export default Header;
