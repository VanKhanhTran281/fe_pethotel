import { useState } from "react";

import { useAppDispatch } from "../../../redux/store";
import { fetchComment } from "../../../redux/actions";
import TableCommentList from "./TableCommentList";

const CommentAdmin: React.FC = () => {
  const dispatch = useAppDispatch()
    const [showAddForm, setShowAddForm] = useState(false)
const handleAddForm = () => {
    setShowAddForm(!showAddForm)
}
const handleCreateService = () => {
    dispatch(fetchComment());
};
  return (
    <>
      <div style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',width:'100%'}}>
      <div style={{fontSize:'30px',fontWeight:'700'}}>PHẢN HỒI</div>
        <div style={{width:'1150px',height:'800px',marginTop:'40px'}}>
            <div> 
              <TableCommentList/>
            </div>
        </div>
        
    </div>
    </>
    
  )
}
export default CommentAdmin