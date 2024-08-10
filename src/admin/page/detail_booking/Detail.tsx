import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { RootState, useAppDispatch } from "../../../redux/store";
import { useSelector } from "react-redux";
import { fetchDetailDataByDetailId, fetchStaff, updateDetail } from "../../../redux/actions";
import { Button, Select } from "antd";
import { PlayCircleFilled } from "@ant-design/icons";

const Details: React.FC = () => {
  const { Option } = Select;
  const { detailId } = useParams<{ detailId?: string }>();
  const parsedId = Number(detailId ?? '') || 1;
  const dispatch = useAppDispatch();
  const detailData = useSelector((state: RootState) => state.detail.data);
  const detailDataArray = detailData ? Object.values(detailData) : [];
  console.log(detailDataArray)
  const staffData = useSelector((state: RootState) => state.staff.data);
  const staffDataArray = staffData ? Object.values(staffData) : [];
  const fetchData = () => {
    dispatch(fetchDetailDataByDetailId(parsedId));
    dispatch(fetchStaff())
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
  const [staffId, setStaffId] = useState<number>();
  const handleChangeStaffId = (value: number) => {
    setStaffId(value)
  };
  const handleSubmit = async () => {
    try {
      await dispatch(updateDetail({
        detailId: detailDataArray[0],
        roomNumber: detailDataArray[1],
        roomType: detailDataArray[2],
        totalPrice: detailDataArray[3],
        startDate: detailDataArray[4],
        endDate: detailDataArray[5],
        staff: {
          staffId: staffId,
          staffName: '',
          sex: '',
          address: '',
          phoneNumber: ''
        }
      }));
      window.location.reload();
      console.log('Tạo mới detail thành công');
    } catch (error) {
      console.error('Tạo mới detail thất bại:', error);
    }
  };
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
      <div style={{ marginTop: '40px', width: '500px', display: 'flex', gap: '5px' }}>
        <div >Tùy chọn nhân viên: </div>
        {staffDataArray.length > 0 ? (
          <Select style={{ width: '150px' }} onChange={handleChangeStaffId}>
            {staffDataArray.map((staff, index) => (
              <Option key={index} value={staff?.staffId} >
                {staff?.staffName}
              </Option>
            ))}
          </Select>
        ) : (
          <div>Không có dữ liệu nhân viên</div>
        )}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 'auto' }}>
          <Button onClick={handleSubmit}>Thêm</Button>
        </div>

      </div>
      {detailDataArray?.length > 0 && detailDataArray[1]?.length > 0 &&(
        <div style={{ width: '1000px', marginTop: '40px', height: '400px', display: 'flex', flexDirection: 'column', alignItems: "center", border: '1px solid black', borderRadius: '20px' }}>
          <h1>Đơn số {detailDataArray[0]}</h1>
          <div style={{ height: '300px',marginTop:'20px', width: '800px', display: "flex" }}>
            <div style={{ width: '400px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
                <PlayCircleFilled />
                <div>Mã khách hàng: {detailDataArray[8]?.user?.userId}</div>
              </div>
              <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
                <PlayCircleFilled />
                <div>Tên khách hàng: {detailDataArray[8]?.user?.userName}</div>
              </div>
              <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
                <PlayCircleFilled />
                <div>Phòng đặt: {detailDataArray[1]}</div>
              </div>
              <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
                <PlayCircleFilled />
                <div>Kiểu phòng: {detailDataArray[2]}</div>
              </div>
              <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
                <PlayCircleFilled />
                <div>Tổng giá đơn: {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(detailDataArray[3])}</div>
              </div>
              <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
                <PlayCircleFilled />
                <div>Ngày đặt: {formatDate(detailDataArray[4])}</div>
              </div>
              <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
                <PlayCircleFilled />
                <div>Ngày kết thúc: {formatDate(detailDataArray[5])}</div>
              </div>
            </div>
            <div style={{ width: '400px', display: 'flex', flexDirection: "column", gap: '15px' }}>
              <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
                <PlayCircleFilled />
                <div>Nhân viên được phân công: {detailDataArray[6]?.staffName}</div>
              </div>
              <div style={{ marginLeft: '30px', display: 'flex', flexDirection: "column", gap: '15px' }}>
                <div>Số điện thoại: {detailDataArray[6]?.phoneNumber}</div>
                <div>Địa chỉ: {detailDataArray[6]?.address}</div>
              </div>
              <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
                <PlayCircleFilled />
                <div>Dịch vụ đăng ký thêm: {detailDataArray[7]?.nameService}</div>
              </div>
              <div style={{ marginLeft: '30px', display: 'flex', flexDirection: "column", gap: '15px' }}>
                <div>Giá dịch vụ: {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(detailDataArray[7]?.price)}</div>
                <div>Mô tả: {detailDataArray[7]?.describe}</div>
              </div>
            </div>
          </div>
        </div>

      )}
    </div>
  )
}
export default Details