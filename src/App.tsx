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




function App() {
  const expenseList = useSelector((state:any) => state.expenses)
  const cost = expenseList.reduce((sum:any,item:any)=> sum+(+item.price),0)
  const money = useSelector((state:any)=> state.income)
  const balance = money - expenseList.reduce((sum:any,item:any)=> sum+(+item.price),0)

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
    try {
      Axios.get( 
        api.baseURL,
        api.config
      )
      .then(dispatch(resetState()))
      .then((item:any) => {item.data.content.map((item:any)=> dispatch(addExpense( item )) )})
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
        <Route path='/about' element={<Item reload={getData}/>}/>
        <Route path='*'/>
      </Routes>
    

    {/* <Item/> */}
    {expenseList.map((i:any) => { return <ListItem key={i.id} id={i.id} name={i.name} price={i.price} reload={getData}/>} )}

    <div className={style.money}>
      <div>Balance: {balance}$</div>
      <div>Total: {cost}$</div>
    </div>
    </div>
  )
}

export default App
