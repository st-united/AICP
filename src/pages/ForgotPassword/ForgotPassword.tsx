import { ArrowLeftOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

import { InputField, Button } from '@app/components/ui/index';

export default function ForgotPassword() {
  const { t } = useTranslation();
  return (
    <div className='!p-12 flex justify-start h-full w-full'>
      <div className='w-full'>
        <p className='text-white !mb-14 flex align-items gap-x-1'>
          <span>
            <ArrowLeftOutlined className='-translate-y-[2px]' />
          </span>
          <span>{t('FORGOT_PASSWORD.TURN_BACK_SIGN_IN')}</span>
        </p>
        <div>
          <h1 className='text-4xl !text-white !font-bold'>{t('FORGOT_PASSWORD.TITLE')}</h1>
          <p className='text-white !mb-8'>
            {t('FORGOT_PASSWORD.TITLE')} {t('FORGOT_PASSWORD.REGISTER')}
          </p>
        </div>
        <form className='!space-y-8'>
          <InputField type={'email'} placeholder={'Email *'} />
          <Button type='primary' className={'w-full'}>
            {t('FORGOT_PASSWORD.RESET_PASSWORD')}
          </Button>
        </form>
      </div>
    </div>
  );
}
