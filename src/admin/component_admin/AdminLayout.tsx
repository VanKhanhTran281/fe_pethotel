import { Link, Outlet, useNavigate } from 'react-router-dom'
import './AdminLayout.css'
import { Avatar, Dropdown, DropdownProps, MenuProps, Space } from 'antd'
import { CommentOutlined, DownOutlined, FileImageOutlined, MenuUnfoldOutlined, PayCircleOutlined, ShopOutlined, UnorderedListOutlined, UserOutlined, UsergroupAddOutlined } from '@ant-design/icons/lib/icons'
import { useState } from 'react'
const AdminLayout: React.FC = () => {
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const handleMenuClick: MenuProps['onClick'] = (e) => {
    if (e.key === '1') {
      localStorage.removeItem('user');
    localStorage.removeItem('authToken');
      navigate('/');
    }
  };

  const handleOpenChange: DropdownProps['onOpenChange'] = (nextOpen, info) => {
    if (info.source === 'trigger' || nextOpen) {
      setOpen(nextOpen);
    }
  };

  const items: MenuProps['items'] = [
    {
      label: 'Đăng xuất',
      key: '1',
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <header style={{ width: '100%', height: '135px', borderBottom: '1px solid black', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{borderRadius:'50%',width: '120px', height: '120px',overflow:'hidden',border:'2px solid #313177', marginLeft: '40px'}}>
          <img src='/img/logo.jpg' alt="" style={{ width: '120px', height: '120px' }} />
        </div>
        <div style={{marginRight:'115px'}}>
          <div style={{ display: 'flex', gap: '7px',alignItems:'center' }}>
            <Avatar size={40} icon={<UserOutlined />} />
            <Dropdown
              menu={{
                items,
                onClick: handleMenuClick,
              }}
              onOpenChange={handleOpenChange}
              open={open}
            >
              <Link to='#' onClick={(e) => e.preventDefault()}>
                <Space style={{color:'black'}}>
                  Admin
                  <DownOutlined  style={{color:'black',fontSize:'14px'}}/>
                </Space>
              </Link>
            </Dropdown>
          </div>
        </div>
      </header>
      <div style={{ display: 'flex', width: '100%', height: '1000px' }}>
        <div style={{ width: '240px', height: '100%', backgroundColor: '#D9D9D9' }}>
          <div style={{display:'flex',flexDirection:'column',alignItems:'center',gap:'20px',marginTop:'40px'}}>
            <Link to='user' style={{textDecoration:'none'}}>
              <div style={{backgroundColor:'white',width:'180px',height:"40px",border:'2px solid black',borderRadius:'7px',display:'flex',alignItems:'center'}}>
                  <UserOutlined style={{color:'black',fontSize:'18px',marginLeft:'7px'}}/>
                  <p style={{fontSize:'19px',marginLeft:'7px'}}>Tài khoản</p>
                  {/* <DownOutlined style={{marginLeft:'80px',color:'black'}}/> */}
              </div>
            </Link>
            <Link to='room' style={{textDecoration:'none'}}>
              <div style={{backgroundColor:'white',width:'180px',height:"40px",border:'2px solid black',borderRadius:'7px',display:'flex',alignItems:'center'}}>
                  <ShopOutlined  style={{color:'black',fontSize:'18px',marginLeft:'7px'}}/>
                  <p style={{fontSize:'19px',marginLeft:'7px'}}>Phòng</p>
                  {/* <DownOutlined style={{marginLeft:'68px',color:'black'}}/> */}
              </div>
            </Link>
            <Link to='service' style={{textDecoration:'none'}}>
              <div style={{backgroundColor:'white',width:'180px',height:"40px",border:'2px solid black',borderRadius:'7px',display:'flex',alignItems:'center'}}>
                  <MenuUnfoldOutlined  style={{color:'black',fontSize:'18px',marginLeft:'7px'}}/>
                  <p style={{fontSize:'19px',marginLeft:'7px'}}>Dịch vụ</p>
                  {/* <DownOutlined style={{marginLeft:'58px',color:'black'}}/> */}
              </div>
            </Link>
            <Link to='detail' style={{textDecoration:'none'}}>
              <div style={{backgroundColor:'white',width:'180px',height:"40px",border:'2px solid black',borderRadius:'7px',display:'flex',alignItems:'center'}}>
                  <UnorderedListOutlined  style={{color:'black',fontSize:'18px',marginLeft:'7px'}}/>
                  <p style={{fontSize:'19px',marginLeft:'7px'}}>Chi tiết đơn</p>
              </div>
            </Link>
            <Link to='#' style={{textDecoration:'none'}}>
              <div style={{backgroundColor:'white',width:'180px',height:"40px",border:'2px solid black',borderRadius:'7px',display:'flex',alignItems:'center'}}>
                  <PayCircleOutlined style={{color:'black',fontSize:'18px',marginLeft:'7px'}}/>
                  <p style={{fontSize:'19px',marginLeft:'7px'}}>Thanh toán</p>
                  {/* <DownOutlined style={{marginLeft:'45px',color:'black'}}/> */}
              </div>
            </Link>
            <Link to='staff' style={{textDecoration:'none'}}>
              <div style={{backgroundColor:'white',width:'180px',height:"40px",border:'2px solid black',borderRadius:'7px',display:'flex',alignItems:'center'}}>
                  <UsergroupAddOutlined style={{color:'black',fontSize:'18px',marginLeft:'7px'}}/>
                  <p style={{fontSize:'19px',marginLeft:'7px'}}>Nhân viên</p>
                  {/* <DownOutlined style={{marginLeft:'87px',color:'black'}}/> */}
              </div>
            </Link>
            {/* <Link to='booking' style={{textDecoration:'none'}}>
              <div style={{backgroundColor:'white',width:'180px',height:"40px",border:'2px solid black',borderRadius:'7px',display:'flex',alignItems:'center'}}>
                  <ShoppingOutlined style={{color:'black',fontSize:'18px',marginLeft:'7px'}}/>
                  <p style={{fontSize:'19px',marginLeft:'7px'}}>Đặt phòng</p>
                  
              </div>
            </Link> */}
            <Link to='image' style={{textDecoration:'none'}}>
              <div style={{backgroundColor:'white',width:'180px',height:"40px",border:'2px solid black',borderRadius:'7px',display:'flex',alignItems:'center'}}>
                  <FileImageOutlined  style={{color:'black',fontSize:'18px',marginLeft:'7px'}}/>
                  <p style={{fontSize:'19px',marginLeft:'7px'}}>Ảnh phòng</p>
                  
              </div>
            </Link>
            <Link to='comment' style={{textDecoration:'none'}}>
              <div style={{backgroundColor:'white',width:'180px',height:"40px",border:'2px solid black',borderRadius:'7px',display:'flex',alignItems:'center'}}>
                  <CommentOutlined  style={{color:'black',fontSize:'18px',marginLeft:'7px'}}/>
                  <p style={{fontSize:'19px',marginLeft:'7px'}}>Phản hồi</p>
                  {/* <DownOutlined style={{marginLeft:'45px',color:'black'}}/> */}
              </div>
            </Link>
            

          </div>
        </div>
        <Outlet />
      </div>
    </div>
  )
}
export default AdminLayout
