import { Button } from "antd"
import { useState } from "react";

import { useAppDispatch } from "../../../redux/store";
import { fetchService } from "../../../redux/actions";
import TableServiceList from "./TableServiceList";
import CreateForm from "./CreateForm";

const ServiceAdmin: React.FC = () => {
  const dispatch = useAppDispatch()
    const [showAddForm, setShowAddForm] = useState(false)
const handleAddForm = () => {
    setShowAddForm(!showAddForm)
}
const handleCreateService = () => {
    dispatch(fetchService());
};
  return (
    <>
      <div style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',width:'100%'}}>
      <div style={{fontSize:'30px',fontWeight:'700'}}>QUẢN LÝ DỊCH VỤ</div>
        <div style={{marginLeft:'1060px'}}>
          <Button style={{backgroundColor:'#2973E3',color:'#fff'}} onClick={handleAddForm}>Thêm mới</Button>
        </div>
        <div style={{width:'1150px',height:'800px',marginTop:'40px'}}>
            <div> 
              {showAddForm&& <CreateForm onClick={handleAddForm} onCreateService={handleCreateService}/>} 
              <TableServiceList/>
   

            </div>
        </div>
        
    </div>
    </>
    
  )
}
export default ServiceAdmin