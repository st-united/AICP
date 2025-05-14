import { UserOutlined } from '@ant-design/icons';
import { Avatar, Dropdown, Image } from 'antd';
import { t } from 'i18next';

import { LogOut, ProfileGG } from '@app/assets/svgs';
import type { MenuProps } from 'antd';

import './ProfileAvartar.scss';

const items: MenuProps['items'] = [
  {
    key: '1',
    label: (
      <div className='flex items-center gap-3 text-lg font-semibold !p-1 hover:!rounded-lg'>
        <Image className='!w-8 !h-8' src={ProfileGG} />
        <div>{t<string>('PROFILE.PERSONAL_PROFILE')}</div>
      </div>
    ),
  },
  {
    key: '2',
    label: (
      <div className='flex items-center gap-3 text-lg font-semibold !p-1 text-[#ED0909]'>
        <Image className='!w-8 !h-8' src={LogOut} />
        <div>{t<string>('PROFILE.LOGOUT')}</div>
      </div>
    ),
  },
];

const ProfileAvartar = () => {
  return (
    <Dropdown menu={{ items }} placement='bottomRight' arrow>
      <Avatar
        className='border border-[2px] !w-[40px] !h-[40px] md:!w-[50px] md:!h-[50px] cursor-pointer'
        icon={
          <div className='flex items-center justify-center w-full h-full'>
            <UserOutlined />
          </div>
        }
      />
    </Dropdown>
  );
};

export default ProfileAvartar;
