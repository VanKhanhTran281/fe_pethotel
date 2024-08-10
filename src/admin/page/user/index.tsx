import { Button } from "antd"
import { useState } from "react";

import { useAppDispatch } from "../../../redux/store";
import {  fetchUser } from "../../../redux/actions";
import TableUserList from "./TableUserList";
import CreateForm from "./CreateForm";

const UserAdmin: React.FC = () => {
  const dispatch = useAppDispatch()
    const [showAdd, setShowAdd] = useState(false)
    const [showAddForm, setShowAddForm] = useState(false)
//   const handleAdd = () => {
//     setShowAdd(!showAdd)
// }
const handleAddForm = () => {
    setShowAddForm(!showAddForm)
}
const handleCreateUser = () => {
    dispatch(fetchUser());
};
  return (
    <>
      <div style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',width:'100%'}}>
        <div style={{fontSize:'30px',fontWeight:'700'}}>QUẢN LÝ TÀI KHOẢN</div>
        <div style={{marginLeft:'1060px'}}>
          <Button style={{backgroundColor:'#2973E3',color:'#fff'}} onClick={handleAddForm}>Thêm mới</Button>
        </div>
        <div style={{width:'1150px',height:'800px',marginTop:'40px'}}>
            <div> 
              {showAddForm&& <CreateForm onClick={handleAddForm} onCreateUser={handleCreateUser}/>} 
              <TableUserList/>
   

            </div>
        </div>
        
    </div>
    </>
    
  )
}
export default UserAdmin