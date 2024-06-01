import { createSlice } from "@reduxjs/toolkit";
import { combineReducers } from '@reduxjs/toolkit'
const rootReducer = combineReducers({})
export type RootState = ReturnType<typeof rootReducer>
import {ExpenseState} from '../../utils/interface/expenseSlice'

// interface ExpenseState {
//     income: number;
//     expenses: Expense[];
//   }
// interface Expense {
//     id: string;
//     name: string;
//     price: number
//   }


const expenseSlice = createSlice({
    name: "expense",
    initialState: <ExpenseState>{
        income: 10000,
        expenses:[]
    },
    reducers: {
        addExpense: (state, action)=> {
            state.expenses.push(action.payload)
        },
        changeIncome: (state, action)=> {
            state.income = action.payload;
        },
        resetState: (state) => {
            state.income = 10000;
            state.expenses = [];
        },
        deleteState: (state,action) => {
            state.expenses= state.expenses.filter((item) => item.id!==action.payload)
        }
    },
})
export default expenseSlice.reducer;
export const {addExpense,changeIncome, resetState, deleteState} = expenseSlice.actions