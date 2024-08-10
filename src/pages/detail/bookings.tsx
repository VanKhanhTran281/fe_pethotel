
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import { RootState, useAppDispatch } from '../../redux/store';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { deleteBooking, fetchBookingDataById } from '../../redux/actions';
import { MinusCircleOutlined } from '@ant-design/icons';
interface ChildComponentProps {
    valueUd: any;
    onclick: (record:any) => void;
    onUpdate: (updateRoom: any) => void;
  }
const Bookings: React.FC<ChildComponentProps> = ({ valueUd,onclick ,onUpdate}) => {
    const dispatch = useAppDispatch();
    // const [isLoading, setIsLoading] = useState<any | null>(null);
    // console.log(valueUd)
    // useEffect(() => {
    //     setIsLoading(valueUd);
    //   }, [valueUd]);
  const handleDeleteBooking = (bookingId: number) => {
    return () => {
        
      dispatch(deleteBooking(bookingId)).then(() => {
        // setIsLoading(valueUd);
        valueUd && onclick(valueUd)
        onUpdate(valueUd?.userId);
        window.location.reload();
      });
    }
  };

    return (
        <>
            <form action=""
                style={{
                    zIndex: 99,
                    position: 'relative',
                    backgroundColor: '#fff',
                    display: 'flex',
                    flexDirection: 'column',
                    width: '500px',
                    alignItems: 'center',
                    height: '500px',
                    border: '2px solid black',
                    borderRadius: '8px',
                    marginLeft: '950px',
                    marginTop: '-50px',
                    overflowY: 'scroll',
                }}>
                <div><p style={{ fontSize: '20px', fontWeight: '600' }}>Danh sách</p></div>
                {valueUd?.booking.map((bk: any) => (
                    <div>
                        {bk?.detailBooking ==null && <div style={{ width: '450px', display: 'flex', alignItems: 'center', gap: '20px' }}>
                            <img src={`http://localhost:3000/${bk?.room?.img}`} alt="" width={50} height={50} />
                            <div>Phòng: {bk?.room?.roomNumber}</div>
                            <div style={{width:'100px'}}>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(bk?.room?.price)}/ngày</div>
                            {/* state={{ bookingId: bk?.bookingId }} */}
                            
                            {/* {bk?.detailBooking !=null ? (
                                <Link to="" state={{ bookingId: bk?.bookingId }}><Button style={{ backgroundColor: '#E82626', color: '#fff' }} disabled>Đã đặt</Button></Link>
                              ):(
                                <>
                                  <Link to="/detail_product" state={{ bookingId: bk?.bookingId }}><Button style={{ backgroundColor: '#E82626', color: '#fff' }}>Đặt phòng</Button></Link>
                                  <MinusCircleOutlined style={{fontSize:'22px'}} onClick={handleDeleteBooking(bk?.bookingId)}/>
                                </>
                              )
                            } */}
                            
                                
                                <>
                                  <Link to="/detail_product" state={{ bookingId: bk?.bookingId }}><Button style={{ backgroundColor: '#E82626', color: '#fff' }}>Đặt phòng</Button></Link>
                                  <MinusCircleOutlined style={{fontSize:'22px'}} onClick={handleDeleteBooking(bk?.bookingId)}/>
                                </>
        
                            
                            
                            
                        </div>}
                    </div>
                ))
                }

            </form>
        </>
    )
}
export default Bookings
