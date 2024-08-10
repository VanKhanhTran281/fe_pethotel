import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Radio, Select } from 'antd';
import { useAppDispatch } from '../../../redux/store';
import { updateUser } from '../../../redux/actions';

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
  handleEditClick: (record: UserData) => void;
  onUpdate: (updateRoom: UserData) => void;
  valueUd: UserData | null;
}

const UpdateForm: React.FC<ChildComponentProps> = ({ onUpdate,handleEditClick, valueUd }) => {
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (valueUd) {
      form.setFieldsValue(valueUd);
    }
  }, [form, valueUd,valueUd?.userId]);
const onFinish = async (values: UserData) => {
  setIsLoading(true);
  try {
    await dispatch(
      updateUser({
        ...values,
        userId: valueUd?.userId,
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
    <div style={{ backgroundColor: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '-300px', width: '600px', height: '500px', border: '2px solid black', zIndex: 100, position: 'fixed', transform: 'translate(40%, -35%)', borderRadius: '10px' }}>
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
        <Form.Item name={['userName']} label="Tên" rules={[{ required: true, max: 25 }]} hasFeedback>
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
                        <Form.Item label="Role" name={['role']} rules={[{ required: true, max: 25 }]} hasFeedback>
          <Select>
            <Select.Option value="USER">USER</Select.Option>
            <Select.Option value="ADMIN">ADMIN</Select.Option>
            <Select.Option value="STAFF">STAFF</Select.Option>
          </Select>
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