import { Alert, Button, Form, Input, Radio } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../redux/store';
import { useState } from 'react';
import { createUser } from '../../redux/actions';

const SignUp: React.FC = () => {
    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    };

    /* eslint-disable no-template-curly-in-string */
    const validateMessages = {
        required: 'Vui lòng nhập trường ${label}',
        types: {
        }
    };
    /* eslint-enable no-template-curly-in-string */
    const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const onFinish = async (values: { email: string; password: string; userName: string; sex: string; address: string }) => {
    setIsLoading(true);
    try {
      const { email, password, userName, sex, address } = values;
      const response=await dispatch(createUser({ email, password, userName, sex, address }));
      if (response.payload) {
        alert('Đăng ký thành công');
        navigate('/');
        // window.location.reload();
    } else {
        
        setShowAlert(true);
          setTimeout(() => {
              setShowAlert(false);
          }, 2000);
    }
    //   navigate('/');
    } catch (error) {
      // Handle login error
      alert('Tạo tài khoản thất bại');
    } finally {
      setIsLoading(false);
    }
  };
    return (
        <div >
            <div
                style={{
                    width: '400px',
                    height: '450px',
                    border: '1px solid black',
                    backgroundColor: '#fff',
                    position: 'relative',
                    zIndex: '99',
                    marginLeft: '560px',
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius:'10px',
                    alignItems: 'center'
                }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <p style={{ textTransform: 'uppercase', fontSize: '20px', fontWeight: '600', marginBottom: '30px' }}>Tạo tài khoản</p>
                </div>
                <div style={{ width: '250px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '30px' }}>
                    <Form
                        {...layout}
                        name="nest-messages"
                        onFinish={onFinish}
                        style={{ maxWidth: 600, width: '400px', marginLeft: '-85px' }}
                        validateMessages={validateMessages}
                    >
                        <Form.Item name={['userName']} label="Tên" rules={[{ required: true, max: 25 }]} hasFeedback>
                            <Input maxLength={25} />
                        </Form.Item>
                        <Form.Item name={['password']} label="Mật khẩu" rules={[{ required: true, max: 25 }]} hasFeedback>
                            <Input maxLength={25} />
                        </Form.Item>
                        <Form.Item name={['email']} label="Email" rules={[{ required: true, type: 'email' }]} hasFeedback>
                            <Input />
                        </Form.Item>
                        <Form.Item label="Giới tính" style={{marginLeft:'18px'}} name={['sex']}  rules={[{ required: true }]} hasFeedback>
                            <Radio.Group>
                                <Radio value="Nam"> Nam </Radio>
                                <Radio value="Nữ"> Nữ </Radio>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item name={['address']} label="Địa chỉ" rules={[{ required: true, max: 25 }]} hasFeedback>
                            <Input maxLength={25} />
                        </Form.Item>
                        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                            <Button type="primary" htmlType="submit" style={{ backgroundColor: '#E82626', color: '#fff' }} loading={isLoading}>
                                Đăng ký
                            </Button>
                        </Form.Item>
                    </Form>
                    
                </div>
                {showAlert && (
                <Alert
                    message="Thông báo"
                    description="Email đã tồn tại"
                    type="error"
                    showIcon
                    style={{
                      textAlign: 'center',
                      position:'relative',
                      zIndex:'9999',
                      marginTop:'-500px',
                      width:'500px',
                      height:'200px',
                      fontSize:'30px'
                    }}
                />
            )}

            </div>
            
        </div>
    )
}
export default SignUp