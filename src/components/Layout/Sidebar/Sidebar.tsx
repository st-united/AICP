import {
  ProfileOutlined,
  LockOutlined,
  CheckSquareOutlined,
  SolutionOutlined,
} from '@ant-design/icons';
import { Grid } from 'antd';
import { useTranslation } from 'react-i18next';
import { useLocation, Link } from 'react-router-dom';

const { useBreakpoint } = Grid;

interface SidebarProps {
  onClose?: () => void;
}

const Sidebar = ({ onClose }: SidebarProps) => {
  const { t } = useTranslation();
  const screens = useBreakpoint();
  const location = useLocation();
  const currentPath = location.pathname;

  const isTablet = screens.md && !screens.lg;

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
      path: '/history',
    },
    // {
    //   icon: ReadOutlined,
    //   label: t('SIDEBAR.ONLINE_COURSES'),
    //   path: '/profile/courses',
    // },
    {
      icon: SolutionOutlined,
      label: t('SIDEBAR.PORTFOLIO'),
      path: '/portfolio',
    },
  ];

  return (
    <div className='flex !rounded-2xl bg-white h-full'>
      <div className='grid grid-cols-1 gap-1 text-[14px] md:text-[16px] w-full h-fit'>
        {menuItems.map((item, index) => {
          const isActive = currentPath === item.path;
          const Icon = item.icon;

          return (
            <Link to={item.path} key={index} onClick={onClose}>
              <div
                className={`flex flex-row gap-2 items-center justify-start hover:bg-[#FFF2E8] 
                  ${isTablet ? '!px-3 !py-3' : '!px-6 !p-4'} 
                  rounded-lg cursor-pointer ${isActive ? 'bg-[#FFF2E8]' : ''}`}
              >
                <Icon
                  className={`${isTablet ? 'text-xl' : 'text-2xl'} ${
                    isActive ? 'text-[#FF7A45]' : 'text-[#5B5B5B]'
                  }`}
                />
                <div
                  className={`${isTablet ? 'text-sm' : 'text-base'} truncate flex-1 ${
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
