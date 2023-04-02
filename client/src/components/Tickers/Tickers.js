import React, { useEffect, useState } from "react";
import styles from "./Tickers.module.css";
import { ArrCompaniesInfo } from "./ArrCompaniesInfo";

const MainPage = ({ ticket, handleClickDel }) => {
  const [prevChange, setPrevChange] = useState();
  const [prevPercent, setPrevPercent] = useState();
  const [upChange, setUpChange] = useState(0);
  const [upPercent, setUpPercent] = useState(0);

  useEffect(() => {
    if (
      prevChange !== undefined &&
      Math.sign(ticket.change - prevChange) === 1
    ) {
      setUpChange(1);
    } else if (
      prevChange !== undefined &&
      Math.sign(ticket.change - prevChange) === -1
    ) {
      setUpChange(0);
    }
    setPrevChange(ticket.change);
  }, [ticket.change]);

  useEffect(() => {
    if (
      prevPercent !== undefined &&
      Math.sign(ticket.change_percent - prevPercent) === 1
    ) {
      setUpPercent(1);
    } else if (
      prevPercent !== undefined &&
      Math.sign(ticket.change_percent - prevPercent) === -1
    ) {
      setUpPercent(0);
    }
    setPrevPercent(ticket.change_percent);
  }, [ticket.change_percent]);

  return (
    <div className={styles.Ticker}>
      <div className={styles.NamesAndLogos}>
        <div
          className={
            styles[
              ArrCompaniesInfo.find((e) => {
                return e.shortName === ticket.ticker;
              })?.styleLogo
            ]
          }
        >
          {ticket.ticker}
        </div>
        <div className={styles.NamesTickers}>
          {
            ArrCompaniesInfo.find((e) => {
              return e.shortName === ticket.ticker;
            })?.fullName
          }
        </div>
      </div>
      <div className={styles.PriceTicker}>{ticket.price}</div>
      <div
        className={upChange ? styles.changeTickerGreen : styles.changeTickerRed}
      >
        {upChange ? `+${ticket.change}` : `-${ticket.change}`}
      </div>
      <div
        className={
          upPercent ? styles.changeTickerGreen : styles.changeTickerRed
        }
      >
        {upPercent
          ? `🡅${ticket.change_percent}%`
          : ` 🡇${ticket.change_percent}%`}
      </div>
      <div className={styles.dividend}>{ticket.dividend}</div>
      <div className={styles.yield}>{ticket.yield}</div>
      <button
        id={ticket.ticker}
        onClick={handleClickDel}
        className={`${styles.btn} ${styles["btn-delete"]}`}
      >
        <span
          id={ticket.ticker}
          className={`${styles.mdi} ${styles[`mdi-delete`]} {'mdi-24px}`}
        ></span>
        <span
          id={ticket.ticker}
          className={`${styles.mdi} ${styles["mdi-delete-empty"]} {'mdi-24px'}`}
        ></span>
        <span id={ticket.ticker}>Delete</span>
      </button>
    </div>
  );
};
export default MainPage;
