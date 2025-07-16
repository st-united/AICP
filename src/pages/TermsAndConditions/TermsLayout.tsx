import { Typography } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';

import Section from '../../components/atoms/Section/Section';

const { Title } = Typography;

const TermsLayout = () => {
  const { t } = useTranslation();

  return (
    <div className='bg-white rounded-2xl shadow-2xl p-6 md:p-10 lg:p-16'>
      <Title level={1} className='text-center text-2xl md:text-4xl !text-[#FE7743] mb-6'>
        {t('TERMS.TITLE')}
      </Title>

      <div className='flex justify-center mb-6'>
        <hr className='w-1/4 border-t !border-[#686868]' />
      </div>

      <div className='space-y-6 text-sm md:text-base lg:text-lg leading-relaxed'>
        <Section title={t('TERMS.INTRO_TITLE')} desc={t('TERMS.INTRO_DESC') as string} />
        <Section
          title={t('TERMS.USAGE_TITLE')}
          listItems={[t('TERMS.USAGE_1'), t('TERMS.USAGE_2')]}
        />
        <Section
          title={t('TERMS.ACCOUNT_TITLE')}
          listItems={[t('TERMS.ACCOUNT_1'), t('TERMS.ACCOUNT_2')]}
        />
        <Section title={t('TERMS.IP_TITLE')} listItems={[t('TERMS.IP_1'), t('TERMS.IP_2')]} />
        <Section
          title={t('TERMS.RESPONSIBILITY_TITLE')}
          listItems={[t('TERMS.RESPONSIBILITY_1'), t('TERMS.RESPONSIBILITY_2')]}
        />
        <Section
          title={t('TERMS.TERMINATION_TITLE')}
          listItems={[t('TERMS.TERMINATION_1'), t('TERMS.TERMINATION_2')]}
        />
        <Section
          title={t('TERMS.CONTACT_TITLE')}
          desc={t('TERMS.CONTACT_DESC') as string}
          listItems={[t('TERMS.EMAIL'), t('TERMS.HOTLINE')]}
        />
      </div>
    </div>
  );
};

export default TermsLayout;
