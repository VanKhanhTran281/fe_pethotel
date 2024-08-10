import { Alert, Button, Form, Input } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { RootState, useAppDispatch } from '../../redux/store';
import { useEffect, useState } from 'react';
import { fetchUserProfiles, loginUser } from '../../redux/actions';
import { useSelector } from 'react-redux';
import { setIsLoggedIn } from '../../redux/authReducers';
const SignIn: React.FC = () => {

  const userData = useSelector((state: RootState) => state.user.data);
    const userDataArray = userData ? Object.values(userData) : [];
    const fetchData = () => {
        dispatch(fetchUserProfiles());
    };
    // console.log(userDataArray)
    useEffect(() => {
        fetchData();
    }, []);
  
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  /* eslint-disable no-template-curly-in-string */
  const validateMessages = {
    required: 'Vui lòng nhập trường ${label}',
    types: {
      email: 'Vui lòng nhập trường ${label}',
      number: 'Vui lòng nhập trường ${label}',
    }
  };
  /* eslint-enable no-template-curly-in-string */

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [showAlertEr, setShowAlertEr] = useState(false);
  const onFinish = async (values: { email: string; password: string }) => {
    setIsLoading(true);
    try {
      const { email, password } = values;
      const user = await dispatch(loginUser({ email, password }));
      if (user.payload) {
        dispatch(setIsLoggedIn(true));
        // localStorage.setItem('user', JSON.stringify(user.payload));
        if (userDataArray[4] === 'ADMIN') {
          navigate('/admin/user');
        } 
        else if(userDataArray[4] === 'STAFF'){
          navigate('/staff/seestaff');
        }
        else {
          // Hiển thị thông báo đăng nhập thành công
          // alert('Đăng nhập thành công!');
          setShowAlert(true);
          setTimeout(() => {
              setShowAlert(false);
          }, 2000);
        }
      } else {
        // Hiển thị thông báo đăng nhập thất bại
        // alert('Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin đăng nhập.');
        setShowAlertEr(true);
          setTimeout(() => {
              setShowAlertEr(false);
          }, 2000);
      }
    } catch (error) {
      // Handle login error
      alert('Đã xảy ra lỗi. Vui lòng thử lại sau.');
    } finally {
      setIsLoading(false);
    }
  };
  // const onFinish = async (values: { email: string; password: string }) => {
  //   setIsLoading(true);
  //   try {
  //     const { email, password } = values;
  //     const user = await dispatch(loginUser({ email, password }));
  //     dispatch(setIsLoggedIn(true));
  //     // localStorage.setItem('user', JSON.stringify(user));
  //     if(userDataArray[4]==='ADMIN'){
  //         navigate('/admin');
  //     }
      
  //   } catch (error) {
  //     // Handle login error
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  return (
    <div >
      <div
        style={{
          width: '400px',
          height: '370px',
          border: '1px solid black',
          backgroundColor: '#fff',
          position: 'relative',
          zIndex: '99',
          marginLeft: '860px',
          marginTop: '-75px',
          display: 'flex',
          flexDirection: 'column',
          borderRadius: '10px',
          alignItems: 'center'
        }}>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <p style={{ textTransform: 'uppercase', fontSize: '20px', fontWeight: '600', marginBottom: '0px' }}>Đăng nhập tài khoản</p>
          <p style={{ textTransform: 'uppercase', fontSize: '20px', fontWeight: '600', marginTop: '0px' }}>your account</p>
        </div>
        <Form
          {...layout}
          name="nest-messages"
          onFinish={onFinish}
          style={{ maxWidth: 600, width: '400px', marginLeft: '-85px' }}
          validateMessages={validateMessages}
        >
          <Form.Item name={['email']} label="Email" rules={[{ required: true, type: 'email' }]} hasFeedback>
            <Input />
          </Form.Item>
          <Form.Item name={['password']} label="Password" rules={[{ required: true, max: 25 }]} hasFeedback>
            <Input.Password maxLength={25} />
          </Form.Item>
          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
            <Button type="primary" htmlType="submit" style={{backgroundColor:'#E82626',color:'#fff'}} loading={isLoading} >
              Đăng nhập
            </Button>
          </Form.Item>
        </Form>
        <div style={{ height: '40px', marginTop: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '0px', height: '20px' }}>
            <p>Khách hàng mới</p>
            <Link to='/signup'>Tạo tài khoản</Link>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginTop: '0px', height: '20px' }}>
            <p>Quên mật khẩu</p>
            <Link to=''>Khôi phục mật khẩu</Link>
          </div>
        </div>
        
      </div>
      {showAlert && (
                <Alert
                    message="Thành công"
                    description="Đăng nhập thành công"
                    type="success"
                    showIcon
                    style={{
                      textAlign: 'center',
                      position:'relative',
                      zIndex:'9999',
                      marginLeft:'500px',
                      marginTop:'-300px',
                      width:'500px',
                      height:'200px',
                      fontSize:'30px'
                    }}
                />
            )}
            {showAlertEr && (
                <Alert
                    message="Thất bại"
                    description="Tài khoản hoặc mật khẩu không chính xác."
                    type="error"
                    showIcon
                    style={{
                      textAlign: 'center',
                      position:'relative',
                      zIndex:'9999',
                      marginLeft:'500px',
                      marginTop:'-300px',
                      width:'500px',
                      height:'200px',
                      fontSize:'30px'
                    }}
                />
            )}
    </div>
  )
}
export default SignIn