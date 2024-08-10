
import { CommentOutlined, DownOutlined, FacebookOutlined, InstagramOutlined, MailOutlined, PhoneOutlined, ShoppingCartOutlined, TwitterOutlined, UserAddOutlined, UserOutlined, YoutubeOutlined } from '@ant-design/icons/lib/icons'
import { AutoComplete, Avatar, Button, Input } from 'antd'
import { Link, Outlet } from 'react-router-dom'
import './MainLayout.css'
import { useState, useRef, useEffect } from 'react'
import SignIn from '../account/sign_in'
import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from '../../redux/store'
import { fetchUserDataById, fetchUserProfiles } from '../../redux/actions'
import Bookings from '../../pages/detail/bookings'
import CreateComment from '../../pages/detail/addcomment'
import { setIsLoggedIn } from '../../redux/authReducers'
import BookingDetail from '../../pages/detail/booking'

const MainLayout: React.FC = () => {
  const [showSignInForm, setShowSignInForm] = useState<boolean>(false);
  const [showBookingForm, setShowBookingForm] = useState<boolean>(false);
  const [showDetailForm, setShowDetailForm] = useState<boolean>(false);
  const [showCommentForm, setShowCommentForm] = useState<boolean>(false);
  const handleShowCommentForm = () => {
    setShowCommentForm(!showCommentForm)
  };
  const signInFormRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (signInFormRef.current && !signInFormRef.current.contains(event.target as Node)) {
        setShowSignInForm(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);
  const dispatch = useAppDispatch();
  const userData = useSelector((state: RootState) => state.user.data);
  const userDataArray = userData ? Object.values(userData) : [];
  const [userDataById, setUserDataById] = useState<any>({});
  const handleShowBookingForm = () => {
    setShowBookingForm(!showBookingForm)
    setUserDataById(userDataById)
  };
  // show detailbooking
  const handleShowDetailForm = () => {
    setShowDetailForm(!showDetailForm)
    setUserDataById(userDataById)
  };

  // 
  const handleReloadBooking = (record: any) => {
    setShowBookingForm(!showBookingForm)
    setUserDataById(record)
  };
  const handleUpdateBooking = (updateStaff: any) => {
    // console.log(updateStaff)
    dispatch(fetchUserDataById(updateStaff));
    setUserDataById(userDataById)
  };
  // console.log(userDataById)
  const [isDataFetched, setIsDataFetched] = useState(false);
  // useEffect(() => {
  //   if (isLoggedIn && !isDataFetched) {
  //     dispatch(fetchUserProfiles()).then(() => {
  //       if (isLoggedIn && !isDataFetched && userDataArray.length > 0) {
  //         const userId = userDataArray[3];
  //         dispatch(fetchUserDataById(userId)).then((action) => {
  //           setUserDataById(action.payload);
  //           setIsDataFetched(true);
  //            localStorage.setItem('user', JSON.stringify(userDataArray));
  //         });
  //       }
  //     });
  //   }
  // }, [dispatch, userDataArray, isDataFetched,userDataById]);
  useEffect(() => {
    if (isLoggedIn && !isDataFetched) {
      localStorage.setItem('user', JSON.stringify(userDataArray));
      dispatch(fetchUserProfiles()).then(() => {
        if (isLoggedIn && !isDataFetched && userDataArray.length > 0) {
          const userId = userDataArray[3];
          dispatch(fetchUserDataById(userId)).then((action) => {
            setUserDataById(action.payload);
            setIsDataFetched(true);

          });
        }
      });
    }
  }, [dispatch, userDataArray, isDataFetched, userDataById]);
  const [useDataArray, setUserDataArray] = useState([]);

  useEffect(() => {
    const userDataFromStorage = localStorage.getItem('user');
    if (userDataFromStorage) {
      const userData = JSON.parse(userDataFromStorage);
      dispatch(setIsLoggedIn(true));
      setUserDataArray(userData);
    }
  }, [dispatch, userData]);
  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('authToken');

    dispatch(setIsLoggedIn(false));
    window.location.reload();
    setUserDataArray([]);
  }
  const [showLogoutButton, setShowLogoutButton] = useState(false);
  const handleClickUserInfo = () => {
    setShowLogoutButton(!showLogoutButton);
  };

  const { isLoggedIn } = useSelector((state: RootState) => state.auth);
  return (
    <div style={{ gap: '30px' }}>
      {/* border: '1px solid black' */}
      <div style={{ width: 'auto', height: '155px' }}>
        <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '130px', height: '135px' }}>
          <Link to='/'>
            <div style={{ borderRadius: '50%', width: '120px', height: '120px', overflow: 'hidden', border: '2px solid #313177' }}>
              <img src='/img/logo.jpg' alt="" style={{ width: '120px', height: '120px' }} />
            </div>
          </Link>
          <div>
            <AutoComplete
              popupMatchSelectWidth={252}
              style={{ width: 600 }}
              //   options={options}
              //   onSelect={onSelect}
              //   onSearch={handleSearch}
              size="large"
            >
              <Input.Search size="large" placeholder="Tìm kiếm tại đây" enterButton />
            </AutoComplete>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {/* <div style={{ display: 'flex', gap: '3px', cursor: 'pointer' }} onClick={() => setShowSignInForm(!showSignInForm)}>
              <UserOutlined style={{ fontSize: '20px' }} />
              <p style={{ fontSize: '18px' }}>Đăng nhập</p>
            </div>
            <div>/</div>
            <Link to='/signup' style={{textDecoration:'none'}}>
              <div style={{ display: 'flex', gap: '3px', cursor: 'pointer' }}>
                <UserAddOutlined style={{ fontSize: '20px',color:'black' }} />
                <p style={{ fontSize: '18px',color:'black' }}>Đăng ký</p>
              </div>
            </Link> */}
            {!isLoggedIn ? (
              <>
                <div style={{ display: 'flex', gap: '3px', cursor: 'pointer' }} onClick={() => setShowSignInForm(!showSignInForm)}>
                  <UserOutlined style={{ fontSize: '20px' }} />
                  <p style={{ fontSize: '18px' }}>Đăng nhập</p>
                </div>
                <div>/</div>
                <Link to='/signup' style={{ textDecoration: 'none' }}>
                  <div style={{ display: 'flex', gap: '3px', cursor: 'pointer' }}>
                    <UserAddOutlined style={{ fontSize: '20px', color: 'black' }} />
                    <p style={{ fontSize: '18px', color: 'black' }}>Đăng ký</p>
                  </div>
                </Link>
              </>
            ) : (
              <div style={{ display: 'flex', gap: '3px', cursor: 'pointer', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }} onClick={handleClickUserInfo}>
                  <Avatar size={35} icon={<UserOutlined />} />
                  <p style={{ fontSize: '18px' }}>{useDataArray[2]}</p>
                  <DownOutlined />
                </div>
                <div style={{ border: '1px solid black', height: '25px', marginLeft: '10px' }}></div>
                <div>
                  <div style={{ display: 'flex', gap: '3px', cursor: 'pointer' }} onClick={handleShowBookingForm}>
                    <ShoppingCartOutlined style={{ fontSize: '30px' }} />
                    <p style={{ fontSize: '18px' }}>Giỏ hàng</p>
                  </div>
                </div>
                <div style={{ border: '1px solid black', height: '25px', marginLeft: '10px' }}></div>
                <div style={{ display: 'flex', gap: '3px', cursor: 'pointer' }} onClick={handleShowCommentForm}>
                  <CommentOutlined style={{ fontSize: '30px' }} />
                  <p style={{ fontSize: '18px' }}>Phản hồi</p>
                </div>
                {/* <Button onClick={handleLogout}>Đăng xuất</Button> */}

              </div>
            )}
          </div>

        </header>
        <div style={{ gap: '40px', display: 'flex',justifyContent:'center',marginLeft:'-1075px' }}>
          <Link to='/' className='nameheader' style={{ marginLeft: '40px' }}>PHÒNG KHÁCH SẠN</Link>
          {/* <Link to='/cat' className='nameheader'>MÈO</Link> */}
          <Link to='/service' className='nameheader'>DỊCH VỤ</Link>
          <Link to='/room_photo' className='nameheader'>ẢNH PHÒNG</Link>
        </div>
        {showSignInForm && (
          <div ref={signInFormRef} style={{ width: '0px' }}>
            <SignIn />
          </div>
        )}
        {showLogoutButton && (
          <div style={{ width: '120px', 
            height: '60px', 
            border: '1px solid #dee2e6',
            backgroundColor:'#fff',
            position:'relative',
            marginLeft:'1075px',
            borderRadius:'8px', 
            marginTop:'-50px',
            zIndex: '999',
            display:'flex',
            flexDirection:'column',
            justifyContent:'center',
            alignItems:'center',
            gap:'5px'
            }}>
            {/* <Button onClick={handleLogout}>Đăng xuất</Button> */}
            <div onClick={handleLogout} style={{cursor:'pointer'}}>Đăng xuất</div>
            <div style={{border:'1px solid #dee2e6',width:'100%'}}></div>
            <div style={{cursor:'pointer'}} onClick={handleShowDetailForm}>Lịch sử đặt</div>
          </div>
        )}
        {showDetailForm && (
          <div style={{ width: '0px' }}>
            <BookingDetail valueUd={userDataById} onclick={handleReloadBooking} onUpdate={handleUpdateBooking} />
          </div>
        )}
        {showBookingForm && (
          <div style={{ width: '0px' }}>
            <Bookings valueUd={userDataById} onclick={handleReloadBooking} onUpdate={handleUpdateBooking} />
          </div>
        )}
        {showCommentForm && (
          <div style={{ width: '0px' }}>
            <CreateComment />
          </div>
        )}
      </div>
      <Outlet />
      <div style={{ width: 'auto', height: '200px', marginTop: '40px', backgroundColor: 'black', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '80px' }}>
        <div style={{ color: '#fff', width: '300px', height: '140px', display: 'flex', flexDirection: 'column', gap: '10px', cursor: 'pointer' }}>
          <div>Giới thiệu</div>
          <div style={{ fontSize: '12px' }}>
            <div className='hover_footer'>Công ty TNHH Petmall Việt Nam</div>
            <div className='hover_footer' style={{ textAlign: 'justify' }}>Giấy chứng nhận Đăng ký Kinh doanh số 123456789 do Sở Kế hoạch và Đầu tư Thành phố Hồ Chí Minh cấp ngày 12/04/2024</div>
            <div className='hover_footer'>Đại diện: Trần Văn Khánh</div>
          </div>
        </div>
        <div style={{ color: '#fff', width: '300px', height: '140px', display: 'flex', flexDirection: 'column', gap: '10px', cursor: 'pointer' }}>
          <div>Liên hệ với chúng tôi</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div >
              <div>OFFICE</div>
              <div className='hover_footer' style={{ fontSize: '12px' }}>KIm Lâm, Thị trấn Kim Bài, Huyện Thanh Oai, TP.Hà Nội</div>
            </div>
            <div className='hover_footer' style={{ display: 'flex', gap: '7px' }}>
              <PhoneOutlined />
              <div >Đặt phòng: 0963482670</div>
            </div>
            <div className='hover_footer' style={{ display: 'flex', gap: '7px' }}>
              <MailOutlined />
              <div >tranvankhanh2812002@gmail.com</div>
            </div>
          </div>
        </div>
        <div style={{ color: '#fff', width: '300px', height: '140px', display: 'flex', flexDirection: 'column', gap: '10px', cursor: 'pointer' }}>
          <div>Fanpage</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div className='hover_footer'>https://www.facebook.com/hatmit.trangtrai</div>
            <div className='hover_footer' style={{ display: 'flex', gap: '7px', fontSize: '23px' }}>
              <FacebookOutlined />
              <InstagramOutlined />
              <TwitterOutlined />
              <YoutubeOutlined />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainLayout