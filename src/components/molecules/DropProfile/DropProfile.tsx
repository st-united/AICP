import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
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
        <div className='flex gap-2 items-center hover:border-[#ff7a45] hover:rounded-2xl'>
          <UserOutlined className='text-[1rem] border border-[#121212] rounded-full p-1' />
          <Typography className='text-[#121212] font-semibold text-base'>
            {t('PROFILE.PERSONAL_PROFILE')}
          </Typography>
        </div>
      ),
      key: 'profile',
      className: 'hover:bg-[#fff2e8]',
    },
    {
      label: (
        <div className='flex gap-2 items-center'>
          <LogoutOutlined className='text-[1.5rem] text-[#FB303E] p-[2px]' />
          <Typography className='text-base text-[#FB303E] font-semibol'>
            {t('PROFILE.LOGOUT')}
          </Typography>
        </div>
      ),
      key: NAVIGATE_URL.SIGN_OUT,
      danger: true,
      className: 'hover:bg-[#fff2e8] text-[#fb303e]',
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
      className='cursor-pointer'
      overlayClassName='w-[12rem] profile-dropdown-menu'
      placement='bottomRight'
      onOpenChange={() => setActiveItem(!activeItem)}
    >
      <div>
        <Avatar className='w-[3rem] h-[3rem]' src={user?.avatar ? user?.avatar : null} />
      </div>
    </Dropdown>
  );
};
