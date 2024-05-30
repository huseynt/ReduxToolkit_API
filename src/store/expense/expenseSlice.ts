import { createSlice } from "@reduxjs/toolkit";
import { combineReducers } from '@reduxjs/toolkit'
const rootReducer = combineReducers({})
export type RootState = ReturnType<typeof rootReducer>


const expenseSlice = createSlice({
    name: "expense",
    initialState: {
        income: 10000,
        expenses: []
    },
    reducers: {
        addExpense: (state, action)=> {
            state.expenses.push(action.payload)
        },
        changeIncome: (state, action)=> {
            state.income = 70000;
        },
        resetState: (state,action) => {
            state.income = 10000;
            state.expenses = [];
        }
    },
})
export default expenseSlice.reducer;
export const {addExpense,changeIncome, resetState} = expenseSlice.actions
