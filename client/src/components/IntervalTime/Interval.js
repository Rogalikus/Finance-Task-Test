import React, { useState } from "react";
import { io } from "socket.io-client";
import styles from "./IntervalTime.module.css";
import Button from "@mui/material-next/Button";
import UpdateIcon from "@mui/icons-material/Update";

const socket = io("http://localhost:4000");

const IntervalTime = ({ intervalNumber }) => {
  const [newInterval, setNewInterval] = useState(intervalNumber);

  const handleChange = (e) => {
    setNewInterval(Number(e.target.value * 1000));
  };

  const handleSubmit = (e) => {
    socket.emit("start");
    socket.emit("changeInterval", newInterval);
    socket.off("changeInterval");
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <label className={styles.label}>
        Fetch Interval (sec):
        <input
          className={styles.input}
          value={newInterval / 1000}
          onChange={handleChange}
        />
      </label>
      <Button
        endIcon={<UpdateIcon />}
        variant="outlined"
        color="secondary"
        type="submit"
        sx={{
          fontFamily: ["Roboto", "sans-serif"].join(","),
          fontSize: "15px",
          fontWeight: 550,
          letterSpacing: "2px",
        }}
      >
        Update
      </Button>
    </form>
  );
};

export default IntervalTime;
