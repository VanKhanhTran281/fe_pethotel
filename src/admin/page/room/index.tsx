import { Button } from "antd"
import TableRoomList from "./TableRoomList"
import { useState } from "react";
import CreateForm from "./CreateForm";
import { useAppDispatch } from "../../../redux/store";
import { fetchRoom } from "../../../redux/actions";

const RoomAdmin: React.FC = () => {
  const dispatch = useAppDispatch()
    const [showAddForm, setShowAddForm] = useState(false)
//   const handleAdd = () => {
//     setShowAdd(!showAdd)
// }
const handleAddForm = () => {
    setShowAddForm(!showAddForm)
}
const handleCreateRoom = () => {
    dispatch(fetchRoom());
};
  return (
    <>
      <div style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',width:'100%'}}>
        <div style={{fontSize:'30px',fontWeight:'700'}}>QUẢN LÝ PHÒNG</div>
        <div style={{marginLeft:'1060px'}}>
          <Button style={{backgroundColor:'#2973E3',color:'#fff'}} onClick={handleAddForm}>Thêm mới</Button>
        </div>
        <div style={{width:'1150px',height:'800px',marginTop:'40px'}}>
            <div> 
              {showAddForm&& <CreateForm onClick={handleAddForm} onCreateRoom={handleCreateRoom}/>} 
              <TableRoomList/>
            </div>
        </div>
        
    </div>
    </>
    
  )
}
export default RoomAdmin