import { Table } from 'antd';
import { RootState, useAppDispatch } from '../../redux/store';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchService } from '../../redux/actions';
import './index.css'
const Service: React.FC = () => {
    const dispatch = useAppDispatch();
    const serviceData = useSelector((state: RootState) => state.service.data);
    const serviceDataArray = serviceData ? Object.values(serviceData) : [];
    const fetchData = () => {
        dispatch(fetchService());
    };

    useEffect(() => {
        fetchData();
    }, []);
    const columns = [
        { title: "Tên dịch vụ", dataIndex: "nameService", key: "nameService" },
        {
            title: "Giá", dataIndex: "price", key: "price"
            ,
            render: (price: number) => (
                <div>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price)}</div>
            )
        },
        { title: "Mô tả", dataIndex: "describe", key: "describe" },
    ];
    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ width: '1450px', marginTop: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div>
                    <img src="/img/sliderservice.jpg" alt="" style={{ width: '1450px', height: '300px' }} />
                </div>
                <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'center' }}>
                    <div style={{}}>
                        <img src="/img/service1.jpg" alt="" style={{ width: '300px', height: '200px' }} />
                    </div>
                    <div>
                        <img src="/img/service2.jpg" alt="" style={{ width: '300px', height: '200px' }} />
                    </div>
                    <div>
                        <img src="/img/service3.jpg" alt="" style={{ width: '300px', height: '200px' }} />
                    </div>
                    <div>
                        <img src="/img/service4.jpg" alt="" style={{ width: '300px', height: '200px' }} />
                    </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
                        <p style={{ fontSize: '35px', fontWeight: '600',marginBottom:'10px' }}>Dịch vụ dành cho thú cưng tại khách sạn</p>
                        <div style={{height:'2px',backgroundColor:"black",width:'30%'}}></div>
                    </div>
                    <div style={{marginTop:'40px'}}>
                        {serviceDataArray.length > 0 && (
                            <Table style={{ width: '1150px' }} dataSource={serviceDataArray} columns={columns} pagination={{ pageSize: 10 }} />
                        )}
                    </div>
                </div>
                <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
                    <p style={{ fontSize: '35px', fontWeight: '600',marginBottom:'10px' }}>Cam kết về dịch vụ của khách sạn</p>
                    <div style={{height:'2px',backgroundColor:"black",width:'30%'}}></div>
                </div>
                <div style={{ display: 'flex',marginTop:'40px',flexDirection:'column',color:'#fff', width: '1224px' ,alignItems:'center',justifyContent:'center'}}>
                    <div style={{display:'flex',gap:'40px'}}>
                        <div className='hover_block_service' style={{ borderRadius: '20px', backgroundColor: '#6699ff', width: '378px', height: '138px', padding: '0px 15px', marginBottom: '40px' }}>
                            <p style={{fontSize:'26px',fontWeight:'700',textAlign:'center'}}>Uy tín,<br></br> chuyên nghiệp</p>
                        </div>   
                        <div className='hover_block_service' style={{ borderRadius: '20px', backgroundColor: '#ff66ad', width: '378px', height: '138px', padding: '0px 15px', marginBottom: '40px' }}>
                            <p style={{fontSize:'26px',fontWeight:'700',textAlign:'center'}}>Tận tâm,<br></br> nhiệt huyết</p>
                        </div> 
                    </div>
                    <div style={{display:'flex',gap:'40px'}}>
                        <div className='hover_block_service' style={{ borderRadius: '20px', backgroundColor: '#023047', width: '378px', height: '138px', padding: '0px 15px', marginBottom: '40px' }}>
                            <p style={{fontSize:'26px',fontWeight:'700',textAlign:'center'}}>Đội ngũ nhân viên được đào tạo bài bản</p>
                        </div>   
                        <div className='hover_block_service' style={{ borderRadius: '20px', backgroundColor: '#ffb300', width: '378px', height: '138px', padding: '0px 15px', marginBottom: '40px' }}>
                            <p style={{fontSize:'26px',fontWeight:'700',textAlign:'center'}}>Dịch vụ chăm sóc hàng đầu, đảm bảo</p>
                        </div> 
                    </div> 
                </div>
            </div>

        </div>
    )
}
export default Service