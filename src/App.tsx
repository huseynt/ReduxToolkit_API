import style from './App.module.css'
import Item from './components/page/Item'
import ListItem from './components/page/ListItem'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  Routes,
  Route,
  useNavigate
} from 'react-router-dom'
import Axios from 'axios'
import { addExpense, resetState } from './store/expense/expenseSlice'
import {api} from './API/api'
import {ExpenseState, Expense} from './utils/interface/expenseSlice'



function App() {
  const expenseList = useSelector((state:ExpenseState) => state.expenses)
  console.log(expenseList)
  const cost = expenseList.reduce((sum:number,item:Expense)=> sum+(+item.price),0)
  const money = useSelector((state:ExpenseState)=> state.income)
  const balance = money - expenseList.reduce((sum:number,item:Expense)=> sum+(+item.price),0)

  const navigate = useNavigate()
  const handleAbout = () => {
    navigate('/about')
  }
  const handleHome = () => {
    navigate('/')
  }

  //--------------------------Axios get----------------------------------------
  const dispatch = useDispatch();
  async function getData() {
    dispatch(resetState())
    try {
      Axios.get( 
        api.baseURL,
        api.config
      )
      .then((item:any) => {item.data.content.map((item:any)=> dispatch(addExpense(item)) )})
    }
    catch (error) {
      console.log(error)
    }
  }
  useEffect(()=> {
    return () => {
      getData()
    }
  },[])


  return (
    <div className={style.section}>
      <div className={style.nav}>
        <div onClick={handleHome}>Home</div>
        <div onClick={handleAbout}>About</div>
        <div>Career</div>
      </div>

      <Routes>
        <Route path='/about' element={<Item/>}/>
        <Route path='*'/>
      </Routes>
    

    {/* <Item/> */}
    {expenseList.map((i:any) => { return <ListItem key={i.id} id={i.id} name={i.name} price={i.price}/>} )}

    <div className={style.money}>
      <div>Balance: {balance}$</div>
      <div>Total: {cost}$</div>
    </div>
    </div>
  )
}

export default App
