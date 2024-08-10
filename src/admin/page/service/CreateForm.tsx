import React, { useState } from 'react';
import {
  Button,
  Form,
  Input,
  InputNumber,
} from 'antd';
import { useAppDispatch } from '../../../redux/store';
import { createService } from '../../../redux/actions';
import { toast } from 'react-toastify';

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
  onCreateService: () => void;
}
const CreateForm: React.FC<ComponentProps> = ({ onClick, onCreateService }) => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const onFinish = async (values: 
    { nameService: string;
      price: number;
      describe: string;}) => {
    setIsLoading(true);
    try {
      const { nameService,price,describe} = values;
      await dispatch(createService({ nameService,price,describe }));
      onClick()
      window.location.reload();
      
    } catch (error) {
      
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div style={{ backgroundColor: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '600px', height: '300px', border: '2px solid black', zIndex: 100, position: 'fixed', transform: 'translate(40%, -35%)', borderRadius: '10px' }}>
      <p style={{ fontSize: '20px', fontWeight: '700', marginLeft: '' }}>THÊM MỚI</p>
      <Form
        {...layout}
        name="nest-messages"
        onFinish={onFinish}
        style={{ maxWidth: 600, width: '400px', marginLeft: '-85px' }}
        validateMessages={validateMessages}
      >
        <Form.Item name={['nameService']} label="Tên dịch vụ" rules={[{ required: true, max: 25 }]} hasFeedback>
          <Input maxLength={25} />
        </Form.Item>
        <Form.Item name={['price']} label="Giá" rules={[
          { required: true },
          { type: 'number', min: 0 }
        ]} hasFeedback>
          <InputNumber min={0} type='interger' />
        </Form.Item>
        <Form.Item name={['describe']} label="Mô tả" rules={[{ required: true }]} hasFeedback>
          <Input  />
        </Form.Item>
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button type="primary" htmlType="submit" loading={isLoading}>
            Thêm
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
};

export default CreateForm;
