import React, { useEffect, useState } from 'react';
import { Button, Form, Input, InputNumber } from 'antd';
import { useAppDispatch } from '../../../redux/store';
import { updateService } from '../../../redux/actions';

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
  handleEditClick: (record: ServiceData) => void;
  onUpdate: (updateRoom: ServiceData) => void;
  valueUd: ServiceData | null;
}

const UpdateForm: React.FC<ChildComponentProps> = ({ onUpdate,handleEditClick, valueUd }) => {
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (valueUd) {
      form.setFieldsValue(valueUd);
    }
  }, [form, valueUd,valueUd?.serviceId]);
const onFinish = async (values: ServiceData) => {
  setIsLoading(true);
  try {
    await dispatch(
      updateService({
        ...values,
        serviceId: valueUd?.serviceId,
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
    <div style={{ backgroundColor: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '-200px', width: '600px', height: '400px', border: '2px solid black', zIndex: 100, position: 'fixed', transform: 'translate(40%, -35%)', borderRadius: '10px' }}>
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
        <Form.Item name={['nameService']} label="Tên dịch vụ" rules={[{ required: true, max: 25 }]} hasFeedback>
          <Input maxLength={25} />
        </Form.Item>
        <Form.Item name={['price']} label="Giá" rules={[
          { required: true }
        ]} hasFeedback>
          <InputNumber min={0} />
        </Form.Item>
        <Form.Item name={['describe']} label="Mô tả" rules={[{ required: true}]} hasFeedback>
          <Input  />
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