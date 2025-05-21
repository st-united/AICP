import {
  CaretDownOutlined,
  CaretUpOutlined,
  UserOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { Avatar, Dropdown, MenuProps, Typography } from 'antd';
import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { removeStorageData } from '@app/config';
import { ACCESS_TOKEN, NAVIGATE_URL } from '@app/constants';
import { logout } from '@app/redux/features/auth/authSlice';
import { RootState } from '@app/redux/store';

import './DropProfile.scss';

export const DropProfile: FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatchAuth = useDispatch();

  const { user } = useSelector((state: RootState) => state.auth);
  const [activeItem, setActiveItem] = useState<boolean>(false);

  const handleUser = (key: string) => {
    if (key == 'profile') {
      navigate(NAVIGATE_URL.PROFILE);
    }
    if (key == NAVIGATE_URL.SIGN_OUT) {
      removeStorageData(ACCESS_TOKEN);
      dispatchAuth(logout());
      navigate(NAVIGATE_URL.SIGN_IN);
    }
  };

  const items: MenuProps['items'] = [
    {
      label: (
        <div className='flex gap-2 items-center'>
          <UserOutlined className='profile-icon text-[24px] border border-[#121212] rounded-full p-[2px]' />
          <Typography className='text-[#121212] font-semibold text-base'>
            {t('PROFILE.PERSONAL_PROFILE')}
          </Typography>
        </div>
      ),
      key: 'profile',
      className: 'item-profile',
    },
    {
      label: (
        <div className='flex gap-2 items-center'>
          <LogoutOutlined className='profile-icon text-[24px] p-[2px]' />
          <Typography className='text-base text-[#FB303E] font-semibold'>
            {t('PROFILE.LOGOUT')}
          </Typography>
        </div>
      ),
      key: NAVIGATE_URL.SIGN_OUT,
      danger: true,
      className: 'item-signout',
    },
  ];

  return (
    <Dropdown
      menu={{
        items,
        onClick: (item) => {
          handleUser(item.key), setActiveItem(!activeItem);
        },
      }}
      trigger={['click']}
      className='profile-dropdown'
      overlayClassName='profile-menu'
      placement='bottom'
      onOpenChange={() => setActiveItem(!activeItem)}
    >
      <div>
        <Avatar
          className='drop-avatar w-[40px] h-[40px] md:w-[50px] md:h-[50px]'
          src={user?.avatar ? user?.avatar : null}
        />
      </div>
    </Dropdown>
  );
};
