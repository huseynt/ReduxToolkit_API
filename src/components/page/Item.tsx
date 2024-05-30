import { useState } from 'react'
import style from './Item.module.scss'
import { addExpense } from '../../store/expense/expenseSlice'
import { useDispatch, useSelector } from 'react-redux'
import Axios from 'axios'
import {api} from '../../API/api'



const Item = (props) => {
  const {reload} = props

  const dispatch = useDispatch();
  const [data,setData] = useState<object>({})

  const expenseList = useSelector((state:any) => state.expenses)
  const money = useSelector((state:any)=> state.income)
  const balance = money - expenseList.reduce((sum:any,item:any)=> sum+(+item.price),0)

  const onChange = (e:any) => {
    setData({
      id: expenseList.length+1,
      name: e.target.name=="name" ? e.target.value : data.name,
      price: e.target.name=="price" ? +e.target.value : +data.price
    })
  }

  const submit = (e:any)=> {
    if(!!data.name && !!data.price && +data.price<=balance) {
      e.preventDefault()
      dispatch(addExpense( data ))
      fetchData()
      reset()
    }
  }

  const reset = ()=> {
    document.querySelector("#text").value=""
    document.querySelector("#price").value=""
    setData({})
  }
// --------------------------Axios post---------------------------------
  async function fetchData() {
    try {
      Axios.post( 
        api.baseURL,
        data,
        api.config
      )
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
        <input onChange={onChange} type="text" name="price" id="price" placeholder='price'/><br/>
        {+data.price>balance && "you don`t have enough money"}
      </div>
      <input onClick={submit} type="button" value="SUBMIT"/>
    </form>
  )
}

export default Item
