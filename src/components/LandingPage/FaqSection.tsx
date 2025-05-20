import { TikTokFilled, LinkedinFilled, FacebookFilled } from '@ant-design/icons';
import { Collapse } from 'antd';
import { MinusIcon, PlusIcon } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const FaqSection = () => {
  const [expanded, setExpanded] = useState<string>();
  const { t } = useTranslation();
  const faqs = t('HOMEPAGE.FAQ_QUESTIONS', { returnObjects: true }) as Array<{
    QUESTION: string;
    ANSWER: string;
  }>;
  return (
    <div className='container'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-12 py-32 bg-inherit'>
        {/* LEFT SIDE */}
        <div className='justify-center md:justify-start flex flex-col items-center md:items-start'>
          <p className='text-[#FF7A00] font-semibold mb-2 text-lg md:text-xl'>FAQ</p>
          <h2 className='text-3xl md:text-4xl font-bold text-[#FE7743] mb-4'>
            {t('HOMEPAGE.FAQ_TITLE1')}
          </h2>
          <h2 className='text-3xl md:text-4xl font-bold text-[#FE7743] mb-4'>
            {t('HOMEPAGE.FAQ_TITLE2')}
          </h2>
          <p className='text-gray-700 mb-6 text-2xl'>{t('HOMEPAGE.FAQ_CONTACT')}</p>
          <div className='flex gap-4 '>
            <Link
              to='https://www.tiktok.com/'
              className='text-[#FE7743] text-6xl !rounded-xl bg-transparent'
              title='TikTok'
              target='_blank'
              rel='noopener noreferrer'
            >
              <TikTokFilled />
            </Link>
            <Link
              to='https://www.tiktok.com/'
              className='text-[#FE7743] text-6xl !rounded-xl bg-transparent'
              title='TikTok'
              target='_blank'
              rel='noopener noreferrer'
            >
              <LinkedinFilled />
            </Link>
            <a
              href='https://www.facebook.com/'
              className='text-[#FE7743] text-6xl rounded-xl'
              title='Facebook'
              target='_blank'
              rel='noopener noreferrer'
            >
              <FacebookFilled />
            </a>
          </div>
        </div>

        {/* RIGHT SIDE: ACCORDION */}
        <div className='flex flex-col gap-3'>
          <Collapse
            accordion
            className='bg-white rounded-xl'
            expandIconPosition='end'
            bordered={false}
            expandIcon={({ isActive }) =>
              isActive ? <MinusIcon className='text-white' /> : <PlusIcon />
            }
            onChange={(val) => setExpanded(val as string)}
          >
            {Array.isArray(faqs) &&
              faqs.map((faq, index) => (
                <Collapse.Panel
                  header={
                    <span
                      className={`text-lg font-sans  ${
                        expanded === String(index) ? 'text-white' : 'bg-[#FFE9E1]'
                      }`}
                    >
                      {faq.QUESTION}
                    </span>
                  }
                  key={index}
                  className={`!rounded-xl !mb-2 ${
                    expanded === String(index) ? 'bg-[#FE7743]' : 'bg-[#FFE9E1]'
                  }`}
                  extra={null}
                >
                  <div className='faq-panel-content'>
                    <p
                      className={`mt-3 text-sm font-sans ${
                        expanded === String(index) ? 'text-white' : 'bg-[#FFE9E1]'
                      }`}
                    >
                      {faq.ANSWER}
                    </p>
                  </div>
                </Collapse.Panel>
              ))}
          </Collapse>
        </div>
      </div>
    </div>
  );
};

export default FaqSection;
