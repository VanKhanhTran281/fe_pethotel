import { Alert, Checkbox, Table } from "antd"
import { useEffect, useState } from "react";
import { RootState, useAppDispatch } from "../../../redux/store";
import { useSelector } from "react-redux";
import { deleteService, fetchService } from "../../../redux/actions";
import { deleteServiceData } from "../../../redux/api";
import './TableServiceList.css'
import UpdateForm from "./UpdateForm";
import { toast } from "react-toastify";

const TableServiceList: React.FC = () => {
    const dispatch = useAppDispatch();
    const serviceData = useSelector((state: RootState) => state.service.data);
    const serviceDataArray = serviceData ? Object.values(serviceData) : [];
    const [showUpdate, setShowUpdate] = useState(true);
    const [valueUd, setValueUd] = useState<ServiceData | null>(null);
    const fetchData = () => {
        dispatch(fetchService());
    };

    useEffect(() => {
        fetchData();
    }, []);


    // Xử lý sự kiện hiện form khi bấm vào dấu 3 chấm và thao tác sửa xóa
    const [showFormArray, setShowFormArray] = useState(Array(serviceDataArray.length).fill(false));
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
    const handleUpdateService = (updateService: ServiceData) => {
        dispatch(fetchService());
    };
    const handleEditClick = (record: ServiceData) => {
        setShowUpdate(!showUpdate)
        setValueUd(record)
        setSelectedRowIndex(-1);
    };
    const [showAlert, setShowAlert] = useState(false);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

    const handleDeleteConfirmation = () => {
        setShowDeleteConfirmation(true);
    };
    const handleDeleteClick = async (service: ServiceData) => {
        try {
            await deleteServiceData(service.serviceId);
            dispatch(deleteService(service.serviceId));
            dispatch(fetchService());
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
    const columns = [
        {
            title: <Checkbox className="bgr" disabled />, render: () => (<Checkbox />),
        },
        { title: "Mã dịch vụ", dataIndex: "serviceId", key: "serviceId" },
        { title: "Tên dịch vụ", dataIndex: "nameService", key: "nameService" },
        {
            title: "Giá",
            dataIndex: "price",
            key: "price",
            render: (price: number) => (
                <div>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price)}</div>
            )
        },
        {
            title: "Mô tả", dataIndex: "describe", key: "describe",
            render: (describe: string) => {
                if (describe.length > 12) {
                    return (
                        <span>
                            {describe.substring(0, 11)}
                            <span style={{ color: "black" }}>...</span>
                        </span>
                    );
                } else {
                    return <span>{describe}</span>;
                }
            },
        },
        {
            title: 'Tùy chọn',
            key: 'actions',
            render: (_: any, record: ServiceData, index: number) => (
                <div style={{ cursor: 'pointer' }} onClick={() => handleThreeDotsClick(index)}>
                    <svg style={{ fontSize: '30px', marginLeft: '15px' }} width="14" height="4" viewBox="0 0 14 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2.25 1.5C2.6625 1.5 3 1.8375 3 2.25C3 2.6625 2.6625 3 2.25 3M2.25 1.5C1.8375 1.5 1.5 1.8375 1.5 2.25C1.5 2.6625 1.8375 3 2.25 3M2.25 1.5V3M6.75 1.5C7.1625 1.5 7.5 1.8375 7.5 2.25C7.5 2.6625 7.1625 3 6.75 3M6.75 1.5C6.3375 1.5 6 1.8375 6 2.25C6 2.6625 6.3375 3 6.75 3M6.75 1.5V3M11.75 1.5C12.1625 1.5 12.5 1.8375 12.5 2.25C12.5 2.6625 12.1625 3 11.75 3M11.75 1.5C11.3375 1.5 11 1.8375 11 2.25C11 2.6625 11.3375 3 11.75 3M11.75 1.5V3" stroke="#1A2433" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {showFormArray[index] && selectedRowIndex === index && (
                        <div
                            style={{
                                position: 'absolute',
                                top: '60px',
                                left: '-147px',
                                zIndex: 9998,
                                backgroundColor: 'white',
                                padding: '10px',
                                height: '88px',
                                width: '160px',
                                display: 'grid',
                                border: '0.5px solid rgb(224, 228, 240)',
                                borderRadius: '8px'
                            }}
                        >
                            <div style={{ marginTop: '-5px' }}>
                                <span style={{ display: 'flex', alignItems: 'center', marginLeft: '10px', cursor: 'pointer' }} onClick={() => handleEditClick(record)}>
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12.4999 4.1665C12.4999 6.00745 13.9923 7.49984 15.8333 7.49984M3.33325 16.6665L3.78655 14.4C3.92781 13.6937 3.99844 13.3406 4.1276 13.0113C4.24225 12.719 4.39091 12.4412 4.57051 12.1837C4.77286 11.8936 5.02751 11.6389 5.53681 11.1296L13.3334 3.33316C13.5678 3.09867 13.6851 2.98143 13.7973 2.89699C14.5095 2.36092 15.4905 2.36093 16.2028 2.89702C16.3149 2.98146 16.4322 3.09871 16.6667 3.33319V3.33319C16.9011 3.56767 17.0184 3.68492 17.1028 3.79711C17.6389 4.50933 17.6389 5.49033 17.1028 6.20255C17.0184 6.31474 16.9011 6.43198 16.6666 6.66645L8.87012 14.463C8.36083 14.9723 8.10618 15.2269 7.81605 15.4293C7.55853 15.6089 7.28076 15.7575 6.98848 15.8722C6.65919 16.0013 6.30605 16.0719 5.59978 16.2132L3.33325 16.6665Z" stroke="#1A2433" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    <p style={{ display: 'flex', alignItems: 'center', marginLeft: '10px' }} >Chỉnh sửa</p>
                                </span>
                                <span style={{ display: 'flex', alignItems: 'center', marginLeft: '10px', cursor: 'pointer' }} onClick={() => handleDeleteConfirmation()}>
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M3.33341 4.1665L3.90098 13.815C3.99452 15.4053 4.0413 16.2005 4.38071 16.8039C4.67949 17.3351 5.13299 17.7627 5.68082 18.0298C6.30313 18.3332 7.09965 18.3332 8.69269 18.3332H11.3075C12.9005 18.3332 13.697 18.3332 14.3193 18.0298C14.8672 17.7627 15.3207 17.3351 15.6195 16.8039C15.9589 16.2005 16.0056 15.4053 16.0992 13.815L16.6667 4.1665M3.33341 4.1665H1.66675M3.33341 4.1665H16.6667M16.6667 4.1665H18.3334M13.3334 4.1665L13.0471 3.30756C12.8504 2.71744 12.752 2.42238 12.5696 2.20424C12.4085 2.0116 12.2016 1.8625 11.968 1.77059C11.7033 1.6665 11.3923 1.6665 10.7703 1.6665H9.2299C8.60787 1.6665 8.29685 1.6665 8.03221 1.77059C7.79852 1.8625 7.59164 2.0116 7.43055 2.20424C7.24812 2.42238 7.14977 2.71744 6.95306 3.30756L6.66675 4.1665M8.33342 8.33317V14.1665M11.6667 8.33317V11.6665" stroke="#E61D41" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    <p style={{ marginLeft: '10px', color: '#E61D41' }} >Xóa</p>
                                </span>
                            </div>
                            {showDeleteConfirmation && (
                                <div
                                    style={{
                                        position: 'absolute',
                                        top: '0',
                                        left: '0',
                                        width: '100%',
                                        height: '100%',
                                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}
                                >
                                    <div
                                        style={{
                                            backgroundColor: 'white',
                                            padding: '20px',
                                            borderRadius: '8px'
                                        }}
                                    >
                                        <p>Bạn có chắc chắn muốn xóa mục này không?</p>
                                        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
                                            <button
                                                style={{
                                                    backgroundColor: '#E61D41',
                                                    color: 'white',
                                                    border: 'none',
                                                    padding: '8px 16px',
                                                    borderRadius: '4px',
                                                    cursor: 'pointer',
                                                    marginRight: '10px'
                                                }}
                                                onClick={() => handleDeleteClick(record)}
                                            >
                                                Xác nhận
                                            </button>
                                            <button
                                                style={{
                                                    backgroundColor: 'white',
                                                    color: '#1A2433',
                                                    border: '1px solid #1A2433',
                                                    padding: '8px 16px',
                                                    borderRadius: '4px',
                                                    cursor: 'pointer'
                                                }}
                                                onClick={() => setShowDeleteConfirmation(false)}
                                            >
                                                Hủy
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            ),
        },
    ];
    // Xử lý tìm kiếm
    const [searchValue, setSearchValue] = useState<string>("");
    const filteredService = serviceDataArray.filter((record) => {
        const nameService = record?.nameService?.toLowerCase() || "";
        const price = record?.price?.toLowerCase() || "";
        const describe = record?.describe?.toLowerCase() || "";
        const searchLowercase = searchValue.toLowerCase();
    
        return (
            nameService.includes(searchLowercase) ||
            price.includes(searchLowercase) ||
            describe.includes(searchLowercase)
        );
    });
    // dataSource={filteredContact}
    return (
        <div>
            <div style={{ display: 'flex', width: '1150px', height: '64px', justifyContent: "space-between" }}>
                <div>
                    <p style={{ fontSize: '16px', lineHeight: '19.84px' }}>{serviceDataArray?.length} Dịch vụ</p>
                </div>
                <div style={{ border: '1px solid #E0E4F0 ', marginTop: '7px', display: 'flex', borderRadius: '8px', width: '335px', height: '40px' }}>
                    <svg style={{ padding: '8px' }} width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 20L16.364 16.364M16.364 16.364C17.9926 14.7353 19 12.4853 19 10C19 5.02944 14.9706 1 10 1C5.02944 1 1 5.02944 1 10C1 14.9706 5.02944 19 10 19C12.4853 19 14.7353 17.9926 16.364 16.364Z" stroke="#586374" strokeWidth="1.2" strokeLinecap="round" />
                    </svg>
                    <input style={{ outline: 'none', border: 'none', width: '287px', height: '18px', marginLeft: '5px', marginTop: "13px" }} placeholder="Tìm kiếm bằng tên dịch vụ, giá tiền và mô tả..." value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)} />
                </div>
            </div>
            {serviceDataArray.length > 0 && (
                <Table style={{ width: '1150px' }} dataSource={filteredService} columns={columns} pagination={{ pageSize: 7 }} className="your-table" />
            )}
            {!showUpdate && <UpdateForm valueUd={valueUd} onUpdate={handleUpdateService} handleEditClick={handleEditClick} />}
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
export default TableServiceList