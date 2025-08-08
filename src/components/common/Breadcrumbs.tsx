import { Breadcrumb } from 'antd';
import { Link, useLocation } from 'react-router-dom';

const breadcrumbNameMap: Record<string, string> = {
  '/': 'Trang chủ',
  '/profile': 'Hồ sơ của tôi',
  '/change-password': 'Đổi mật khẩu',
  '/history': 'Lịch sử kiểm tra',
  '/portfolios': 'Hồ sơ',
  '/history/:id': 'Chi tiết bài kiểm tra',
};

const matchPathToBreadcrumb = (url: string) => {
  const matched = Object.keys(breadcrumbNameMap).find((path) => {
    if (path.includes(':')) {
      const basePath = path.split('/:')[0];
      return url.startsWith(basePath);
    }
    return path === url;
  });
  return breadcrumbNameMap[matched || ''] || url;
};

const Breadcrumbs = () => {
  const location = useLocation();
  const pathSnippets = location.pathname.split('/').filter((i) => i);

  const extraBreadcrumbItems = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
    const isLast = index === pathSnippets.length - 1;

    return {
      title: isLast ? (
        <span className='font-semibold'>{matchPathToBreadcrumb(url)}</span>
      ) : (
        <Link to={url}>{matchPathToBreadcrumb(url)}</Link>
      ),
      key: url,
    };
  });

  const breadcrumbItems = [
    {
      title: <Link to='/'>Trang chủ</Link>,
      key: 'home',
    },
    ...extraBreadcrumbItems,
  ];

  return (
    <div className='max-xs400:px-16'>
      <Breadcrumb items={breadcrumbItems} />
    </div>
  );
};

export default Breadcrumbs;
