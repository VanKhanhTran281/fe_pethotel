import { Alert, Checkbox, Table } from "antd"
import { useEffect, useState } from "react";
import { RootState, useAppDispatch } from "../../../redux/store";
import { useSelector } from "react-redux";
import { deleteImage, fetchDetail, fetchImage } from "../../../redux/actions";
import { deleteImageData } from "../../../redux/api";
import './TableRoomList.css'
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
// import UpdateForm from "./UpdateForm";

const TableRoomList: React.FC = () => {
  const dispatch = useAppDispatch();
  const detailData = useSelector((state: RootState) => state.detail.data);
  const detailDataArray = detailData ? Object.values(detailData) : [];
  // console.log(detailDataArray)
  const [showUpdate, setShowUpdate] = useState(true);
  const [valueUd, setValueUd] = useState<DetailData | null>(null);
  const fetchData = () => {
    dispatch(fetchDetail());
  };

  useEffect(() => {
    fetchData();
  }, []);


  // Xử lý sự kiện hiện form khi bấm vào dấu 3 chấm và thao tác sửa xóa
  const [showFormArray, setShowFormArray] = useState(Array(deleteImageData.length).fill(false));
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
  const handleUpdateImage = (updateDetail: DetailData) => {
    dispatch(fetchDetail());
  };
  const handleEditClick = (record: DetailData) => {
    setShowUpdate(!showUpdate)
    setValueUd(record)
    setSelectedRowIndex(-1);
  };
  const [showAlert, setShowAlert] = useState(false);
  const handleDeleteClick = async (detail: DetailData) => {
    try {
      await deleteImageData(detail.detailId);
      dispatch(deleteImage(detail.detailId));
      dispatch(fetchImage());
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
    { title: "Mã đơn hàng", dataIndex: "detailId", key: "detailId" },
    { title: "Số phòng", dataIndex: "roomNumber", key: "roomNumber" },
    { title: "Kiểu phòng", dataIndex: "roomType", key: "roomType" },
    {
      title: "Đơn giá",
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (price: number) => (
        <div>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price)}</div>
      )
    },
    {
      title: "Ngày đặt", dataIndex: "startDate", key: "startDate",
      render: (startDate: Date) => (
        <div>{formatDate(startDate)}</div>
      )
    },
    {
      title: "Ngày kết thúc", dataIndex: "endDate", key: "endDate"
      ,
      render: (endDate: Date) => (
        <div>{formatDate(endDate)}</div>
      )
    },
  ];
  const navigate = useNavigate();
  const handleRowClick = (record: DetailData) => {
    navigate(`/admin/detail/${record.detailId}`);
  };
  // Xử lý tìm kiếm
  const [searchValue, setSearchValue] = useState<string>("");
    const filteredDetail = detailDataArray.filter((record) => {
        const roomNumber = record?.roomNumber?.toLowerCase() || "";
        const startDate = record?.startDate?.toLowerCase() || "";
        const endDate = record?.endDate?.toLowerCase() || "";
        const searchLowercase = searchValue.toLowerCase();
        return (
            roomNumber.includes(searchLowercase) ||
            startDate.includes(searchLowercase) ||
            endDate.includes(searchLowercase)
        );
    });
  // dataSource={filteredContact}
  return (
    <div>
      <div style={{ display: 'flex', width: '1150px', height: '64px', justifyContent: "space-between" }}>
                <div>
                    <p style={{ fontSize: '16px', lineHeight: '19.84px' }}>{detailDataArray?.length} Đơn</p>
                </div>
                <div style={{ border: '1px solid #E0E4F0 ', marginTop: '7px', display: 'flex', borderRadius: '8px', width: '335px', height: '40px' }}>
                    <svg style={{ padding: '8px' }} width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 20L16.364 16.364M16.364 16.364C17.9926 14.7353 19 12.4853 19 10C19 5.02944 14.9706 1 10 1C5.02944 1 1 5.02944 1 10C1 14.9706 5.02944 19 10 19C12.4853 19 14.7353 17.9926 16.364 16.364Z" stroke="#586374" strokeWidth="1.2" strokeLinecap="round" />
                    </svg>
                    <input style={{ outline: 'none', border: 'none', width: '287px', height: '18px', marginLeft: '5px', marginTop: "13px" }} placeholder="Tìm kiếm bằng số phòng, kích thước và giá..." value={searchValue}
                        onChange={(e) => setSearchValue(e?.target?.value)} />
                </div>
            </div>
      {detailDataArray.length > 0 && (
        <Table style={{ width: '1150px' }} dataSource={filteredDetail} columns={columns} pagination={{ pageSize: 7 }} className="your-table"
          onRow={(record: DetailData) => ({
            onClick: () => handleRowClick(record),
          })}
          rowKey={(record: { detailId: number }) => record.detailId}
        />
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