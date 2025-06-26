import React from 'react';
import { Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import Section from '@app/components/atoms/Section/Section';

const { Title } = Typography;

const PrivacyLayout = () => {
  const { t } = useTranslation();

  return (
    <div className='bg-white rounded-2xl shadow-2xl p-6 md:p-10 lg:p-16'>
      <Title level={1} className='text-center text-2xl md:text-5xl !text-[#FE7743] mb-6'>
        {t('PRIVACY.TITLE')}
      </Title>

      <div className='flex justify-center mb-6'>
        <hr className='w-1/4 border-t !border-[#686868]' />
      </div>

      <div className='space-y-6 text-sm md:text-base lg:text-lg leading-relaxed'>
        <Section
          title={t('PRIVACY.COLLECT_TITLE')}
          desc={t('PRIVACY.COLLECT_DESC') as string}
          listItems={[t('PRIVACY.COLLECT_1'), t('PRIVACY.COLLECT_2'), t('PRIVACY.COLLECT_3')]}
        />
        <Section
          title={t('PRIVACY.PURPOSE_TITLE')}
          desc={t('PRIVACY.PURPOSE_DESC') as string}
          listItems={[t('PRIVACY.PURPOSE_1'), t('PRIVACY.PURPOSE_2'), t('PRIVACY.PURPOSE_3')]}
        />
        <Section
          title={t('PRIVACY.SHARE_TITLE')}
          listItems={[t('PRIVACY.SHARE_1'), t('PRIVACY.SHARE_2'), t('PRIVACY.SHARE_3')]}
        />
        <Section
          title={t('PRIVACY.SECURITY_TITLE')}
          listItems={[t('PRIVACY.SECURITY_1'), t('PRIVACY.SECURITY_2')]}
        />
        <Section
          title={t('PRIVACY.STORAGE_TITLE')}
          listItems={[t('PRIVACY.STORAGE_1'), t('PRIVACY.STORAGE_2')]}
        />
        <Section
          title={t('PRIVACY.USER_RIGHTS_TITLE')}
          desc={t('PRIVACY.USER_RIGHTS_DESC') as string}
          listItems={[
            t('PRIVACY.USER_RIGHTS_1'),
            t('PRIVACY.USER_RIGHTS_2'),
            t('PRIVACY.USER_RIGHTS_3'),
          ]}
        />
        <Section
          title={t('PRIVACY.COOKIES_TITLE')}
          listItems={[t('PRIVACY.COOKIES_1'), t('PRIVACY.COOKIES_2')]}
        />
        <Section title={t('PRIVACY.CHANGES_TITLE')} desc={t('PRIVACY.CHANGES_1') as string} />
        <Section
          title={t('PRIVACY.CONTACT_TITLE')}
          desc={t('PRIVACY.CONTACT_DESC') as string}
          listItems={[t('PRIVACY.EMAIL'), t('PRIVACY.HOTLINE')]}
        />
      </div>
    </div>
  );
};

export default PrivacyLayout;
