import {
  MinusOutlined,
  PlusOutlined,
  TikTokFilled,
  LinkedinFilled,
  FacebookFilled,
} from '@ant-design/icons';
import { Collapse } from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const FaqSection = () => {
  const [expanded, setExpanded] = useState<string>();
  const { t } = useTranslation();
  const faqs = t('HOMEPAGE.FAQ_QUESTIONS', { returnObjects: true }) as Array<{
    QUESTION: string;
    ANSWER: string;
  }>;
  const items = faqs.map((faq, index) => {
    const isActive = expanded === String(index);
    return {
      key: String(index),
      label: (
        <span className={`text-lg font-semibold ${isActive ? 'text-white' : 'text-[#444444]'}`}>
          {faq.QUESTION}
        </span>
      ),
      children: (
        <div className='faq-panel-content'>
          <p className={`mt-3 text-base font-normal ${isActive ? 'text-white' : 'text-[#6B6B6B]'}`}>
            {faq.ANSWER}
          </p>
        </div>
      ),
      className: `!rounded-xl !mb-2 border-none shadow-none ${
        isActive ? 'bg-[#FE7743]' : 'bg-[#FFE9E1]'
      }`,
    };
  });

  return (
    <div className='w-full h-full pt-8 mdM:pt-20 pb-20 bg-[#FFFBF9]'>
      <div className='container w-full h-full mx-auto xsM:w-[90%] smM:px-2 py-10'>
        <div className='text-primary font-bold text-center text-base sm:text-2xl mdM::text-3xl mdM:text-start mb-10 md:mb-20'>
          {t('HOMEPAGE.FAQ')}
        </div>
        <div className='grid grid-cols-1 smM:grid-cols-2 gap-12'>
          <div className='w-full flex flex-col items-center smM:items-start justify-start'>
            <h2 className='text-primary font-extrabold text-2xl sm:text-3xl md:text-4xl mdM:text-5xl mb-4'>
              {t('HOMEPAGE.FAQ_TITLE1')}
            </h2>
            <h2 className='text-primary font-extrabold text-2xl sm:text-3xl md:text-4xl mdM:text-5xl mb-8 text-center smM:text-start'>
              {t('HOMEPAGE.FAQ_TITLE2')}
            </h2>
            <p className='text-[#444444] text-center smM:text-start font-medium !leading-8 mb-8 text-lg mdL:text-3xl'>
              {t('HOMEPAGE.FAQ_CONTACT')}
            </p>
            <div className='flex gap-4'>
              <a
                href='https://www.facebook.com/'
                className='w-12 h-12 flex items-center justify-center rounded-[10px] bg-[#FE7743] hover:bg-[#FF9A5A] transition'
                title='Facebook'
                target='_blank'
                rel='noopener noreferrer'
              >
                <FacebookFilled className='text-white text-2xl' />
              </a>
              <a
                href='https://www.linkedin.com/'
                className='w-12 h-12 flex items-center justify-center rounded-[10px] bg-[#FE7743] hover:bg-[#FF9A5A] transition'
                title='Linkedin'
                target='_blank'
                rel='noopener noreferrer'
              >
                <LinkedinFilled className='text-white text-2xl' />
              </a>
              <a
                href='https://www.tiktok.com/'
                className='w-12 h-12 flex items-center justify-center rounded-[10px] bg-[#FE7743] hover:bg-[#FF9A5A] transition'
                title='TikTok'
                target='_blank'
                rel='noopener noreferrer'
              >
                <TikTokFilled className='text-white text-2xl' />
              </a>
            </div>
          </div>
          <div className='flex flex-col gap-3'>
            <Collapse
              accordion
              className='bg-transparent'
              expandIconPosition='end'
              bordered={false}
              expandIcon={({ isActive }) =>
                isActive ? (
                  <MinusOutlined className='!text-base !text-white' />
                ) : (
                  <PlusOutlined className='!text-base !text-black' />
                )
              }
              onChange={(val) => {
                if (Array.isArray(val)) {
                  setExpanded(val[0]);
                } else {
                  setExpanded(val as string | undefined);
                }
              }}
              items={items}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaqSection;
