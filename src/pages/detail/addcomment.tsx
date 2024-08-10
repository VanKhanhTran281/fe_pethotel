import React, { useState } from 'react';
import {
  Alert,
  Button,
  Form,
  Input,
} from 'antd';
import { useAppDispatch } from '../../redux/store';
import { createComment } from '../../redux/actions';


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
const CreateComment: React.FC = () => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const onFinish = async (values:
    { content: string; }) => {
    setIsLoading(true);
    try {
      const { content } = values;
      await dispatch(createComment({ content }));
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 2000);
    } catch (error) {
      // Handle login error
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <div style={{
        backgroundColor: '#fff',
        marginLeft: '800px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '420px',
        height: '200px',
        border: '2px solid black',
        zIndex: 999, position: 'relative',
        transform: 'translate(40%, -25%)',
        borderRadius: '10px'
      }}
      >
        <p style={{ fontSize: '20px', fontWeight: '700', marginLeft: '' }}>Phản hồi</p>
        <Form
          {...layout}
          name="nest-messages"
          onFinish={onFinish}
          style={{ maxWidth: 600, width: '400px', marginLeft: '-65px' }}
          validateMessages={validateMessages}
        >
          <Form.Item name={['content']} label="Nội dung" rules={[{ required: true }]} hasFeedback>
            <Input />
          </Form.Item>
          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
            <Button type="primary" htmlType="submit" loading={isLoading}>
              Send
            </Button>
          </Form.Item>
        </Form>
      </div>
      {showAlert && (
        <Alert
          message="Thành công"
          description="Đã gửi phản hồi"
          type="success"
          showIcon
          style={{
            textAlign: 'center',
            position: 'relative',
            zIndex: '9999',
            marginLeft: '500px',
            marginTop: '-300px',
            width: '500px',
            height: '200px',
            fontSize: '30px'
          }}
        />
      )}
    </>
  )
};

export default CreateComment;
