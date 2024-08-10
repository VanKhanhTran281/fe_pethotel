import { Button } from "antd"
import { useState } from "react";

import { useAppDispatch } from "../../../redux/store";
import { fetchStaff } from "../../../redux/actions";

import TableStaffList from "./TableStaffList";
import CreateForm from "./CreateForm";

const StaffAdmin: React.FC = () => {
  const dispatch = useAppDispatch()
    const [showAddForm, setShowAddForm] = useState(false)
const handleAddForm = () => {
    setShowAddForm(!showAddForm)
}
const handleCreateStaff = () => {
    dispatch(fetchStaff());
};
  return (
    <>
      <div style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',width:'100%'}}>
        <div style={{fontSize:'30px',fontWeight:'700'}}>QUẢN LÝ NHÂN VIÊN</div>
        <div style={{marginLeft:'1060px'}}>
          <Button style={{backgroundColor:'#2973E3',color:'#fff'}} onClick={handleAddForm}>Thêm mới</Button>
        </div>
        <div style={{width:'1150px',height:'800px',marginTop:'40px'}}>
        {/* ,border:'1px solid black' */}
            <div> 
              {showAddForm&& <CreateForm onClick={handleAddForm} onCreateStaff={handleCreateStaff}/>} 
              <TableStaffList/>
   

            </div>
        </div>
        
    </div>
    </>
    
  )
}
export default StaffAdmin