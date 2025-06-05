import React from 'react';
import { Modal, Avatar, Typography, Descriptions, Button, Space } from 'antd';
import { UserOutlined, LaptopOutlined, RobotOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { DefaultAvatar } from '@app/assets/images';

const { Title, Paragraph } = Typography;

interface Experience {
  icon: 'fullstack' | string;
  title: string;
  years: number;
}

interface Advisor {
  name: string;
  avatar?: string;
  experience?: Experience[];
  bio?: string;
}

interface MentorDetailProps {
  isOpen: boolean;
  onClose: () => void;
  advisor?: Advisor;
  handleSubmit: () => void;
}

const MentorDetailModal = ({ isOpen, onClose, advisor, handleSubmit }: MentorDetailProps) => {
  const { name, avatar, experience, bio } = advisor || {};

  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      footer={null}
      centered
      width={500}
      title='Thông tin chi tiết cố vấn'
    >
      <div className='flex flex-col items-center text-center overflow-auto h-full'>
        <Avatar
          size={100}
          src={avatar || DefaultAvatar}
          icon={!avatar && <UserOutlined />}
          className='shadow-md'
        />

        <Title level={4} className='mt-4 mb-2'>
          {name}
        </Title>

        <Descriptions column={1} size='small' className='w-full mt-2'>
          <Title level={4} className='mt-4 mb-2 font-bold'>
            Lĩnh vực chuyên môn - Kinh nghiệm
          </Title>
          {experience?.map((item, idx) => (
            <Descriptions.Item
              key={idx}
              label={
                <span>
                  {item.icon === 'fullstack' ? <LaptopOutlined /> : <RobotOutlined />} {item.title}
                </span>
              }
            >
              {item.years} năm
            </Descriptions.Item>
          ))}
        </Descriptions>

        {/* Bio */}
        <Descriptions column={1} className='mt-4'>
          <Paragraph type='secondary' className='text-justify text-sm'>
            <InfoCircleOutlined className='mr-1' />
            {bio}
          </Paragraph>
        </Descriptions>

        {/* Buttons */}
        <Space className='mt-6'>
          <Button onClick={onClose}>Quay lại</Button>
          <Button type='primary' onClick={handleSubmit}>
            Đặt lịch cố vấn
          </Button>
        </Space>
      </div>
    </Modal>
  );
};

export default MentorDetailModal;
