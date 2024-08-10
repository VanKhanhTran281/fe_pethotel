import { Button, Checkbox, Table } from "antd"
import { useEffect, useState } from "react";
import { RootState, useAppDispatch } from "../../../redux/store";
import { useSelector } from "react-redux";
import {  fetchStaff } from "../../../redux/actions";
import { Link, useNavigate } from "react-router-dom";
// import './TableRoomList.css'

const SeeStaff: React.FC = () => {
    const dispatch = useAppDispatch();
    const staffData = useSelector((state: RootState) => state.staff.data);
    const staffDataArray = staffData ? Object.values(staffData) : [];
    // console.log(staffDataArray)
    const fetchData = () => {
        dispatch(fetchStaff());
    };

    useEffect(() => {
        fetchData();
    }, []);
    const columns = [
        {
            title: <Checkbox className="bgr" disabled />, render: () => (<Checkbox />),
        },
        { title: "Mã nhân viên", dataIndex: "staffId", key: "staffId" },
        { title: "Tên nhân viên", dataIndex: "staffName", key: "staffName" },
        { title: "Giới tính", dataIndex: "sex", key: "sex" },
        { title: "Địa chỉ", dataIndex: "address", key: "address" },
        { title: "Số điện thoại", dataIndex: "phoneNumber", key: "phoneNumber" },
        
    ];
    const navigate = useNavigate();
    const handleRowClick = (record: StaffData) => {
        navigate(`/staff/seestaff/${record.staffId}`);
    };
    // Xử lý tìm kiếm
    const [searchValue, setSearchValue] = useState<string>("");
    const filteredStaff = staffDataArray.filter((record) => {
        const staffName = record?.staffName?.toLowerCase() || "";
        const phoneNumber = record?.phoneNumber?.toLowerCase() || "";
        const address = record?.address?.toLowerCase() || "";
        const searchLowercase = searchValue.toLowerCase();
    
        return (
            staffName.includes(searchLowercase) ||
            phoneNumber.includes(searchLowercase) ||
            address.includes(searchLowercase)
        );
    });
    // dataSource={filteredContact}
    return (
        <div style={{marginLeft:'200px',marginTop:'100px'}}>
            <Link to='/'><Button>Thoát</Button></Link>
            <div style={{ display: 'flex', width: '1150px', height: '64px', justifyContent: "space-between" }}>
                <div>
                    <p style={{ fontSize: '16px', lineHeight: '19.84px' }}>{staffDataArray.length} Nhân viên</p>
                </div>
                <div style={{ border: '1px solid #E0E4F0 ', marginTop: '7px', display: 'flex', borderRadius: '8px', width: '335px', height: '40px' }}>
                    <svg style={{ padding: '8px' }} width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 20L16.364 16.364M16.364 16.364C17.9926 14.7353 19 12.4853 19 10C19 5.02944 14.9706 1 10 1C5.02944 1 1 5.02944 1 10C1 14.9706 5.02944 19 10 19C12.4853 19 14.7353 17.9926 16.364 16.364Z" stroke="#586374" strokeWidth="1.2" strokeLinecap="round" />
                    </svg>
                    <input style={{ outline: 'none', border: 'none', width: '287px', height: '18px', marginLeft: '5px', marginTop: "13px" }} placeholder="Tìm kiếm bằng tên, số điện thoại, địa chỉ..." value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)} />
                </div>
            </div>
            {staffDataArray.length > 0 && (
                <Table style={{ width: '1150px' }} dataSource={filteredStaff} columns={columns} pagination={{ pageSize: 7 }} className="your-table"
                    onRow={(record:StaffData) => ({
                        onClick: () => handleRowClick(record),
                    })}
                    rowKey={(record: { staffId: number }) => record.staffId}
                />
            )}
            
        </div>


    )
}
export default SeeStaff