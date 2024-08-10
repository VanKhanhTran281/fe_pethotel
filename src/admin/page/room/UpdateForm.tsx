import React, { useEffect, useState } from 'react';
import { Button, Form, Input, InputNumber, Select } from 'antd';
import { useAppDispatch } from '../../../redux/store';
import { updateRoom } from '../../../redux/actions';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
  required: 'Vui lòng nhập trường ${label}',
  types: {
    number: '${label} không đúng định dạng',
  },
};

interface ChildComponentProps {
  handleEditClick: (record: RoomData) => void;
  onUpdate: (updateRoom: RoomData) => void;
  valueUd: RoomData | null;
}

const UpdateForm: React.FC<ChildComponentProps> = ({ onUpdate,handleEditClick, valueUd }) => {
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (valueUd) {
      form.setFieldsValue(valueUd);
    }
  }, [form, valueUd,valueUd?.roomId]);
const onFinish = async (values: RoomData) => {
  setIsLoading(true);
  try {
    await dispatch(
      updateRoom({
        ...values,
        roomId: valueUd?.roomId,
      })
    );
    valueUd && handleEditClick(valueUd)
    onUpdate(values);
  } catch (error) {
    console.error(error);
  } finally {
    setIsLoading(false);
  }
};

  return (
    <div style={{ backgroundColor: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '-900px', width: '600px', height: '600px', border: '2px solid black', zIndex: 100, position: 'fixed', transform: 'translate(40%, -35%)', borderRadius: '10px' }}>
      <p style={{ fontSize: '20px', fontWeight: '700', marginLeft: '' }}>CHỈNH SỬA</p>
      <Form
        {...layout}
        name="nest-messages"
        onFinish={onFinish}
        
        style={{ maxWidth: 600, width: '400px', marginLeft: '-85px' }}
        validateMessages={validateMessages}
        form={form}
        initialValues={valueUd || {}}
      >
        <Form.Item name="roomNumber" label="Số phòng" rules={[{ required: true, max: 25 }]} hasFeedback>
          <Input maxLength={25} />
        </Form.Item>
        <Form.Item name="roomType" label="Kiểu phòng" rules={[{ required: true, max: 25 }]} hasFeedback>
          <Select>
            <Select.Option value="DOG">DOG</Select.Option>
            <Select.Option value="CAT">CAT</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="Kích thước" name="size" rules={[{ required: true, max: 25 }]} hasFeedback>
          <Select>
            <Select.Option value="S">S</Select.Option>
            <Select.Option value="M">M</Select.Option>
            <Select.Option value="L">L</Select.Option>
            <Select.Option value="XL">XL</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item name="describe" label="Mô tả" rules={[{ required: true }]} hasFeedback>
          <Input  />
        </Form.Item>
        <Form.Item name="img" label="Ảnh" rules={[{ required: true }]} hasFeedback>
          <Input />
        </Form.Item>
        <Form.Item name="price" label="Giá" rules={[{ required: true }]} hasFeedback>
          <InputNumber min={0} />
        </Form.Item>
        <Form.Item name="discount" label="Chiết khấu" rules={[{ required: true }]} hasFeedback>
          <InputNumber min={0}  />
        </Form.Item>
        <Form.Item name="condition" label="Tình trạng" rules={[{ required: true, max: 25 }]} hasFeedback>
          <Input maxLength={25} />
        </Form.Item>
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button type="primary" htmlType="submit" loading={isLoading}>
            Lưu
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default UpdateForm;