import { DatePicker, Flex, Select } from 'antd';
import { RootState, useAppDispatch } from '../../redux/store';
import { useSelector } from 'react-redux';
import { fetchImage, fetchImageDataByRoomId, fetchRoom } from '../../redux/actions';
import { useEffect, useState } from 'react';
import moment from 'moment';

const RoomPhoto: React.FC = () => {
    const dispatch = useAppDispatch();
    const imageData = useSelector((state: RootState) => state.image.data);
    const imageDataArray = imageData ? Object.values(imageData) : [];
    
    const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const roomData = useSelector((state: RootState) => state.room.data);
    const roomDataArray = roomData ? Object.values(roomData) : [];
    console.log(roomDataArray)
    useEffect(() => {
        dispatch(fetchRoom())
    }, []);
    useEffect(() => {
        dispatch(fetchRoom())
        if (selectedRoom !== null) {
            dispatch(fetchImageDataByRoomId(parseInt(selectedRoom)));
            
        }
    }, [dispatch, selectedRoom]);

    const handleRoomSelect = (value: string) => {
        setSelectedRoom(value);
    };
    const handleDateSelect = (date: moment.Moment | null) => {
        setSelectedDate(date?.format('YYYY-MM-DD') || null);
    };

    const filteredImages = selectedDate
        ? imageDataArray.filter((image) => moment(image.date).format('YYYY-MM-DD') === selectedDate)
        : imageDataArray;
    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ width: '1450px', marginTop: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div>
                    <img src="/img/sliderservice.jpg" alt="" style={{ width: '1450px', height: '300px' }} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '30px' }}>
                    <div>
                        <p style={{ fontSize: '35px', fontWeight: '600' }}>Ảnh thú cưng theo ngày</p>
                    </div>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <Select
                            showSearch
                            style={{ width: 200 }}
                            placeholder="Chọn số phòng"
                            optionFilterProp="children"
                            filterOption={(input, option) => (option?.label ?? '').includes(input)}
                            filterSort={(optionA, optionB) =>
                                (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                            }
                            options={roomDataArray?.map((room) => ({
                                value: room?.roomId.toString(),
                                label: room?.roomNumber,
                            }))}
                            onChange={handleRoomSelect}
                        />
                        <DatePicker format="YYYY-MM-DD" onChange={handleDateSelect} />
                    </div>
                    <div style={{ width: '1450px',display:'flex',gap:'15px' }}>
                        {filteredImages.map((image, index) => (
                            <div key={image.imgId}>
                                <img src={`http://localhost:3000/${image.imgUrl}`} alt={image.imgId.toString()}  style={{ width: '200px', height: '200px' }} />
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </div>
    )
}
export default RoomPhoto
