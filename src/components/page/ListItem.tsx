import style from './ListItem.module.scss'
import { useSelector } from 'react-redux'
import Axios from 'axios'
import {api} from '../../API/api'

const ListItem = (props:any) => {
  const {name, price, id, reload} = props
  const expenseList = useSelector((state:any) => state.expenses)

  const close = (e:any) => {
    const key = e.target.id
    deleteData(key)
  }

  // ------------- axios delete ----------------------------
  async function deleteData(id:any) {
    try {
      Axios.delete(
        `${api.baseURL}/${id}`,
        api.config
        ).then(()=> reload())
    } 
    catch (error) {
      console.log(error)
    }
  }


  return (
    <div className={style.list}>

      <div className={style.name}>Name: {name}</div>

      <div className={style.price}>
        <div>Price: {price}$</div>
        
        <div className={style.close} onClick={close} id={id}>X</div>
      </div>

    </div>
  )
}

export default ListItem
