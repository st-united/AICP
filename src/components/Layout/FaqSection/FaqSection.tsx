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
  return (
    <div className='w-full lg:h-screen py-16 bg-[#FFFBF9]'>
      <div className='container text-[#FF7A00] text-center font-bold text-base sm:text-xl md:text-start mb-10 md:mb-20 mx-auto'>
        {t('HOMEPAGE.FAQ')}
      </div>
      <div className='mx-4 md:container md:mx-auto grid grid-cols-1 md:grid-cols-2 gap-12'>
        <div className='w-full flex flex-col items-center md:items-start justify-start'>
          <h2 className='text-2xl md:text-4xl font-bold text-[#FE7743] mb-4 text-center md:text-left'>
            {t('HOMEPAGE.FAQ_TITLE1')}
          </h2>
          <h2 className='text-2xl md:text-4xl font-bold text-[#FE7743] mb-8 text-center md:text-left'>
            {t('HOMEPAGE.FAQ_TITLE2')}
          </h2>
          <p className='text-[#444444] mb-8 text-xl md:text-2xl text-center md:text-left font-medium'>
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
                <MinusOutlined className='!text-base text-white' />
              ) : (
                <PlusOutlined className='!text-base text-[#444444]' />
              )
            }
            onChange={(val) => setExpanded(val as string)}
          >
            {Array.isArray(faqs) &&
              faqs.map((faq, index) => {
                const isActive = expanded === String(index);
                return (
                  <Collapse.Panel
                    header={
                      <span
                        className={`text-lg font-semibold ${
                          isActive ? 'text-white' : 'text-[#444444]'
                        }`}
                      >
                        {faq.QUESTION}
                      </span>
                    }
                    key={index}
                    className={`!rounded-xl !mb-2 border-none shadow-none ${
                      isActive ? 'bg-[#FE7743]' : 'bg-[#FFE9E1]'
                    }`}
                    extra={null}
                  >
                    <div className='faq-panel-content'>
                      <p
                        className={`mt-3 text-base font-normal ${
                          isActive ? 'text-white' : 'text-[#6B6B6B]'
                        }`}
                      >
                        {faq.ANSWER}
                      </p>
                    </div>
                  </Collapse.Panel>
                );
              })}
          </Collapse>
        </div>
      </div>
    </div>
  );
};

export default FaqSection;
