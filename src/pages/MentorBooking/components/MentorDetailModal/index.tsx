import { CheckCircleOutlined } from '@ant-design/icons';
import { Typography } from 'antd';
import dayjs from 'dayjs';
import React from 'react';
import { Trans, useTranslation } from 'react-i18next';

import { DATE_TIME, getTimeRangeLabel } from '@app/constants';
import { InterviewRequest } from '@app/interface/mentor.interface';

const { Title, Paragraph } = Typography;

interface SuccessBookingProps {
  data: InterviewRequest;
}

const SuccessBooking: React.FC<SuccessBookingProps> = ({ data }) => {
  const { t } = useTranslation();

  return (
    <div className='flex flex-col items-center p-6 bg-gray-50 rounded-lg shadow-md'>
      <div className='w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-6'>
        <CheckCircleOutlined className='text-green-600 text-3xl' />
      </div>

      <Title level={4} className='text-center mb-4 text-gray-900'>
        Đặt lịch thành công!
      </Title>

      <Paragraph className='text-center text-gray-600 mb-6'>
        Chúng tôi đã nhận được đặt lịch của bạn. Vui lòng kiểm tra email để xem thông tin đặt lịch
        và cập nhật.
      </Paragraph>

      <div className='w-full md:w-1/2 bg-[#26990024] p-8 rounded-2xl mb-6 text-start'>
        <h3 className='text-lg font-bold text-gray-800 mb-2'>{t('MENTOR_BOOKING.INFO_TITLE')}</h3>
        <ul className='text-gray-700 list-disc list-inside'>
          <li>
            <Trans
              i18nKey='MENTOR_BOOKING.DATE'
              values={{
                date: dayjs(data?.interviewDate).locale('vi').format(DATE_TIME.YEAR_MONTH_DATE),
              }}
              components={{ bold: <span className='font-bold' /> }}
            />
          </li>
          <li>
            <Trans
              i18nKey='MENTOR_BOOKING.TIME'
              values={{
                time: getTimeRangeLabel(data?.timeSlot),
              }}
              components={{ bold: <span className='font-bold' /> }}
            />
          </li>
          <li>
            <Trans
              i18nKey='MENTOR_BOOKING.STATUS'
              values={{ status: t<string>('MENTOR_BOOKING.STATUS_BOOKED') }}
              components={{
                span: <span className='text-green-700 font-medium' />,
              }}
            />
          </li>
        </ul>
      </div>

      <Paragraph className='text-center text-sm text-gray-600'>
        Bạn có thể theo dõi lịch đặt lịch của bạn và cập nhật thông báo trực tiếp trên email hoặc
        ứng dụng.
      </Paragraph>
    </div>
  );
};

export default SuccessBooking;
