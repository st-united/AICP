import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  BankOutlined,
  IdcardOutlined,
  SolutionOutlined,
} from '@ant-design/icons';
import { Button, Descriptions } from 'antd';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { getStorageData } from '@app/config';
import { EXAM_LATEST } from '@app/constants/testing';
import { useDownloadCertificate } from '@app/hooks/useExamSet';
import { RootState } from '@app/redux/store';
import {
  NotificationTypeEnum,
  openNotificationWithIcon,
} from '@app/services/notification/notificationService';

const ResultHeader = () => {
  const { t } = useTranslation();
  const examId = getStorageData(EXAM_LATEST);
  const { mutate: downloadCertificate } = useDownloadCertificate();
  const { user } = useSelector((state: RootState) => state.auth);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 600);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 450);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleDownloadCertificate = () => {
    downloadCertificate(examId, {
      onSuccess: (response) => {
        const disposition = response.headers['content-disposition'];
        let filename = 'certificate.pdf';
        if (disposition) {
          const match = disposition.match(/filename="?([^"]+)"?/);
          if (match) filename = match[1];
        }
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', filename);
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);
        openNotificationWithIcon(
          NotificationTypeEnum.SUCCESS,
          t('TEST_RESULT.DOWNLOAD_CERT_SUCCESS'),
        );
      },
      onError: () => {
        openNotificationWithIcon(NotificationTypeEnum.ERROR, t('TEST_RESULT.DOWNLOAD_CERT_ERROR'));
      },
    });
  };
  return (
    <div className='bg-white rounded-2xl shadow p-8'>
      <h2 className='text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-2 bg-gradient-to-r from-[#FF872BCF] to-[#FF4D08] bg-clip-text text-transparent'>
        {t('TEST_RESULT.CONGRATS')}
      </h2>
      <p className='text-center text-[#5B5B5B] text-xl font-bold italic mb-6'>
        {t('TEST_RESULT.SUBTITLE')}
      </p>
      <div className='flex justify-end mb-4'>
        <Button
          type='primary'
          className='rounded-full text-lg font-bold px-6 py-5'
          onClick={handleDownloadCertificate}
        >
          {t('TEST_RESULT.DOWNLOAD_CERT')}
        </Button>
      </div>
      <div className='border border-[#FE7743] rounded-xl p-4'>
        <Descriptions
          layout={isMobile ? 'vertical' : 'horizontal'}
          className='w-full text-lg font-semibold'
          column={{
            xs: 1,
            sm: 1,
            md: 2,
            lg: 3,
            xl: 3,
          }}
        >
          <Descriptions.Item
            label={
              <div className='flex items-center gap-1 text-[#686868] font-extrabold text-lg'>
                <UserOutlined className='text-[#686868] font-extrabold mb-[5px] text-lg' />
                {t('TEST_RESULT.FULLNAME')}
              </div>
            }
            span={1}
          >
            <span className='text-[#686868] font-semibold text-lg'>{user?.fullName}</span>
          </Descriptions.Item>
          <Descriptions.Item
            label={
              <div className='flex items-center gap-1 text-[#686868] font-extrabold text-lg'>
                <MailOutlined className='text-[#686868] font-extrabold mb-[5px] text-lg' />
                {t('TEST_RESULT.EMAIL')}
              </div>
            }
            span={1}
          >
            <span className='text-[#686868] font-semibold text-lg'>{user?.email}</span>
          </Descriptions.Item>
          <Descriptions.Item
            label={
              <div className='flex items-center gap-1 text-[#686868] font-extrabold text-lg'>
                <PhoneOutlined className='text-[#686868] font-extrabold mb-[5px] text-lg' />
                {t('TEST_RESULT.PHONE')}
              </div>
            }
            span={1}
          >
            <span className='text-[#686868] font-semibold text-lg'>{user?.phoneNumber}</span>
          </Descriptions.Item>
          <Descriptions.Item
            label={
              <div className='flex items-center gap-1 text-[#686868] font-extrabold text-lg'>
                <SolutionOutlined className='text-[#686868] font-extrabold mb-[5px] text-lg' />
                {t('TEST_RESULT.ROLE')}
              </div>
            }
            span={1}
          >
            <span className='text-[#686868] font-semibold text-lg'>
              {user?.isStudent ? t('USER.STUDENT') : t('USER.WORKER')}
            </span>
          </Descriptions.Item>
          <Descriptions.Item
            label={
              <div className='flex items-center gap-1 text-[#686868] font-extrabold text-lg'>
                <BankOutlined className='text-[#686868] font-extrabold mb-[5px] text-lg' />
                {t('TEST_RESULT.SCHOOL')}
              </div>
            }
            span={1}
          >
            <span className='text-[#686868] font-semibold text-lg'>{user?.university}</span>
          </Descriptions.Item>
          <Descriptions.Item
            label={
              <div className='flex items-center gap-1 text-[#686868] font-extrabold text-lg'>
                <IdcardOutlined className='text-[#686868] font-extrabold mb-[5px] text-lg' />
                {t('TEST_RESULT.STUDENT_ID')}
              </div>
            }
            span={1}
          >
            <span className='text-[#686868] font-semibold text-lg'>{user?.studentCode}</span>
          </Descriptions.Item>
        </Descriptions>
      </div>
    </div>
  );
};

export default ResultHeader;
