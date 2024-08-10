import { Button } from "antd"
import { useState } from "react";
import { useAppDispatch } from "../../../redux/store";
import { fetchImage } from "../../../redux/actions";
import TableRoomList from "./TableRoomList";

const DetailAdmin: React.FC = () => {
  const dispatch = useAppDispatch()
    const [showAddForm, setShowAddForm] = useState(false)
//   const handleAdd = () => {
//     setShowAdd(!showAdd)
// }
const handleAddForm = () => {
    setShowAddForm(!showAddForm)
}
const handleCreateRoom = () => {
    dispatch(fetchImage());
};
  return (
    <>
      <div style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',width:'100%'}}>
      <div style={{fontSize:'30px',fontWeight:'700'}}>CHI TIẾT ĐẶT PHÒNG</div>
        {/* <div style={{marginLeft:'1060px'}}>
          <Button style={{backgroundColor:'#2973E3',color:'#fff'}} onClick={handleAddForm}>Add image</Button>
        </div> */}
        <div style={{width:'1150px',height:'800px',marginTop:'40px'}}>
            <div> 
              <TableRoomList/>
            </div>
        </div>
        
    </div>
    </>
    
  )
}
export default DetailAdmin