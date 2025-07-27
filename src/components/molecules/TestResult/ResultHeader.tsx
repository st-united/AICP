import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  BankOutlined,
  IdcardOutlined,
  SolutionOutlined,
  DownloadOutlined,
} from '@ant-design/icons';
import { Button } from 'antd';
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
  // const { mutate: downloadCertificate } = useDownloadCertificate();
  const { user } = useSelector((state: RootState) => state.auth);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // const handleDownloadCertificate = () => {
  //   downloadCertificate(examId, {
  //     onSuccess: (response) => {
  //       const disposition = response.headers['content-disposition'];
  //       let filename = 'certificate.pdf';
  //       if (disposition) {
  //         const match = disposition.match(/filename="?([^"]+)"?/);
  //         if (match) filename = match[1];
  //       }

  //       const url = window.URL.createObjectURL(new Blob([response.data]));
  //       const link = document.createElement('a');
  //       link.href = url;
  //       link.setAttribute('download', filename);
  //       document.body.appendChild(link);
  //       link.click();
  //       link.remove();
  //       window.URL.revokeObjectURL(url);
  //       openNotificationWithIcon(
  //         NotificationTypeEnum.SUCCESS,
  //         t('TEST_RESULT.DOWNLOAD_CERT_SUCCESS'),
  //       );
  //     },
  //     onError: () => {
  //       openNotificationWithIcon(NotificationTypeEnum.ERROR, t('TEST_RESULT.DOWNLOAD_CERT_ERROR'));
  //     },
  //   });
  // };

  const InfoItem = ({
    icon,
    label,
    value,
  }: {
    icon: React.ReactNode;
    label: string;
    value: string;
  }) => (
    <div className='flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 p-4 sm:p-5 bg-gray-50/80 rounded-lg border border-gray-200/50 hover:bg-gray-100/50 transition-colors duration-200'>
      <div className='flex items-center gap-2 text-[#686868] font-semibold text-sm sm:text-base lg:text-lg min-w-0 sm:min-w-[160px] lg:min-w-[180px]'>
        {icon}
        <span className='truncate'>{label}:</span>
      </div>
      <div className='text-[#4a4a4a] font-medium text-sm sm:text-base lg:text-lg break-words flex-1'>
        {value}
      </div>
    </div>
  );

  return (
    <div className='bg-white rounded-xl md:rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6 lg:p-8 xl:p-10 space-y-6 lg:space-y-8'>
      {/* Header Section */}
      <div className='text-center space-y-3 lg:space-y-4'>
        <h2 className='text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold bg-gradient-to-r from-[#FF872BCF] to-[#FF4D08] bg-clip-text text-transparent leading-tight px-2'>
          {t('TEST_RESULT.CONGRATS')}
        </h2>
        <p className='text-[#5B5B5B] text-sm sm:text-base md:text-lg lg:text-xl font-semibold italic px-2 max-w-4xl mx-auto'>
          {t('TEST_RESULT.SUBTITLE')}
        </p>
      </div>

      {/* Download Button
      <div className='flex justify-center'>
        <Button
          type='primary'
          icon={<DownloadOutlined className='text-base lg:text-lg' />}
          className='w-full sm:w-auto h-12 lg:h-14 rounded-full text-sm sm:text-base lg:text-lg font-bold px-6 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-5 flex items-center justify-center gap-2 lg:gap-3 !bg-gradient-to-r !from-[#FF872B] !to-[#FF4D08] !border-none hover:!opacity-90 hover:!scale-105 transition-all duration-300 shadow-lg hover:shadow-xl'
          onClick={handleDownloadCertificate}
        >
          {t('TEST_RESULT.DOWNLOAD_CERT')}
        </Button>
      </div> */}

      {/* User Information */}
      <div className='border-2 border-[#FE7743] rounded-xl lg:rounded-2xl p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-orange-50/70 to-white shadow-inner'>
        <div className='space-y-3 sm:space-y-4 lg:space-y-5'>
          <InfoItem
            icon={<UserOutlined className='text-lg lg:text-xl text-[#FF872B]' />}
            label={t('TEST_RESULT.FULLNAME')}
            value={user?.fullName || ''}
          />

          <InfoItem
            icon={<MailOutlined className='text-lg lg:text-xl text-[#FF872B]' />}
            label={t('TEST_RESULT.EMAIL')}
            value={user?.email || ''}
          />

          <InfoItem
            icon={<PhoneOutlined className='text-lg lg:text-xl text-[#FF872B]' />}
            label={t('TEST_RESULT.PHONE')}
            value={user?.phoneNumber || ''}
          />
        </div>
      </div>
    </div>
  );
};

export default ResultHeader;
