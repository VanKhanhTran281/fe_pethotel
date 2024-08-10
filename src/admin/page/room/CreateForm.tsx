import React, { useState } from 'react';
import {
  Button,
  Form,
  Input,
  InputNumber,
  Select,
  Upload,
  UploadFile,
  UploadProps,
 
} from 'antd';
import { useAppDispatch } from '../../../redux/store';
import { createRoom } from '../../../redux/actions';



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
  onCreateRoom: () => void;
}
const CreateForm: React.FC<ComponentProps> = ({ onClick, onCreateRoom }) => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const handleUpload: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };
  const onFinish =  async (values: RoomAddData) => {
    setIsLoading(true);
    try {
      const { roomNumber,
        roomType,
        size,
        describe,
        img,
        price,
        discount,
        condition } = values;
      const formData = new FormData();
      formData.append('roomNumber', roomNumber.toString());
      formData.append('roomType', roomType.toString());
      formData.append('size', size.toString());
      formData.append('describe', describe.toString());
      formData.append('img',fileList?.[0].originFileObj as File );
      formData.append('price', price.toString());
      formData.append('discount', discount.toString());
      formData.append('condition', condition.toString());
  
      await dispatch(createRoom(formData));
      // console.log(fileList);
      onClick();
      window.location.reload();
    } catch (error) {
      // Handle login error
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div style={{ backgroundColor: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '600px', height: '700px', border: '2px solid black', zIndex: 100, position: 'fixed', transform: 'translate(40%, -35%)', borderRadius: '10px' }}>
      <p style={{ fontSize: '20px', fontWeight: '700', marginLeft: '' }}>THÊM MỚI</p>
      <Form
        {...layout}
        name="nest-messages"
        onFinish={onFinish}
        style={{ maxWidth: 600, width: '400px', marginLeft: '-85px' }}
        validateMessages={validateMessages}
      >
        <Form.Item name={['roomNumber']} label="Số phòng" rules={[{ required: true, max: 25 }]} hasFeedback>
          <Input maxLength={25} />
        </Form.Item>
        <Form.Item name={['roomType']} label="Kiểu phòng" rules={[{ required: true, max: 25 }]} hasFeedback>
          <Select>
            <Select.Option value="DOG">DOG</Select.Option>
            <Select.Option value="CAT">CAT</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="Kích thước" name={['size']} rules={[{ required: true, max: 25 }]} hasFeedback>
          <Select>
            <Select.Option value="S">S</Select.Option>
            <Select.Option value="M">M</Select.Option>
            <Select.Option value="L">L</Select.Option>
            <Select.Option value="XL">XL</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item name={['describe']} label="Mô tả" rules={[{ required: true}]} hasFeedback>
          <Input />
        </Form.Item>



        <Form.Item name={['img']} label="Ảnh" rules={[{ required: true }]} hasFeedback>
          <Upload
            listType="picture-card"
            fileList={fileList}
            onChange={handleUpload}
            maxCount={1}
            beforeUpload={() => false} // Disable default upload behavior
          >
            {fileList.length < 1 && '+ Upload'}
          </Upload>
        </Form.Item>
        {/* <Form.Item name={['img']} label="Ảnh" rules={[{ required: true }]} hasFeedback>
          <Input  />
        </Form.Item> */}
        <Form.Item name={['price']} label="Giá" rules={[
          { required: true },
          { type: 'number', min: 0 }
        ]} hasFeedback>
          <InputNumber min={0} type='interger' />
        </Form.Item>
        <Form.Item name={['discount']} label="Chiết khấu" rules={[
          { required: true },
          { type: 'number', min: 0 }
        ]} hasFeedback>
          <InputNumber min={0} type='interger' />
        </Form.Item>
        <Form.Item name={['condition']} label="Tình trạng" rules={[{ required: true, max: 25 }]} hasFeedback>
          <Input maxLength={25} />
        </Form.Item>
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }} >
          <Button type="primary" htmlType="submit" loading={isLoading} >
            Thêm
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
};

export default CreateForm;
