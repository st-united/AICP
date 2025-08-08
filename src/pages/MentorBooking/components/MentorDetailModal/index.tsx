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
    <div
      className='
        flex flex-col items-center justify-center
        p-6 mx-auto w-full
        xs:min-h-[70vh]
        md:min-h-[80vh] md:p-10
        lg:p-12
      '
    >
      {/* Icon */}
      <div
        className='
          w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-6
          sm:w-20 sm:h-20
        '
      >
        <CheckCircleOutlined className='text-green-600 text-3xl sm:text-4xl' />
      </div>

      {/* Title */}
      <Title
        level={4}
        className='
          text-center mb-4 text-gray-900
          sm:text-xl md:text-2xl lg:text-3xl
        '
      >
        {t('MENTOR_BOOKING.SUCCESS_TITLE')}
      </Title>

      {/* Paragraph intro */}
      <Paragraph
        className='
          text-center text-gray-600 mb-6
          sm:text-base md:text-lg lg:text-xl
        '
      >
        {t('MENTOR_BOOKING.SUCCESS_MESSAGE')}
      </Paragraph>

      {/* Info box */}
      <div
        className='
          w-full bg-[#26990024]
          p-6 md:p-8 rounded-2xl mb-6 text-start
        '
      >
        <h3 className='text-lg md:text-xl font-bold text-gray-800 mb-2'>
          {t('MENTOR_BOOKING.INFO_TITLE')}
        </h3>
        <ul className='text-gray-700 list-disc list-inside space-y-1'>
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
              values={{
                status: t<string>('MENTOR_BOOKING.STATUS_BOOKED'),
              }}
              components={{
                span: <span className='text-green-700 font-medium' />,
              }}
            />
          </li>
        </ul>
      </div>

      {/* Footer note */}
      <Paragraph
        className='
          text-center text-sm text-gray-600
          sm:text-base md:text-lg
        '
      >
        {t('MENTOR_BOOKING.SUCCESS_NOTE')}
      </Paragraph>
    </div>
  );
};

export default SuccessBooking;
