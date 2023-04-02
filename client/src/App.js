import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import {
  filterTickers,
  resetTickers,
  updateTickers,
} from "./redux/tickers-reducer/tickerReducers";
import "./App.css";
import MainPage from "./components/Tickers/Tickers";
import Header from "./components/Header/Header";

const socket = io("http://localhost:4000");
let arrData = [];

function App() {
  const [prevData, setPrevData] = useState(null);

  const dispatch = useDispatch();

  const tickers = useSelector((state) => state.tickers);

  useEffect(() => {
    socket.on("ticker", (data) => {
      setPrevData(data);
      return dispatch(updateTickers(data));
    });

    socket.emit("start");

    return () => {
      socket.off("ticker");
    };
  }, [dispatch]);

  const handleClickDel = (data) => {
    if (!arrData.includes(data.target.id)) {
      arrData.push(data.target.id);
    }
    return dispatch(filterTickers(arrData));
  };

  const handleClickReset = () => {
    arrData = [];
    return dispatch(resetTickers(prevData));
  };

  return (
    <div className="App">
      <div>
        {tickers && tickers.length > 0 && (
          <Header
            lastTimeChange={tickers[0].last_trade_time}
            intervalNumber={tickers[0].intervalNumber}
          />
        )}
      </div>
      <div className="TickersBlock">
        {tickers &&
          tickers.length > 0 &&
          tickers
            .filter((el) => {
              return !arrData.includes(el.ticker);
            })
            .map((el, index) => (
              <MainPage
                ticket={el}
                key={index}
                handleClickDel={handleClickDel}
              />
            ))}
      </div>
      <div className="button">
        <button className="ResetButton" onClick={handleClickReset}>
          Reset
        </button>
      </div>
    </div>
  );
}

export default App;
