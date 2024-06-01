import { useState } from 'react'
import style from './Item.module.scss'
import { addExpense } from '../../store/expense/expenseSlice'
import { useDispatch, useSelector } from 'react-redux'
import Axios from 'axios'
import {api} from '../../API/api'
import {ExpenseState, Expense} from '../../utils/interface/expenseSlice'


const Item = () => {

  const dispatch = useDispatch();
  const [data,setData] = useState<Expense>({id: 0, name: "", price: 0})

  const expenseList: Expense[]= useSelector((state:ExpenseState) => state.expenses)
  const money = useSelector((state:ExpenseState)=> state.income)
  const balance = money - expenseList.reduce((sum,item)=> sum+(+item.price),0)

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({
      id: expenseList.length+1,
      name: e.target.name=="name" ? e.target.value : data.name,
      price: e.target.name=="price" ? +e.target.value : +data.price
    })
  }

  const submit = (e: React.MouseEvent<HTMLDivElement>)=> {
    if(!!data.name && !!data.price && +data.price<=balance) {
      e.preventDefault()
      fetchData()
      // reset()
    }
  }

  // const reset = ()=> {
  //   document.querySelector("#text").value=""
  //   document.querySelector("#price").value=""
  //   setData({})
  // }
// --------------------------Axios post---------------------------------
  async function fetchData() {
    try {
      Axios.post( 
        api.baseURL,
        data,
        api.config
      ).then((response)=> dispatch(addExpense({
        id: response.data.id,
        name: response.data.name,
        price: response.data.price
      })))
    }
    catch (error) {
      console.log(error)
    }
  }
  // -----------------------------------------------------------------






  return (
    <form  className={style.item}>
      <input onChange={onChange} type="text" name="name" id="text" placeholder='name'/>
      <div className={style.enough}>
        <input onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e)} type="text" name="price" id="price" placeholder='price'/><br/>
        {+data.price>balance && "you don`t have enough money"}
      </div>
      <input onClick={(e: React.MouseEvent<HTMLDivElement>) => submit(e)} type="button" value="SUBMIT"/>
    </form>
  )
}

export default Item
