import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  BankOutlined,
  IdcardOutlined,
  SolutionOutlined,
} from '@ant-design/icons';
import { Button, Descriptions } from 'antd';
import { useTranslation } from 'react-i18next';

import { getStorageData } from '@app/config';
import { EXAM_LATEST } from '@app/constants/testing';
import { useDownloadCertificate } from '@app/hooks/useExamSet';
import {
  NotificationTypeEnum,
  openNotificationWithIcon,
} from '@app/services/notification/notificationService';

const ResultHeader = () => {
  const { t } = useTranslation();
  const examId = getStorageData(EXAM_LATEST);
  const { mutate: downloadCertificate } = useDownloadCertificate();

  const handleDownloadCertificate = () => {
    downloadCertificate(examId, {
      onSuccess: (response) => {
        const disposition = response.headers['content-disposition'];
        let filename = 'certificate.pdf';
        if (disposition) {
          const match = disposition.match(/filename="?([^"]+)"?/);
          if (match) filename = match[1];
        }

        // Tạo URL và trigger download
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', filename);
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);
        openNotificationWithIcon(NotificationTypeEnum.SUCCESS, 'Tải chứng chỉ thành công');
      },
      onError: () => {
        openNotificationWithIcon(NotificationTypeEnum.ERROR, 'Tải chứng chỉ thất bại');
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
          layout='horizontal'
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
              <div className='flex items-center gap-1 text-[#686868] font-extrabold'>
                <UserOutlined className='text-[#686868] font-extrabold mb-[5px]' />
                {t('TEST_RESULT.FULLNAME')}
              </div>
            }
            span={1}
          >
            <span className='text-[#686868] font-semibold'>Ngọc Nhi</span>
          </Descriptions.Item>
          <Descriptions.Item
            label={
              <div className='flex items-center gap-1 text-[#686868] font-extrabold'>
                <MailOutlined className='text-[#686868] font-extrabold mb-[5px]' />
                {t('TEST_RESULT.EMAIL')}
              </div>
            }
            span={1}
          >
            <span className='text-[#686868] font-semibold'>ngocnhi.nguyen@gmail.com</span>
          </Descriptions.Item>
          <Descriptions.Item
            label={
              <div className='flex items-center gap-1 text-[#686868] font-extrabold'>
                <PhoneOutlined className='text-[#686868] font-extrabold mb-[5px]' />
                {t('TEST_RESULT.PHONE')}
              </div>
            }
            span={1}
          >
            <span className='text-[#686868] font-semibold'>0386125801</span>
          </Descriptions.Item>
          <Descriptions.Item
            label={
              <div className='flex items-center gap-1 text-[#686868] font-extrabold'>
                <SolutionOutlined className='text-[#686868] font-extrabold mb-[5px]' />
                {t('TEST_RESULT.ROLE')}
              </div>
            }
            span={1}
          >
            <span className='text-[#686868] font-semibold'>Học sinh</span>
          </Descriptions.Item>
          <Descriptions.Item
            label={
              <div className='flex items-center gap-1 text-[#686868] font-extrabold'>
                <BankOutlined className='text-[#686868] font-extrabold mb-[5px]' />
                {t('TEST_RESULT.SCHOOL')}
              </div>
            }
            span={1}
          >
            <span className='text-[#686868] font-semibold'>example</span>
          </Descriptions.Item>
          <Descriptions.Item
            label={
              <div className='flex items-center gap-1 text-[#686868] font-extrabold'>
                <IdcardOutlined className='text-[#686868] font-extrabold mb-[5px]' />
                {t('TEST_RESULT.STUDENT_ID')}
              </div>
            }
            span={1}
          >
            <span className='text-[#686868] font-semibold'>221121521222</span>
          </Descriptions.Item>
        </Descriptions>
      </div>
    </div>
  );
};

export default ResultHeader;
