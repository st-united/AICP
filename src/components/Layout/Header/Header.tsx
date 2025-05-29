import { Image } from 'antd';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import { DropProfile } from '../../molecules';
import { DevPlus, DevPlusS } from '@app/assets/images';
import ButtonHeader from '@app/components/atoms/Button/ButtonHeader';

const Header = () => {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const isAuth = useSelector((state: any) => state.auth.isAuth);

  const isHomePage = pathname === '/';
  const handleRegisterClick = () => navigate('/register');
  const handleLoginClick = () => navigate('/login');

  return (
    <div
      className={`${
        isHomePage ? 'absolute bg-transparent' : ''
      } flex justify-center item-center w-full z-50`}
    >
      <div className='container !md:px-0 !px-4'>
        <div className='flex items-center justify-between'>
          <div className='cursor-pointer flex items-center justify-center'>
            <Image
              onClick={() => navigate('/')}
              src={DevPlus}
              className='hidden md:block !h-20'
              preview={false}
            />
            <Image
              onClick={() => navigate('/')}
              src={DevPlusS}
              className='block md:hidden !h-20'
              preview={false}
            />
          </div>
          {isAuth ? (
            <div className='flex items-center gap-4 md:gap-6'>
              <ButtonHeader>{t('HEADER.START')}</ButtonHeader>
              <DropProfile />
            </div>
          ) : (
            <div className='flex items-center gap-4 md:gap-6'>
              <ButtonHeader onClick={handleRegisterClick}>{t('HEADER.REGISTER')}</ButtonHeader>
              <ButtonHeader onClick={handleLoginClick}>{t('HEADER.LOGIN')}</ButtonHeader>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
