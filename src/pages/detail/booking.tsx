
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import { RootState, useAppDispatch } from '../../redux/store';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { deleteBooking, fetchBookingDataById } from '../../redux/actions';
import { MinusCircleOutlined } from '@ant-design/icons';
import './booking.css'
interface ChildComponentProps {
    valueUd: any;
    onclick: (record:any) => void;
    onUpdate: (updateRoom: any) => void;
  }
const BookingDetail: React.FC<ChildComponentProps> = ({ valueUd,onclick ,onUpdate}) => {
    const dispatch = useAppDispatch();
    console.log(valueUd)
    function formatDate(dateString: string | number | Date) {
      const dateObj = new Date(dateString);
      const year = dateObj.getFullYear();
      const month = String(dateObj.getMonth() + 1).padStart(2, '0');
      const day = String(dateObj.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    }
    return (
        <>
            <form action=""
                style={{
                    zIndex: 99,
                    position: 'relative',
                    backgroundColor: '#fff',
                    display: 'flex',
                    flexDirection: 'column',
                    gap:'20px',
                    width: '650px',
                    alignItems: 'center',
                    height: '500px',
                    border: '2px solid black',
                    borderRadius: '8px',
                    marginLeft: '800px',
                    // marginTop: '-30px',
                    overflowY: 'scroll',
                }}>
                <div><p style={{ fontSize: '20px', fontWeight: '600' }}>Lịch sử đặt hàng</p></div>
                {valueUd?.booking.map((bk: any) => (
                    <div >
                        {bk?.detailBooking !=null && 
                        <div className='hover_history' 
                          style={{ 
                            width: '600px',
                            height:'200px',
                            border:'1px solid #dee2e6', 
                            borderRadius:'10px',
                            display: 'flex',
                            justifyContent:'center', 
                            alignItems: 'center', 
                            gap: '30px' 
                            }}>
                            <div>
                              <img src={`http://localhost:3000/${bk?.room?.img}`} alt="" width={150} height={150} />
                            </div>
                            <div>
                              <div>Phòng: {bk?.room?.roomNumber}</div>
                              <div>Tổng tiền: {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(bk?.detailBooking?.totalPrice)}</div>
                              <div>Ngày đến: {formatDate(bk?.detailBooking?.startDate)}</div>
                              <div>Ngày đi: {formatDate(bk?.detailBooking?.endDate)}</div>
                              <div>Dịch vụ sử dụng: {bk?.detailBooking?.service?.nameService}</div>
                              <div>Nhân viên phục vụ: {bk?.detailBooking?.staff?.staffName}</div>
                            </div>
                            {/* <Link to="" state={{ bookingId: bk?.bookingId }}><Button style={{ backgroundColor: '#E82626', color: '#fff' }} disabled>Xem</Button></Link> */}
                        </div>}
                    </div>
                ))
                }

            </form>
        </>
    )
}
export default BookingDetail
