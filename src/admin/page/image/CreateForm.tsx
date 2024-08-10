import React, { useEffect, useState } from 'react';
import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  message,
  Select,
  Upload,
  UploadFile,
  UploadProps,

} from 'antd';
import { RootState, useAppDispatch } from '../../../redux/store';
import { createImage, createRoom, fetchRoom } from '../../../redux/actions';
import { useSelector } from 'react-redux';
import { PlusOutlined } from '@ant-design/icons';



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
  const roomData = useSelector((state: RootState) => state.room.data);
  const roomDataArray = roomData ? Object.values(roomData) : [];
  const fetchData = () => {
    dispatch(fetchRoom());
  };

  useEffect(() => {
    fetchData();
  }, []);
  const [isLoading, setIsLoading] = useState(false);
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const handleUpload: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const onFinish = async (values: ImageAddData) => {
    setIsLoading(true);
    try {
      const { date, imgUrl, roomId } = values;
      const formData = new FormData();
      formData.append('date', date.toISOString());
      formData.append('imgUrl',fileList?.[0].originFileObj as File );
      formData.append('roomId', roomId.toString());
  
      await dispatch(createImage(formData));
      console.log(fileList);
      onClick();
      window.location.reload();
    } catch (error) {
      console.error('Error creating image:', error);
      message.error('Failed to create image. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div style={{ backgroundColor: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '600px', height: '600px', border: '2px solid black', zIndex: 100, position: 'fixed', transform: 'translate(40%, -35%)', borderRadius: '10px' }}>
      <p style={{ fontSize: '20px', fontWeight: '700', marginLeft: '' }}>THÊM MỚI</p>
      <Form
        {...layout}
        name="nest-messages"
        onFinish={onFinish}
        style={{ maxWidth: 600, width: '400px', marginLeft: '-85px' }}
        validateMessages={validateMessages}
      >
        <Form.Item name={['date']} label="Ngày" rules={[{ required: true }]} hasFeedback>
          <DatePicker format="YYYY-MM-DD" />
        </Form.Item>



        <Form.Item name={['imgUrl']} label="Ảnh" rules={[{ required: true }]} hasFeedback>
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




        <Form.Item name={['roomId']} label="Mã phòng" rules={[{ required: true }]} hasFeedback>
          <Select>
            {roomDataArray && roomDataArray?.length > 0 && roomDataArray?.map((room) => (
              <Select.Option key={room.roomId} value={room.roomId}>
                {room.roomNumber}
              </Select.Option>
            ))}
          </Select>
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
