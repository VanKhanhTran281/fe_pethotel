import React, { useState } from 'react';
import {
  Button,
  Form,
  Input,
  Radio,
} from 'antd';
import { useAppDispatch } from '../../../redux/store';
import { createStaff } from '../../../redux/actions';

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
interface ComponentProps {
  onClick: () => void;
  onCreateStaff: () => void;
}
const CreateForm: React.FC<ComponentProps> = ({ onClick, onCreateStaff }) => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const onFinish = async (values: 
    { staffName: string;
      sex: string;
      address: string;
      phoneNumber: string;}) => {
    setIsLoading(true);
    try {
      const { staffName,sex,address,phoneNumber} = values;
      await dispatch(createStaff({ staffName,sex,address,phoneNumber}));
      onClick()
      window.location.reload();
    } catch (error) {
      // Handle login error
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div style={{ backgroundColor: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '600px', height: '400px', border: '2px solid black', zIndex: 100, position: 'fixed', transform: 'translate(40%, -35%)', borderRadius: '10px' }}>
      <p style={{ fontSize: '20px', fontWeight: '700', marginLeft: '' }}>THÊM MỚI</p>
      <Form
        {...layout}
        name="nest-messages"
        onFinish={onFinish}
        style={{ maxWidth: 600, width: '400px', marginLeft: '-85px' }}
        validateMessages={validateMessages}
      >
        <Form.Item name={['staffName']} label="Tên nhân viên" rules={[{ required: true, max: 25 }]} hasFeedback>
          <Input maxLength={25} />
        </Form.Item>
        <Form.Item label="Giới tính" style={{ marginLeft: '18px' }} name={['sex']} rules={[{ required: true }]} hasFeedback>
          <Radio.Group>
            <Radio value="Nam"> Nam </Radio>
            <Radio value="Nữ"> Nữ </Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item name={['address']} label="Địa chỉ" rules={[{ required: true, max: 25 }]} hasFeedback>
          <Input maxLength={10} />
        </Form.Item>
        <Form.Item
          name={['phoneNumber']}
          label="Số điện thoại"
          rules={[
            { required: true },
            { pattern: /^[0-9]*$/, message: 'Vui lòng nhập số' },
          ]} hasFeedback
        >
          <Input maxLength={10} />
        </Form.Item>
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button type="primary" htmlType="submit"  loading={isLoading}>
            Thêm
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
};

export default CreateForm;
