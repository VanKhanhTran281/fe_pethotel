import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { RootState, useAppDispatch } from "../../../redux/store";
import { useSelector } from "react-redux";
import { fetchStaffDataByStaffId } from "../../../redux/actions";

const DetailStaff: React.FC = () => {
  const { staffId } = useParams<{ staffId?: string }>();
  const parsedId = Number(staffId ?? '') || 1;
  const dispatch = useAppDispatch();
  const staffData = useSelector((state: RootState) => state.staff.data);
  const staffDataArray = staffData ? Object.values(staffData) : [];
  // console.log(staffDataArray)
  const fetchData = () => {
    dispatch(fetchStaffDataByStaffId(parsedId));
  };

  useEffect(() => {
    fetchData();
  }, []);
  function formatDate(dateString: string | number | Date) {
    const dateObj = new Date(dateString);
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const day = String(dateObj.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  return (

    <>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
        <p style={{fontSize:'26px',textAlign:'center',fontWeight:'700'}}>DANH SÁCH ĐƠN</p>
        <div style={{ display: 'flex', width: '900px', gap: '20px', flexWrap: 'wrap',marginTop:'20px' }}>
          {staffDataArray?.[5] && staffDataArray?.[5].length > 0 ? (
            staffDataArray?.[5] && staffDataArray?.[5].map((st: any) => (
              <div style={{ width: '400px', display: "flex", flexDirection: 'column', backgroundColor: '#d9d9d9', justifyContent: 'center', alignItems: 'center', height: '200px', borderRadius: '20px' }}>
                <div style={{ fontSize: '20px', fontWeight: '600' }}>Đơn số : {st?.detailId}</div>
                <div style={{ marginTop: '10px' }}>Phòng:  {st?.roomNumber}</div>
                <div>Dịch vụ kèm theo: {st?.service?.nameService}</div>
                <div>Mô tả: {st?.service?.describe}</div>
                <div>Từ ngày: {formatDate(st?.startDate)}</div>
                <div>Đến ngày: {formatDate(st?.endDate)}</div>
              </div>
            ))
          ) : (
            <div style={{ fontSize: '20px', fontWeight: '600',marginLeft:'310px' }}>Không có đơn được phân công</div>
          )}
        </div>
      </div>
    </>
  )
}
export default DetailStaff