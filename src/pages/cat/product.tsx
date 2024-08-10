import { useEffect, useState } from "react";
import { createBooking, fetchRoom } from "../../redux/actions";
// import Booking from "../detail/booking";
import { RootState, useAppDispatch } from "../../redux/store";
import { useSelector } from "react-redux";
import './product.css'
import { PlusSquareOutlined } from "@ant-design/icons";
const ProductCat: React.FC <{
  fromPrice:number|null
  toPrice:number|null
  sizeFilterS: string | null;
  sizeFilterM: string | null;
  sizeFilterL: string | null;
  sizeFilterXL: string | null;
}> = ({ sizeFilterL,sizeFilterXL,sizeFilterS, sizeFilterM,toPrice,fromPrice}) => {
  const [showBooking, setShowBooking] = useState(false);
  const handleShowBooking = () => {
    setShowBooking(!showBooking);
  };

  const dispatch = useAppDispatch();
  const roomData = useSelector((state: RootState) => state.room.data);
  const roomDataArray = roomData ? Object.values(roomData) : [];
  const fetchData = () => {
    dispatch(fetchRoom());
  };

  useEffect(() => {
    fetchData();
  }, []);
  const handleCreateBooking = async (values:
    {
      startDate: Date;
      endDate: Date;
      roomId: any;
    }) => {
    try {
      const { startDate, endDate, roomId } = values;
      await dispatch(createBooking({ startDate, endDate, roomId }));
      window.location.reload();
      // console.log(values)
    } catch (error) {
      // Handle error
    } finally {
    }
  };
  return (
    <>
      <div
        style={{
          display: 'flex',
          gap: '30px',
          flexWrap: 'wrap',
          width: '985px'
        }}
        onClick={handleShowBooking}
      >
        {roomDataArray
  .filter(room => room.roomType === 'CAT' )
  .filter(room => sizeFilterS === null || room.size === sizeFilterS)
  .filter(room => sizeFilterM === null || room.size === sizeFilterM)
  .filter(room => sizeFilterL === null || room.size === sizeFilterL)
  .filter(room => sizeFilterXL === null || room.size === sizeFilterXL)
  .filter(room => {
    if (fromPrice === null && toPrice === null) {
      return true; // Hiển thị tất cả các phòng
    } else if (fromPrice !== null && toPrice !== null) {
      return fromPrice <= room.price && room.price <= toPrice;
    } else {
      return true; // Hiển thị tất cả các phòng
    }
  })
  .map((room) => (
            <div
              key={room.roomId}
              className="hover_product"
              style={{
                width: '171.41px',
                height: '255px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                border:'1px solid #dee2e6'
              }}
            >
              <div style={{ width: '171.41px', height: '171px' }}>
                <img src={`http://localhost:3000/${room.img}`} alt="" style={{ width: '171.41px', height: '171px' }} />
              </div>
              <div style={{ width: '160px', display: 'flex', flexDirection: 'column', gap: '5px' }}>
                <div className="hover_priceproduct" style={{ fontSize: '13px',fontWeight:'700' }}>{room.roomNumber}</div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div style={{ fontSize: '10px', border: '1px solid red', color: 'red' }}>
                    Giảm {room.discount}%
                  </div>
                  <div style={{ fontSize: '10px' }}>Size: {room.size}</div>
                  <div style={{ fontSize: '10px' }}>{room.condition}</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '40px' }}>
                <div className="hover_priceproduct">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(room.price)}</div>
                  <PlusSquareOutlined
                    style={{ fontSize: '20px', color: 'black' }}
                    title="Thêm vào giỏ hàng"
                    onClick={() => handleCreateBooking({
                      startDate: new Date(),
                      endDate: new Date(),
                      roomId: room.roomId// Replace with the actual roomId
                    })}
                  />
                </div>
              </div>
            </div>
          ))}
      </div>
      {/* {showBooking && <Booking />} */}
    </>
  );
};

export default ProductCat;
