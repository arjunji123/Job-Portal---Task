// src/app/store.js
import { configureStore } from "@reduxjs/toolkit";
import { jobApi } from "./services/jobApi"; // Adjust the path accordingly

export const store = configureStore({
  reducer: {
    [jobApi.reducerPath]: jobApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(jobApi.middleware),
});
