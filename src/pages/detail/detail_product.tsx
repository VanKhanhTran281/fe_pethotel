import { useLocation, useNavigate } from 'react-router-dom'
import './detail_product.css'
import { RootState, useAppDispatch } from '../../redux/store';
import { useSelector } from 'react-redux';
import { createDetail, fetchBookingDataById, fetchService, fetchStaff } from '../../redux/actions';
import { useEffect, useState } from 'react';
import { DatePicker, Select } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
const { Option } = Select;
const DetailProduct: React.FC = () => {
    const { state } = useLocation();
    const { bookingId } = state || {};
    // console.log(bookingId);
    const dispatch = useAppDispatch();
    const bookingData = useSelector((state: RootState) => state.booking.data);
    const bookingDataArray = bookingData ? Object.values(bookingData) : [];
    //  console.log("tes1-------",bookingData)
    const serviceData = useSelector((state: RootState) => state.service.data);
    const serviceDataArray = serviceData ? Object.values(serviceData) : [];
    // console.log(serviceDataArray)
    const fetchData = () => {

        dispatch(fetchBookingDataById(bookingId));
        dispatch(fetchStaff());
        dispatch(fetchService());
    };
    useEffect(() => {
        async function fetch() {
            await fetchData()

        }
        fetch();
    }, [bookingId, dispatch]);
    // useEffect (async () => {

    //     fetchData();
    //     console.log("tes1-------",bookingData)
    // }, [bookingId,dispatch]);


    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [serviceId, setServiceId] = useState<number>();
    const [servicePrice, setServicePrice] = useState<number>(0);
    console.log(servicePrice)

    const handleChangeServiceId = (value: number) => {
        // Tìm service tương ứng với serviceId được chọn
        const selectedService = serviceDataArray.find(service => service.serviceId === value);

        if (selectedService) {
            setServiceId(selectedService.serviceId);
            setServicePrice(selectedService.price);
        } else {
            setServiceId(0);
            setServicePrice(0);
        }
    };
    const calculateTotalPrice = () => {
        if (startDate && endDate) {
            const numDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
            const bookingPrice = (numDays + 1) * (bookingDataArray?.[4]?.price || 0);
            const discount = (bookingDataArray?.[4]?.price || 0) * (bookingDataArray?.[4]?.discount || 0) / 100;
            let totalPrice = bookingPrice - discount;

            if (typeof servicePrice === 'number') {
                totalPrice += servicePrice;
            } else {
                totalPrice += parseFloat(servicePrice || '0');
            }

            return totalPrice;
        }
        return 0;
    };
    const totalPrice = calculateTotalPrice();
    // console.log(totalPrice)
    const navigate = useNavigate();
    const handleSubmit = async () => {
        if (!startDate || !endDate) {
            alert('Vui lòng chọn ngày gửi và ngày kết thúc');
            return;
        }
        try {
            const response = await dispatch(createDetail({
                roomNumber: bookingData?.room.roomNumber,
                roomType: bookingData?.room.roomType,
                totalPrice: totalPrice,
                startDate: startDate,
                endDate: endDate,
                bookingId: bookingData?.bookingId,
                // staffId: 0,
                serviceId: serviceId
            }));

            if (response.payload) {
                alert('Đặt phòng thành công!');
                navigate('/');
                window.location.reload();
            } else {
                alert('Ngày bạn chọn đã được đặt!');
            }
        } catch (error: any) {
            console.error('Tạo mới detail thất bại:', error);
            alert('Tạo mới detail thất bại');
        }
    };
    return (
        <div style={{ display: 'flex', justifyContent: 'center', backgroundColor: '#f3f3f3' }}>
            <div style={{ width: '1200px', height: '600px', marginTop: '50px', backgroundColor: '#fff' }}>
                {bookingDataArray.length > 4 && (
                    <section style={{ display: 'flex' }} >
                        <section style={{ width: '450px' }}>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <div className='details-img1'>
                                    <div className='details-img1-1'>
                                        <div className='details-img1-1-1'></div>
                                        <div className='details-img1-1-2'>
                                            <picture>
                                                <img alt="" className='details-img1-1-2-1' src={`http://localhost:3000/${bookingDataArray?.[4]?.img}`} />
                                                {/* <img alt="" className='details-img1-1-2-1' src='https://www.petmart.vn/wp-content/uploads/2023/09/chuong-khach-san-l.jpg' /> */}
                                            </picture>
                                        </div>
                                    </div>
                                </div>
                                <div className='details-img2'>
                                    <div className='details-img2-1'>
                                        <div className='details-img2-1-1'>
                                            <div className='details-img2-1-1-1'>
                                                <picture>
                                                    <img alt="" className='details-img1-1-2-1' src={`http://localhost:3000/${bookingDataArray?.[4]?.img}`} />
                                                    {/* <img className='details-img2-1-1-1-1' src='https://www.petmart.vn/wp-content/uploads/2023/09/chuong-khach-san-l.jpg' alt="" /> */}
                                                </picture>
                                            </div>
                                        </div>
                                    </div>
                                    <button className='details-img2-2'>
                                        <svg enableBackground="new 0 0 13 20" viewBox="0 0 13 20" x="0" y="0" className="details-img2-2-1">
                                            <polygon points="4.2 10 12.1 2.1 10 -.1 1 8.9 -.1 10 1 11 10 20 12.1 17.9"></polygon>
                                        </svg>
                                    </button>
                                    <button className='details-img2-3'>
                                        <svg enableBackground="new 0 0 13 21" viewBox="0 0 13 21" x="0" y="0" className="details-img2-3-1">
                                            <polygon points="11.1 9.9 2.1 .9 -.1 3.1 7.9 11 -.1 18.9 2.1 21 11.1 12 12.1 11"></polygon>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </section>
                        <section>
                            <div style={{ display: 'flex', flexDirection: 'column', width: 'auto', padding: '1.25rem 2.1875rem 0 1.25rem' }}>
                                <div style={{ fontSize: '30px', fontWeight: '700' }}>
                                    [{bookingDataArray?.[4]?.roomNumber}]
                                    {bookingDataArray?.[4]?.describe}
                                </div>
                                <div style={{ display: 'flex', marginTop: '0.625rem' }}>
                                    <button style={{ display: 'flex', padding: '0 15px', border: '0', borderLeft: '1px solid #00000024', alignItems: 'center', backgroundColor: 'initial' }}>
                                        <div style={{ fontSize: '0.875rem', color: '#767676', padding: '4px 0', textTransform: 'capitalize', marginRight: '5px' }}>Kiểu</div>


                                        {bookingDataArray?.[4]?.roomType}

                                    </button>
                                    <button style={{ display: 'flex', padding: '0 15px', border: '0', borderLeft: '1px solid #00000024', alignItems: 'center', backgroundColor: 'initial' }}>
                                        <div style={{ fontSize: '0.875rem', color: '#767676', padding: '4px 0', textTransform: 'capitalize', marginRight: '5px' }}>Kích thước</div>
                                        <div style={{ fontSize: '1rem', color: 'black', marginRight: '5px', paddingBottom: '1px' }}>
                                            {bookingDataArray?.[4]?.size}
                                        </div>
                                    </button>
                                    <button style={{ display: 'flex', padding: '0 15px', border: '0', borderLeft: '1px solid #00000024', alignItems: 'center', backgroundColor: 'initial' }}>
                                        <div style={{ fontSize: '0.875rem', color: '#767676', padding: '4px 0', textTransform: 'capitalize', marginRight: '5px' }}>Giảm</div>
                                        <div style={{ fontSize: '1rem', color: 'black', marginRight: '5px', paddingBottom: '1px' }}>
                                            {bookingDataArray?.[4]?.discount}%
                                        </div>
                                    </button>
                                </div>
                                <div style={{ marginTop: '20px' }}>
                                    <div>
                                        <div style={{ padding: '15px 20px', backgroundColor: 'rgb(250, 250, 250)' }}>
                                            <div style={{ width: '625px' }}>
                                                <div style={{ fontSize: '1.875rem', fontWeight: '500', color: '#ee4d2d' }}>
                                                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(
                                                        bookingDataArray?.[4]?.price
                                                    )}/ngày

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                        <div style={{ width: '130px' }}>Ngày gửi:</div>
                                        <DatePicker
                                            minDate={dayjs()}
                                            onChange={(date) => setStartDate(date?.toDate())}
                                        />
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                        <div style={{ width: '130px' }}>Ngày kết thúc:</div>
                                        <DatePicker
                                            minDate={dayjs()}
                                            onChange={(date) => setEndDate(date?.toDate())}
                                        />
                                    </div>
                                </div>
                                {/* <div style={{ marginTop: '20px', display: 'flex', gap: '5px' }}>
                                    <div style={{ width: '130px' }}>Chọn nhân viên</div>
                                    {staffDataArray.length > 0 ? (
                                        <Select style={{ width: '150px' }} onChange={handleChangeStaffId}>
                                            {staffDataArray.map((staff, index) => (
                                                <Option key={staff.staffId} value={staff.staffId} >
                                                    {staff.staffName}
                                                </Option>
                                            ))}
                                        </Select>
                                    ) : (
                                        <div>Không có dữ liệu nhân viên</div>
                                    )}
                                </div> */}
                                <div style={{ marginTop: '20px', display: 'flex', gap: '5px' }}>
                                    <div style={{ width: '130px' }}>Chọn dịch vụ</div>
                                    {serviceDataArray.length > 0 ? (
                                        <Select style={{ width: '200px' }} onChange={handleChangeServiceId}>
                                            {serviceDataArray.map((service, index) => (
                                                <Option key={service.serviceId} value={service.serviceId} >
                                                    {service.nameService}/
                                                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(
                                                        service.price
                                                    )}
                                                </Option>
                                            ))}
                                        </Select>
                                    ) : (
                                        <div>Không có dữ liệu nhân viên</div>
                                    )}
                                </div>
                                <div style={{ marginTop: '20px', fontSize: '25px', fontWeight: '600' }}>
                                    Tổng tiền: {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(calculateTotalPrice())}
                                </div>


                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 'auto', marginTop: '30px' }}>
                                    <button style={{ border: '0', height: '50px', width: '150px', backgroundColor: '#ee4d2d', color: '#fff', borderRadius: '5px', }} onClick={handleSubmit}>Thanh toán</button>
                                </div>
                            </div>
                        </section>
                    </section>
                )
                }

            </div>
        </div>
    )
}
export default DetailProduct