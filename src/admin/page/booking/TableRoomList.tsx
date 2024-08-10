import { Alert, Checkbox, Table } from "antd"
import { useEffect, useState } from "react";
import { RootState, useAppDispatch } from "../../../redux/store";
import { useSelector } from "react-redux";
import { deleteBooking, deleteImage, fetchBooking, fetchImage } from "../../../redux/actions";
import { deleteBookingData, deleteImageData } from "../../../redux/api";
import './TableRoomList.css'
import { toast } from "react-toastify";
// import UpdateForm from "./UpdateForm";

const TableRoomList: React.FC = () => {
  const dispatch = useAppDispatch();
    const bookingData = useSelector((state: RootState) => state.booking.data);
    const bookingDataArray = bookingData ? Object.values(bookingData) : [];
    const [showUpdate, setShowUpdate] = useState(true);
    const [valueUd, setValueUd] = useState<BookingData | null>(null);
    const fetchData = () => {
        dispatch(fetchBooking());
    };

    useEffect(() => {
        fetchData();
    }, []);


  // Xử lý sự kiện hiện form khi bấm vào dấu 3 chấm và thao tác sửa xóa
  const [showFormArray, setShowFormArray] = useState(Array(bookingDataArray.length).fill(false));
  const [selectedRowIndex, setSelectedRowIndex] = useState(-1); // Chỉ số dòng được chọn, ban đầu là -1
  const handleThreeDotsClick = (index: number) => {
      if (selectedRowIndex === index) {
          setSelectedRowIndex(-1);
      } else {
          setSelectedRowIndex(index);
      }

      const updatedShowFormArray = [...showFormArray];
      updatedShowFormArray[index] = true;
      setShowFormArray(updatedShowFormArray);
  };
  const handleUpdateImage = (updateBooking:BookingData) => {
      dispatch(fetchBooking());
    };
  const handleEditClick = (record:BookingData) => {
      setShowUpdate(!showUpdate)
      setValueUd(record)
      setSelectedRowIndex(-1);
  };
  const [showAlert, setShowAlert] = useState(false);
  const handleDeleteClick = async (booking: BookingData) => {
    try {
        await deleteBookingData(booking.bookingId);
        dispatch(deleteBooking(booking.bookingId));
        dispatch(fetchBooking());
        setSelectedRowIndex(-1);       
        toast.success('Xóa thành công');
        setShowAlert(true);
        setTimeout(() => {
            setShowAlert(false);
        }, 2000);
    } catch (error: any | Error) {
        if ((error as Error).message.includes('constraint')) {
            toast.error('Không thể xóa do ràng buộc');
            alert('Không thể xóa do ràng buộc!');
        } else {
            toast.error('Không thể xóa do ràng buộc');
            alert('Không thể xóa do ràng buộc!');
        }
    }
      
  };
  function formatDate(dateString: string | number | Date) {
    const dateObj = new Date(dateString);
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const day = String(dateObj.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  const columns = [
    {
        title: <Checkbox className="bgr" disabled />, render: () => (<Checkbox />),
    },
    { title: "Mã đơn", dataIndex: "bookingId", key: "bookingId" },
    { title: "Ngày", dataIndex: "startDate", key: "startDate" ,
        render :(startDate:Date)=>(
            <div>{formatDate(startDate)}</div>
           )},
];
// Xử lý tìm kiếm
// const [searchValue, setSearchValue] = useState<string>("");
// const filteredContact = roomDataArray.filter((record) => {
//     const fullName = `${record.first_name} ${record.last_name}`.toLowerCase();
//     const email = record.email.toLowerCase();
//     const phone = record.phone.toLowerCase();
//     const searchLowercase = searchValue.toLowerCase();

//     return (
//         fullName.includes(searchLowercase) ||
//         email.includes(searchLowercase) ||
//         phone.includes(searchLowercase)
//     );
// });
// dataSource={filteredContact}
  return (
            <div>
            {bookingDataArray.length > 0 && (
                <Table style={{width:'1150px'}} dataSource={bookingDataArray}  columns={columns} pagination={{ pageSize: 7 }} className="your-table" />
            )}
            {/* {!showUpdate&&<UpdateForm valueUd={valueUd} onUpdate={handleUpdateRoom} handleEditClick={handleEditClick} />} */}
            {showAlert && (
                <Alert
                    message="Success Tips"
                    description="Xóa thành công"
                    type="success"
                    showIcon
                />
            )}
            </div>
        
  
  )
}
export default TableRoomList