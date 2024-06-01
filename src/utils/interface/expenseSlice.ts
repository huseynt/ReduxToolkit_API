export interface ExpenseState {
  income: number;
  expenses: Expense[];
}
export interface Expense {
  id: string | number;
  name: string;
  price: number
}