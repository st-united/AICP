import { ProfileOutlined, LockOutlined, ContainerOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useLocation, Link } from 'react-router-dom';

const Sidebar = () => {
  const { t } = useTranslation();

  const location = useLocation();
  const currentPath = location.pathname;

  const menuItems = [
    {
      icon: ProfileOutlined,
      label: t('SIDEBAR.PERSONAL_PROFILE'),
      path: '/profile',
    },
    {
      icon: LockOutlined,
      label: t('SIDEBAR.CHANGE_PASSWORD'),
      path: '/change-password',
    },
    {
      icon: ContainerOutlined,
      label: t('SIDEBAR.HISTORY'),
      path: '/history',
    },
    {
      icon: ContainerOutlined,
      label: t('SIDEBAR.ONLINE_COURSES'),
      path: '/profile/courses',
    },
  ];

  return (
    <div className='flex !rounded-2xl bg-white !p-6'>
      <div className='grid grid-cols-1 gap-1 text-[16px] w-full'>
        {menuItems.map((item, index) => {
          const isActive = currentPath === item.path;
          const Icon = item.icon;

          return (
            <Link to={item.path} key={index}>
              <div
                className={`flex flex-row gap-2 items-center justify-start !px-6 !p-4 hover:bg-[#EDF9FF] rounded-lg cursor-pointer ${
                  isActive ? 'bg-[#EDF9FF]' : ''
                }`}
              >
                <Icon style={{ fontSize: '24px', color: isActive ? '#3D6ADA' : '#5B5B5B' }} />
                <div
                  className={`${
                    isActive ? 'text-[#3D6ADA] font-semibold' : 'text-[#5B5B5B] font-medium'
                  }`}
                >
                  {item.label}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
