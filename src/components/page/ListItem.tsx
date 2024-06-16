import style from './ListItem.module.scss'
import Axios from 'axios'
import {api} from '../../API/api'
import { useDispatch } from "react-redux";
import { deleteState } from "../../store/expense/expenseSlice";


interface iList {
  key: string;
  id: string;
  name: string;
  price: number
}

const ListItem = (props:iList) => {
  const dispatch = useDispatch();
  const {name, price, id} = props

  const close = (e: React.MouseEvent<HTMLDivElement>) => {
    const key = e.currentTarget.id
    deleteData(key)
  }

  // ------------- axios delete ----------------------------
  async function deleteData(id:string) {
    try {
      Axios.delete(
        `${api.baseURL}/${id}`,
        api.config
        ).then(()=> dispatch(deleteState(id)))
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
        <div className={style.close} onClick={(e: React.MouseEvent<HTMLDivElement>) => close(e)} id={id}>X</div>
      </div>
    </div>
  )
}

export default ListItem
