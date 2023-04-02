const initialState = {
  tickers: [
    {
      ticker: "",
      exchange: null,
      price: null,
      change: null,
      change_percent: null,
      dividend: null,
      yield: null,
      last_trade_time: null,
    },
  ],
};

export const tickersReducer = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_TICKERS":
      return action.payload;
    case "FILTER_TICKERS":
      return state.filter((el) => !action.payload.includes(el.ticker));
    case "RESET_TICKERS":
      return action.payload;
    default:
      return state;
  }
};

export const updateTickers = (tickers) => ({
  type: "UPDATE_TICKERS",
  payload: tickers,
});

export const filterTickers = (tickers) => ({
  type: "FILTER_TICKERS",
  payload: tickers,
});
export const resetTickers = (tickers) => ({
  type: "RESET_TICKERS",
  payload: tickers,
});
