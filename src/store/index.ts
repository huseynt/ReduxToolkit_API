import { configureStore } from "@reduxjs/toolkit";
import expenseSlice from "./expense/expenseSlice";
import { useDispatch } from "react-redux";


export const store = configureStore({
    reducer: expenseSlice,
});

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()