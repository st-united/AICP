import {
  ProfileOutlined,
  LockOutlined,
  CheckSquareOutlined,
  ReadOutlined,
  FolderOpenOutlined,
} from '@ant-design/icons';
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
      icon: CheckSquareOutlined,
      label: t('SIDEBAR.HISTORY'),
      path: '/profile/history',
    },
    {
      icon: ReadOutlined,
      label: t('SIDEBAR.ONLINE_COURSES'),
      path: '/profile/courses',
    },
    {
      icon: FolderOpenOutlined,
      label: t('SIDEBAR.PORTFOLIO'),
      path: '/portfolio',
    },
  ];

  return (
    <div className='flex !rounded-2xl bg-white !p-6 h-full'>
      <div className='grid grid-cols-1 gap-1 text-[16px] w-full h-fit'>
        {menuItems.map((item, index) => {
          const isActive = currentPath === item.path;
          const Icon = item.icon;

          return (
            <Link to={item.path} key={index}>
              <div
                className={`flex flex-row gap-2 items-center justify-start hover:bg-[#FFF2E8] !px-6 !p-4 rounded-lg cursor-pointer ${
                  isActive ? 'bg-[#FFF2E8]' : ''
                }`}
              >
                <Icon className={`text-2xl ${isActive ? 'text-[#FF7A45]' : 'text-[#5B5B5B]'}`} />
                <div
                  className={`${
                    isActive ? 'text-[#FF7A45] font-semibold' : 'text-[#5B5B5B] font-medium'
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
